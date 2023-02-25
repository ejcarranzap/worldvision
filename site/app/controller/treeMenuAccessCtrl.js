(function () {
	'use strict'
	var app = angular.module('itxwebApp');
	app.controller('treeMenuAccessCtrl', function ($scope, $rootScope, $log, $window, $http, $filter, autenticationService, $uibModal) {
		$rootScope.Panel = 'Menu Acceso (tree)';
		$rootScope.PanelTitle = 'Administración';
		$rootScope.PanelSubTitle = 'Administración';
		$rootScope.PanelSubSubTitle = 'Menu Acceso (tree)';
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
			/*$scope.record = node;*/
			
			$scope.mynode = $filter('filter')($scope.data,function(itm){
				return(itm.Id_menu==node.Id_menu);
			});
			
			if($scope.mynode)
				if($scope.mynode.length > 0){
					$scope.mynode[0].selected = (data.state.selected==true ? 1 : 0);
					$scope.mynode[0].active = (data.state.selected==true ? 1 : 0);
				}
			
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
				itm.text = itm.description + '(' + itm.Id_menu + ')';
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
		
		$scope.getInitData = function(){
			$scope.urls = [];
			
			$scope.urls.push({
				url: '/server/main/tbl_ad_user',
				params: {},
				action: 'S'
			});
			autenticationService.call($scope.urls).then(function (results) {
				setTimeout(function () {
					$scope.tbl_ad_users = results[0].data.data;
					$scope.$apply();
				}, 0);
			});
		};

		$scope.getData = function () {
			$scope.urls = [];
			$scope.urls.push({
				url: '/server/main/tbl_ad_user_menu',
				params: {
					Id_user: $scope.record.cmbId_user.Id_user
				},
				action: 'SX'
			});
			autenticationService.call($scope.urls).then(function (results) {
				setTimeout(function () {
					$scope.datapivot = results[0].data.data;
					$scope.data = angular.copy($scope.datapivot,$scope.data);
					console.log($scope.data);
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

		$scope.getInitData();
		
		$scope.$watch('record.cmbId_user', function(){
			if($scope.record.cmbId_user){
				$scope.getData();
			}
		});

		$scope.save = function () {
			console.log($filter('filter')($scope.data,function(itm){return(itm.selected == 1);}));
			
			$scope.urls = [];
			$scope.urls.push({
				url: '/server/main/tbl_ad_user_menu',
				params: {data: $scope.data},
				action: 'IX'
			});
			autenticationService.call($scope.urls).then(function (results) {
				setTimeout(function () {
					/*$scope.record = {};*/
					$scope.getData();
				}, 0);
			});
		};

		$scope.cancel = function () {
			$scope.record = {};
		};
		
		$scope.cargaCmb = function(){
			var item;
			/*item = $filter('filter')($scope.tbl_ad_location_types, function(itm){
			  return (itm.Id_location_type == $scope.record.Id_location_type);
			});
			if(item.length > 0){
			  $scope.record.cmbId_location_type = item[0];
			}*/
		};

		$log.info('treeLocationAccessCtrl');
	});
}());