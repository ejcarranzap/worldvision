(function () {
	'use strict'
	var app = angular.module('itxwebApp');
	app.controller('treeMenuCtrl', function ($scope, $rootScope, $log, $window, $http, $filter, autenticationService, $uibModal) {
		$rootScope.Panel = 'Menu';
		$rootScope.PanelTitle = 'Administración';
		$rootScope.PanelSubTitle = 'Administración';
		$rootScope.PanelSubSubTitle = 'Menu';
		$scope.record = {};

		$scope.checkAll = function (nodes, flag) {
			angular.forEach(nodes, function (itm) {
				if (!itm.state) {
					itm.state = {}
				}
				itm.state.selected = flag;
				if (itm.nodes)
					if (itm.nodes.length > 0)
						$scope.checkAll(itm.nodes, flag);
			});
		};

		$scope.expandAll = function (nodes, flag) {
			angular.forEach(nodes, function (itm) {
				if (!itm.state) {
					itm.state = {}
				}
				itm.state.expanded = flag;
				if (itm.nodes)
					if (itm.nodes.length > 0)
						$scope.expandAll(itm.nodes, flag);
			});
		};

		$scope.onSelectionChange = function (event, data) {
			var node = $scope.getNodeById(data.id, $scope.dataTreePivot);
			node.state.selected = data.state.selected;
			$scope.record = node;
			
			/*$scope.selectAllParents(node, data.state.selected);*/
			/*$scope.selectAllChilds(node, data.state.selected);*/
			$scope.expandAll($scope.dataTreePivot, true);
			$scope.dataTreePivotAux = angular.copy($scope.dataTreePivot, $scope.dataTreePivotAux);
			setTimeout(function () {
				$scope.cargaCmb();
				$scope.$apply();
			}, 0);
		};

		$scope.selectAllParents = function (itm, flag, expanded) {
			var parent = $scope.getNodeById(itm.parent, $scope.dataTreePivot);
			if (parent) {
				if (!parent.state)
					parent.state = {};
				if (flag != null)
					parent.state.selected = flag;

				if (expanded == true) {
					parent.state.expanded = expanded;
				}else{
					parent.state.expanded = expanded;
				}
				$scope.selectAllParents(parent, flag, expanded);
			}
		};

		$scope.selectAllChilds = function (itm, flag) {
			if (!itm.state)
				itm.state = {};
			itm.state.selected = flag;

			if (itm.nodes) {
				if (itm.nodes.length > 0) {
					angular.forEach(itm.nodes, function (itmc) {
						if (!itmc.state)
							itmc.state = {};
						itmc.state.selected = flag;
						$scope.selectAllChilds(itmc, flag);
					})
				}
			}
		};

		$scope.getNodeById = function (id, nodes) {
			var ret = null;
			var ok = false;
			if (nodes)
				for (var i = 0; i < nodes.length; i++) {
					if (ok == false) {
						if (nodes[i].id == id) {
							ok = true;
							ret = nodes[i];
						} else {
							ret = $scope.getNodeById(id, nodes[i].nodes);
							if (ret) {
								ok = true;
							}
						}
					}
				}
			return ret;
		};

		$scope.qx = '';
		$scope.dataTreePivotAux = [];

		/*$scope.$watch('record.qx', function () {*/
		$scope.fnFilter = function(){
			if ($scope.record.qx) {
				$scope.dataTreePivot = angular.copy($scope.dataTreePivotAux, $scope.dataTreePivot);
				$scope.expandAll($scope.dataTreePivot, false);
				$scope.filterNodesByText($scope.dataTreePivot, $scope.record.qx);
			} else {
				$scope.dataTreePivot = angular.copy($scope.dataTreePivotAux, $scope.dataTreePivot);
				$scope.expandAll($scope.dataTreePivot, false);
			}
			setTimeout(function () {
					$scope.$apply();
				});
		};
		/*});*/

		$scope.filterNodesByText = function (nodes, txt) {
			var selected = false;
			angular.forEach(nodes, function (itm) {
				if (!itm.nodes)
					itm.nodes = [];
				if (itm.nodes.length > 0) {
					if (itm.text.toLowerCase().indexOf(txt.toLowerCase()) != -1) {
						selected = true;
						if (!itm.state)
							itm.state = {};
						itm.state.selected = selected;
						itm.tags = "(encontrado)";
						$scope.selectAllParents(itm, selected, true);
					}else{
						$scope.filterNodesByText(itm.nodes, txt);
					}
				} else {
					delete itm.nodes;
					if (itm.text.indexOf(txt) != -1) {
						selected = true;
						if (!itm.state)
							itm.state = {};
						itm.state.selected = selected;
						itm.tags = "(encontrado)";
						$scope.selectAllParents(itm, null, true);
					}
				}
			});
		};

		$scope.data = [];
		$scope.prepareData = function () {
			angular.forEach($scope.data, function (itm) {
				itm.id = itm.Id_menu;
				itm.text = itm.Id_menu+ ' - ' +itm.description + '(' + itm.Id_menu_parent + ')';
				itm.parent = itm.Id_menu_parent;
				itm.icon = 'glyphicon glyphicon-stop';
				itm.selectedIcon = 'glyphicon glyphicon-check';
				itm.state = {};
				if (itm.selected == 1) {
					itm.state.selected = true;
				} else {
					itm.state.selected = false;
				}
			});
		};

		$scope.getData = function () {
			$scope.urls = [];
			$scope.urls.push({
				url: '/server/main/tbl_ad_menu',
				params: {},
				action: 'S'
			});
			
			autenticationService.call($scope.urls).then(function (results) {
				setTimeout(function () {
					$scope.data = results[0].data.data;
					$scope.tbl_ad_menus = angular.copy($scope.data, $scope.tbl_ad_menu);
					
					$scope.prepareData();
					$scope.dataTreePivot = $scope.getTreeData(null);
					$scope.dataTreePivotAux = angular.copy($scope.dataTreePivot, $scope.dataTreePivotAux);
					$scope.$apply();
				}, 0);
			});

			/*$scope.expandAll($scope.dataTreePivot, false);*/
		};

		$scope.dataTreePivot = [];
		$scope.getTreeData = function (parent) {
			var dataNodes = [];
			var dataFiltered = $filter('filter')($scope.data, function (itm) {
					return (itm.parent == parent);
				});

			if (dataFiltered) {
				angular.forEach(dataFiltered, function (itm) {
					var nodes = $scope.getTreeData(itm.id);

					if (nodes.length > 0)
						itm.nodes = nodes;

					dataNodes.push(itm);
				});
			}

			return dataNodes;
		};

		$scope.getData();

		$scope.save = function () {
			$scope.urls = [];
			$scope.urls.push({
				url: '/server/main/tbl_ad_menu',
				params: $scope.record,
				action: (!$scope.record.Id_menu ? 'I' : 'U')
			});
			autenticationService.call($scope.urls).then(function (results) {
				setTimeout(function () {
					$scope.record = {};
					$scope.getData();
				}, 0);
			});
		};

		$scope.cancel = function () {
			$scope.record = {};
		};
		
		$scope.cargaCmb = function(){
			var item;
			
			item = $filter('filter')($scope.tbl_ad_menus, function(itm){
			  return (itm.Id_menu == $scope.record.Id_menu_parent);
			});
			if(item.length > 0){
			  $scope.record.cmbId_menu_parent = item.slice(0)[0];
			}
		};

		$log.info('treeMenuCtrl');
	});
}());