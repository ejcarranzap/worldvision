(function() {
  'use strict';
  var app = angular.module('itxwebApp');
  app.controller('homeCtrl', function($scope, $rootScope, $log, $window, $http, $timeout, $filter, Upload) {
    $scope.checkboxValue = true;
    $scope.disabled = false;
    $scope.record = {};
	
	$scope.checkAll = function(nodes, flag){
			angular.forEach(nodes, function(itm){
				if(!itm.state){
					itm.state = {}
				}
				itm.state.selected = flag;
				if(itm.nodes)
					if(itm.nodes.length > 0)
						$scope.checkAll(itm.nodes, flag);
			});
		};
		
		$scope.expandAll = function(nodes, flag){
			angular.forEach(nodes, function(itm){
				if(!itm.state){
					itm.state = {}
				}
				itm.state.expanded = flag;
				if(itm.nodes)
					if(itm.nodes.length > 0)
						$scope.expandAll(itm.nodes, flag);
			});
		};
		
		$scope.onSelectionChange = function(event, data){			
			var node = $scope.getNodeById(data.id,$scope.dataTreePivot);
			node.state.selected = data.state.selected;			
			/*$scope.selectAllParents(node, data.state.selected);*/
			$scope.selectAllChilds(node, data.state.selected);			
			$scope.expandAll($scope.dataTreePivot, true);
			$scope.dataTreePivotAux = angular.copy($scope.dataTreePivot,$scope.dataTreePivotAux);	
			setTimeout(function(){
				$scope.$apply();
			},0);
		};	
		
		$scope.selectAllParents = function(itm, flag, expanded){
			var parent = $scope.getNodeById(itm.parent,$scope.dataTreePivot);
			if(parent){
				if(!parent.state) parent.state = {};
				if(flag != null)
				parent.state.selected = flag;
			
				if(expanded==true){
						parent.state.expanded = expanded; 
				}
				$scope.selectAllParents(parent, flag, expanded);
			}
		};
		
		$scope.selectAllChilds = function(itm, flag){
			if(!itm.state) itm.state = {};
			itm.state.selected = flag;
			
			if(itm.nodes){
				if(itm.nodes.length > 0){
					angular.forEach(itm.nodes, function(itmc){
						if(!itmc.state) itmc.state = {};
						itmc.state.selected = flag;
						$scope.selectAllChilds(itmc, flag);
					})
				}
			}
		};
		
		$scope.getNodeById = function(id, nodes){
			var ret = null;
			var ok = false;
			if(nodes)
			for(var i = 0; i < nodes.length; i++){
				if(ok == false){
					if(nodes[i].id == id){
						ok = true;
						ret = nodes[i];
					}else{
						ret = $scope.getNodeById(id, nodes[i].nodes);
						if(ret){
							ok = true;
						}
					}
				}
			}			
			return ret;
		};
		
		$scope.qx = '';
		$scope.dataTreePivotAux = [];
		$scope.$watch('qx', function(){
			if($scope.qx){
				$scope.dataTreePivot = angular.copy($scope.dataTreePivotAux,$scope.dataTreePivot);					
				$scope.expandAll($scope.dataTreePivot, false);									
				$scope.filterNodesByText($scope.dataTreePivot,$scope.qx);				
				setTimeout(function(){
					$scope.$apply();
				});
			}else{
				$scope.dataTreePivot = angular.copy($scope.dataTreePivotAux,$scope.dataTreePivot);	
				$scope.expandAll($scope.dataTreePivot, false);
				setTimeout(function(){
					$scope.$apply();
				});
			}
		});
		
		$scope.filterNodesByText = function(nodes, txt){
			var selected = false;
			angular.forEach(nodes, function(itm){
				if(!itm.nodes) itm.nodes = [];
				if(itm.nodes.length > 0){
					$scope.filterNodesByText(itm.nodes, txt);
				}else{
					delete itm.nodes;
					if(itm.text.indexOf(txt) != -1){
						selected = true;
						if(!itm.state) itm.state = {};
						/*itm.state.selected = selected;*/
						itm.tags = "(encontrado)";
						$scope.selectAllParents(itm, null, true);
					}
				}
			});
		};			

		$scope.dataRaw = [];
		$scope.getData = function(){
			$scope.dataRaw = [
				{id: 1, parent: null, text: 'Node 1', icon: "glyphicon glyphicon-stop", selectedIcon: "glyphicon glyphicon-check", state: {}},
				{id: 2, parent: null, text: 'Node 2', icon: "glyphicon glyphicon-stop", selectedIcon: "glyphicon glyphicon-check", state: {}},
				{id: 3, parent: null, text: 'Node 3', icon: "glyphicon glyphicon-stop", selectedIcon: "glyphicon glyphicon-check", state: {}},
				{id: 4, parent: null, text: 'Node 4', icon: "glyphicon glyphicon-stop", selectedIcon: "glyphicon glyphicon-check", state: {}},
				{id: 5, parent: 1, text: 'Node 1.1', icon: "glyphicon glyphicon-stop", selectedIcon: "glyphicon glyphicon-check", state: {}},
				{id: 6, parent: 2, text: 'Node 2.1', icon: "glyphicon glyphicon-stop", selectedIcon: "glyphicon glyphicon-check", state: {}},
				{id: 7, parent: 1, text: 'Node 1.2', icon: "glyphicon glyphicon-stop", selectedIcon: "glyphicon glyphicon-check", state: {}},
				{id: 8, parent: 1, text: 'Node 1.3', icon: "glyphicon glyphicon-stop", selectedIcon: "glyphicon glyphicon-check", state: {}},
				{id: 9, parent: 3, text: 'Node 3.1', icon: "glyphicon glyphicon-stop", selectedIcon: "glyphicon glyphicon-check", state: {}},
				{id: 10, parent: 4, text: 'Node 4.1', icon: "glyphicon glyphicon-stop", selectedIcon: "glyphicon glyphicon-check", state: {}},
				{id: 11, parent: 3, text: 'Node 3.2', icon: "glyphicon glyphicon-stop", selectedIcon: "glyphicon glyphicon-check", state: {}},
				{id: 12, parent: 5, text: 'Node 1.1.1', icon: "glyphicon glyphicon-stop", selectedIcon: "glyphicon glyphicon-check", state: {}},
				{id: 13, parent: 11, text: 'Node 3.2.1', icon: "glyphicon glyphicon-stop", selectedIcon: "glyphicon glyphicon-check", state: {}},
				{id: 14, parent: 6, text: 'Node 2.1.1', icon: "glyphicon glyphicon-stop", selectedIcon: "glyphicon glyphicon-check", state: {}},
				{id: 15, parent: 14, text: 'Node 2.1.1.1', icon: "glyphicon glyphicon-stop", selectedIcon: "glyphicon glyphicon-check", state: {}},
				{id: 16, parent: 13, text: 'Node 3.2.1.1', icon: "glyphicon glyphicon-stop", selectedIcon: "glyphicon glyphicon-check", state: {}}				
			];
			$scope.dataTreePivot = $scope.getTreeData(null);
			$scope.dataTreePivotAux = angular.copy($scope.dataTreePivot, $scope.dataTreePivotAux);
			/*$scope.expandAll($scope.dataTreePivot, false);*/
		};
		
		$scope.dataTreePivot = [];
		$scope.getTreeData = function(parent){
			var dataNodes = [];
			var dataFiltered = $filter('filter')($scope.dataRaw, function(itm){
				return(itm.parent == parent);
			});
			
			if(dataFiltered){
				angular.forEach(dataFiltered, function(itm){
					var nodes = $scope.getTreeData(itm.id);
					
					if(nodes.length > 0)
					itm.nodes = nodes;
				
					dataNodes.push(itm);
				});
			}
			
			return dataNodes;
		};		
		
		$scope.getData();	

    $scope.uploadFiles = function(file, errFiles) {
      $scope.f = file;
      $scope.errFile = errFiles && errFiles[0];
      if (file) {
        file.upload = Upload.upload({
          url: $rootScope.fileuploadurl,
          headers: {
            'Content-Type': file.type
          },
          data: {
            file: file
          }
        });

        file.upload.then(function(response) {
          $timeout(function() {
            file.result = response.data;
            $log.info(JSON.stringify(response.data));
            $scope.record.archivo = file.result.data.filename;
          });
        }, function(response) {
          if (response.status > 0) {
            $scope.errorMsg = response.status + ': ' + response.data;
            console.log(response);
          }
        }, function(evt) {
          file.progress = Math.min(100, parseInt(100.0 *
            evt.loaded / evt.total));
        });
      }
    };

    $scope.enableCheckbox = function() {
      $scope.disabled = !$scope.disabled;
      $http.post('http://localhost:3080/Bo_test', $scope.record, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }).then(function(data) {
        $window.alert(data.data);
      });
    };

    $scope.$watch('record.loginuser', function() {
      //$window.alert('Ha modificado el valor del loginuser');
    });

    $scope.$watch('record.password', function() {
      //$window.alert('Ha modificado el valor del password');
    });

    $scope.items = [{
      id: 1,
      label: 'aLabel',
      subItem: {
        name: 'aSubItem'
      }
    }, {
      id: 2,
      label: 'bLabel',
      subItem: {
        name: 'bSubItem'
      }
    }];

    $scope.selectValue = $scope.items[0];

    /*TRIGGER REFERENCIAS*/
    $scope.data = [];
    $scope.TriggerLoadData = new EventTrigger();
    $scope.onCellClick = function(datarow, colname, rowIndex, colIndex) {
      if (colname == 'Eliminar') {
        /*console.log('delete row: ' + rowIndex);*/
        $scope.deleteDetails(1, datarow[0]);
        $scope.data.splice(rowIndex, 1);
        $scope.getData();
      }
      if (colname == 'Agregar') {
        /*console.log('add row');*/
        $scope.addRow();
        $scope.getData();
      }
    };

    $scope.deleteDetails = function(type, ID) {
      /*var urls = [];

      if (type == 1)
        urls.push({
          url: 'server/main/Bo_lab_cliente_referencia',
          param: {
            action: 'delete',
            data: {
              Id_referencia: ID
            }
          }
        });

      boService.call(urls).then(function(results) {
        $scope.getDetails();
      });*/
    };

    $scope.onCellChange = function(changes, source, datarow) {
      /*changes[0] 0 row, 1 field, 2 oldvalue, 3 newvalue*/
      var datapivot = {};
      datapivot = $scope.data[changes[0][0]];
      datapivot[changes[0][1]] = changes[0][3];
      /*console.log('New Data onCellChange');
      console.log($scope.data);*/
    };

    $scope.addRow = function() {
      $scope.data.push({
        activo: 0,
        agregar: 'Agregar',
        eliminar: 'Eliminar'
      });
    };

    $scope.getData = function() {
      if ($scope.data.length == 0) {
        for (var i = 0; i < 5; i++) {
          $scope.data.push({
            activo: 0,
            agregar: 'Agregar',
            eliminar: 'Eliminar',
            nombre: 'Name ' + i,
            apellido: 'Apellido ' + i,
            fecha: '01/12/2017',
            hora: '12:45',
            edad: i + 10,
            activo: 1
          });
        }
      }
      $scope.datapivot = $scope.prepareData($scope.data);

      $scope.TriggerLoadData.trigger({
        data: $scope.datapivot.data,
        headers: $scope.datapivot.headers,
        columns: $scope.datapivot.columns,
        editors: [{
          name: 'activo',
          type: 'select',
          options: [{
            value: 1,
            name: 'Activo'
          }, {
            value: 0,
            name: 'Inactivo'
          }]
        }, {
          name: ['nombre'],
          type: 'text',
        }, {
          name: ['fecha'],
          type: 'date',
        }, {
          name: ['hora'],
          type: 'time',
        }, {
          name: ['edad'],
          type: 'number',
        }],
        hiddenCols: []
      });

    };

    $scope.prepareData = function(data) {
      var arr = angular.copy(data, arr);
      var arrpivot = [];

      var count = 0;
      var headers = ['Agregar', 'Eliminar', 'Nombre', 'Apellido', 'Fecha', 'Hora', 'Edad', 'Activo'];

      var columns = [{
          data: 'agregar',
          editor: false
        },
        {
          data: 'eliminar',
          editor: false
        },
        {
          data: 'nombre',
          editor: false
        },
        {
          data: 'apellido',
          editor: false
        },
        {
          data: 'fecha',
          editor: false
        },
        {
          data: 'hora',
          editor: false
        },
        {
          data: 'edad',
          editor: false
        },
        {
          data: 'activo',
          editor: false
        }
      ];

      angular.forEach(arr, function(dr) {
        var myitm = {};
        myitm.agregar = 'Agregar';
        myitm.eliminar = 'Eliminar';
        myitm.nombre = dr.nombre;
        myitm.apellido = dr.apellido;
        myitm.fecha = dr.fecha;
        myitm.hora = dr.hora;
        myitm.edad = dr.edad;
        myitm.activo = dr.activo;
        arrpivot.push(myitm);
      });

      return ({
        data: arrpivot,
        headers: headers,
        columns: columns
      });
    };

    setTimeout(function() {
      $scope.getData();
      $scope.$apply();
    }, 0);
    /*TRIGGER REFERENCIAS*/
    $scope.items = [{
        id: 1,
        name: 'uno'
      },
      {
        id: 2,
        name: 'dos'
      },
      {
        id: 3,
        name: 'tres'
      },
      {
        id: 4,
        name: 'cuatro'
      },
      {
        id: 5,
        name: 'cinco'
      },
      {
        id: 6,
        name: 'seis'
      },
      {
        id: 7,
        name: 'siete'
      },
      {
        id: 8,
        name: 'ocho'
      },
      {
        id: 9,
        name: 'nueve'
      },
      {
        id: 10,
        name: 'díez'
      }

    ];

    $scope.renderfields = ['id', 'name'];
    $scope.fields = [{
      title: 'CODIGO',
      field: 'id'
    }, {
      title: 'DESCRIPCION',
      field: 'name'
    }];

    $log.info('homeCtrl');
  });
}());
