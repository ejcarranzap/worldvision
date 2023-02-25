(function () {
  'use strict'
  var app = angular.module('itxwebApp')
  app.controller('tbl_ad_vehicleCtrl', function ($scope, $rootScope, $log, $window, $http, $filter, autenticationService, $uibModal) {
    $rootScope.Panel = 'Vehículo';
    $rootScope.PanelTitle = 'Administración';
    $rootScope.PanelSubTitle = 'Vehículo';
    $rootScope.PanelSubSubTitle = 'Vehículo';
    $scope.record = {};
    $scope.data = {};
    $scope.pivot_data = {};

    $scope.getData = function () {
      $scope.urls = [];
      $scope.urls.push({ url: '/server/main/tbl_ad_vehicle', params: {}, action: 'S' });
      $scope.urls.push({ url: '/server/main/tbl_ad_location', params: {}, action: 'S' });
      $scope.urls.push({ url: '/server/main/tbl_ad_make', params: {}, action: 'S' });
      $scope.urls.push({ url: '/server/main/tbl_ad_model', params: {}, action: 'S' });
      $scope.urls.push({ url: '/server/main/tbl_ad_type', params: {}, action: 'S' });
      $scope.urls.push({ url: '/server/main/tbl_ad_year', params: {}, action: 'S' });
      $scope.urls.push({ url: '/server/main/tbl_ad_color', params: {}, action: 'S' });
      $scope.urls.push({ url: '/server/main/tbl_ad_manager', params: {}, action: 'S' });
      $scope.urls.push({ url: '/server/main/tbl_ad_state', params: {}, action: 'S' });
      $scope.urls.push({ url: '/server/main/tbl_ad_inventory_state', params: {}, action: 'S' });
      $scope.urls.push({ url: '/server/main/tbl_ad_supplier', params: {}, action: 'S' });
      autenticationService.call($scope.urls).then(function (results) {
        setTimeout(function () {
          $scope.data = results[0].data.data;
          $scope.tbl_ad_locations = results[1].data.data;
          $scope.tbl_ad_makes = results[2].data.data;
          $scope.tbl_ad_models = results[3].data.data;
          $scope.tbl_ad_types = results[4].data.data;
          $scope.tbl_ad_years = results[5].data.data;
          $scope.tbl_ad_colors = results[6].data.data;
          $scope.tbl_ad_managers = results[7].data.data;
          $scope.tbl_ad_states = results[8].data.data;
          $scope.tbl_ad_inventory_states = results[9].data.data;
          $scope.tbl_ad_suppliers = results[10].data.data;
          $scope.prepareData();
          $scope.loadData();
          $scope.$apply();
        }, 0);
      });
    };

    $scope.prepareData = function () {
      angular.forEach($scope.data, function (itm) {
        var myitm = [];
        myitm = $filter('filter')($scope.tbl_ad_locations, function (itmx) {
          return (itmx.Id_location == itm.Id_location)
        });
        if (myitm)
          if (myitm.length > 0)
            itm.tbl_ad_location = myitm[0].name;
        var myitm = [];
        myitm = $filter('filter')($scope.tbl_ad_makes, function (itmx) {
          return (itmx.Id_make == itm.Id_make)
        });
        if (myitm)
          if (myitm.length > 0)
            itm.tbl_ad_make = myitm[0].name;
        var myitm = [];
        myitm = $filter('filter')($scope.tbl_ad_models, function (itmx) {
          return (itmx.Id_model == itm.Id_model)
        });
        if (myitm)
          if (myitm.length > 0)
            itm.tbl_ad_model = myitm[0].name;
        var myitm = [];
        myitm = $filter('filter')($scope.tbl_ad_types, function (itmx) {
          return (itmx.Id_type == itm.Id_type)
        });
        if (myitm)
          if (myitm.length > 0)
            itm.tbl_ad_type = myitm[0].name;
        var myitm = [];
        myitm = $filter('filter')($scope.tbl_ad_years, function (itmx) {
          return (itmx.Id_year == itm.Id_year)
        });
        if (myitm)
          if (myitm.length > 0)
            itm.tbl_ad_year = myitm[0].name;
        var myitm = [];
        myitm = $filter('filter')($scope.tbl_ad_colors, function (itmx) {
          return (itmx.Id_color == itm.Id_color)
        });
        if (myitm)
          if (myitm.length > 0)
            itm.tbl_ad_color = myitm[0].name;
        var myitm = [];
        myitm = $filter('filter')($scope.tbl_ad_managers, function (itmx) {
          return (itmx.Id_manager == itm.Id_manager)
        });
        if (myitm)
          if (myitm.length > 0)
            itm.tbl_ad_manager = myitm[0].name;
        var myitm = [];
        myitm = $filter('filter')($scope.tbl_ad_states, function (itmx) {
          return (itmx.Id_state == itm.Id_state)
        });
        if (myitm)
          if (myitm.length > 0)
            itm.tbl_ad_state = myitm[0].name;
        var myitm = [];
        myitm = $filter('filter')($scope.tbl_ad_inventory_states, function (itmx) {
          return (itmx.Id_inventory_state == itm.Id_inventory_state)
        });
        if (myitm)
          if (myitm.length > 0)
            itm.tbl_ad_inventory_state = myitm[0].name;
        var myitm = [];
        myitm = $filter('filter')($scope.tbl_ad_suppliers, function (itmx) {
          return (itmx.Id_supplier == itm.Id_supplier)
        });
        if (myitm)
          if (myitm.length > 0)
            itm.tbl_ad_supplier = myitm[0].name;
      });
    };

    $scope.loadData = function (q) {
      if (q) {
        $scope.pivot_data = $filter('filter')($scope.data, q);
      } else {
        $scope.pivot_data = $scope.data;
      }
    };

    $scope.$watch('record.q', function () {
      $scope.loadData($scope.record.q);
    });

    $scope.getData();


    $scope.open = function (record, size, actn) {
      var modalInstance = $uibModal.open({
        /*animation: $scope.animationsEnabled,*/
        templateUrl: 'app/view/tbl_ad_vehicle_det.html?dt=' + (new Date()).getTime(),
        controller: 'tbl_ad_vehicle_detCtrl',
        size: size,
        windowClass: 'modal-default',
        resolve: {
          record: function () { return ((!record ? {} : record)) },
          tbl_ad_locations: function () { return ($scope.tbl_ad_locations) },
          tbl_ad_makes: function () { return ($scope.tbl_ad_makes) },
          tbl_ad_models: function () { return ($scope.tbl_ad_models) },
          tbl_ad_types: function () { return ($scope.tbl_ad_types) },
          tbl_ad_years: function () { return ($scope.tbl_ad_years) },
          tbl_ad_colors: function () { return ($scope.tbl_ad_colors) },
          tbl_ad_managers: function () { return ($scope.tbl_ad_managers) },
          tbl_ad_states: function () { return ($scope.tbl_ad_states) },
          tbl_ad_inventory_states: function () { return ($scope.tbl_ad_inventory_states) },
          tbl_ad_suppliers: function () { return ($scope.tbl_ad_suppliers) }
        }
      });
      modalInstance.result.then(function (record) {
        $scope.getData();
      }, function () {
        $scope.getData();
        /*$log.info('Modal dismissed a')*/
      });
    };

    $log.info('tbl_ad_vehicleCtrl');
  });

  app.controller('tbl_ad_vehicle_detCtrl', function (Upload, $timeout, $scope, $rootScope, $log, $window, $http, $filter, autenticationService,
    $uibModalInstance, record, tbl_ad_locations, tbl_ad_makes, tbl_ad_models, tbl_ad_types, tbl_ad_years, tbl_ad_colors, tbl_ad_managers, tbl_ad_states, tbl_ad_inventory_states, tbl_ad_suppliers) {
    $scope.record = record;
    $scope.tbl_ad_locations = $filter('filter')(tbl_ad_locations, function (itm) { return (parseInt(itm.active) == 1) });
    $scope.tbl_ad_makes = $filter('filter')(tbl_ad_makes, function (itm) { return (parseInt(itm.active) == 1) });
    $scope.tbl_ad_models = $filter('filter')(tbl_ad_models, function (itm) { return (parseInt(itm.active) == 1) });
    $scope.tbl_ad_types = $filter('filter')(tbl_ad_types, function (itm) { return (parseInt(itm.active) == 1) });
    $scope.tbl_ad_years = $filter('filter')(tbl_ad_years, function (itm) { return (parseInt(itm.active) == 1) });
    $scope.tbl_ad_colors = $filter('filter')(tbl_ad_colors, function (itm) { return (parseInt(itm.active) == 1) });
    $scope.tbl_ad_managers = $filter('filter')(tbl_ad_managers, function (itm) { return (parseInt(itm.active) == 1) });
    $scope.tbl_ad_states = $filter('filter')(tbl_ad_states, function (itm) { return (parseInt(itm.active) == 1) });
    $scope.tbl_ad_inventory_states = $filter('filter')(tbl_ad_inventory_states, function (itm) { return (parseInt(itm.active) == 1) });
    $scope.tbl_ad_suppliers = $filter('filter')(tbl_ad_suppliers, function (itm) { return (parseInt(itm.active) == 1) });
    $scope.record.cmbId_location = {};
    $scope.record.cmbId_make = {};
    $scope.record.cmbId_model = {};
    $scope.record.cmbId_type = {};
    $scope.record.cmbId_year = {};
    $scope.record.cmbId_color = {};
    $scope.record.cmbId_manager = {};
    $scope.record.cmbId_state = {};
    $scope.record.cmbId_inventory_state = {};
    $scope.record.cmbId_supplier = {};

    $scope.$watch('record.cmbId_type', function () {
      setTimeout(function () {
        console.log('record.cmbId_type');
        $scope.$apply();
      }, 0);
    });

    $scope.prepareDataTree = function () {
      $scope.tbl_ad_locations_pivot = angular.copy($scope.tbl_ad_locations, $scope.tbl_ad_locations_pivot);
      $scope.tbl_ad_locations_pivot = $filter('orderBy')($scope.tbl_ad_locations_pivot, 'Id_location');

      angular.forEach($scope.tbl_ad_locations_pivot, function (itm) {
        itm.id = itm.Id_location;
        itm.parent = itm.Id_location_parent;
      });
      $scope.dataTreePivot = $scope.getTreeData(null);
      $scope.data2 = angular.copy($scope.dataTreePivot, $scope.data2);
      /*console.log($scope.data2);*/
    };

    $scope.dataTreePivot = [];
    $scope.getTreeData = function (parent) {
      var dataNodes = [];
      var dataFiltered = $filter('filter')($scope.tbl_ad_locations_pivot, function (itm) {
        return (itm.parent == parent);
      });

      /*console.log(dataFiltered);*/

      if (dataFiltered) {
        angular.forEach(dataFiltered, function (itm) {
          if (itm.id == $scope.record.Id_location) itm.selected = true;

          var nodes = $scope.getTreeData(itm.id);

          if (nodes.length > 0)
            itm.children = nodes;
          else
            itm.children = [];

          dataNodes.push(itm);
        });
      }

      return dataNodes;
    };

    $scope.$watchCollection('record.cmbId_locationx', function () {
      if ($scope.record.cmbId_locationx) {
        $scope.record.cmbId_location = $scope.record.cmbId_locationx[0];
        if ($scope.record.cmbId_location)
          $scope.record.Id_location = $scope.record.cmbId_location.Id_location;
      }
    });
    $scope.prepareDataTree();

    $scope.$watch('record.cmbId_make', function () {
      console.log($scope.record.cmbId_make);
      if ($scope.record.cmbId_make) {
        $scope.tbl_ad_models_pivot = angular.copy($scope.tbl_ad_models, $scope.tbl_ad_models_pivot);
        $scope.tbl_ad_models_pivot = $filter('filter')($scope.tbl_ad_models_pivot, function (itm) {
          return (itm.Id_make == $scope.record.cmbId_make.Id_make)
        });
        console.log($scope.tbl_ad_models_pivot);
        $scope.cargaCmbModels();
      }
    });

    $scope.tbl_ad_models_pivot = [];
    $scope.cargaCmbModels = function () {
      console.log($scope.record);
      var item;
      item = $filter('filter')($scope.tbl_ad_models_pivot, function (itm) {
        return (itm.Id_model == $scope.record.Id_model);
      });

      if (item.length > 0) {
        $scope.record.cmbId_model = item[0];
      }
    };

    $scope.cargaCmb = function () {
      var item;
      item = $filter('filter')($scope.tbl_ad_locations, function (itm) {
        return (itm.Id_location == $scope.record.Id_location);
      });
      if (item)
        if (item.length > 0) {
          $scope.record.cmbId_location = item[0];
        }
      item = $filter('filter')($scope.tbl_ad_makes, function (itm) {
        return (itm.Id_make == $scope.record.Id_make);
      });
      if (item.length > 0) {
        $scope.record.cmbId_make = item[0];
      }

      item = $filter('filter')($scope.tbl_ad_types, function (itm) {
        return (itm.Id_type == $scope.record.Id_type);
      });
      if (item)
        if (item.length > 0) {
          $scope.record.cmbId_type = item[0];
        }
      item = $filter('filter')($scope.tbl_ad_years, function (itm) {
        return (itm.Id_year == $scope.record.Id_year);
      });
      if (item)
        if (item.length > 0) {
          $scope.record.cmbId_year = item[0];
        }
      item = $filter('filter')($scope.tbl_ad_colors, function (itm) {
        return (itm.Id_color == $scope.record.Id_color);
      });
      if (item)
        if (item.length > 0) {
          $scope.record.cmbId_color = item[0];
        }
      item = $filter('filter')($scope.tbl_ad_managers, function (itm) {
        return (itm.Id_manager == $scope.record.Id_manager);
      });
      if (item)
        if (item.length > 0) {
          $scope.record.cmbId_manager = item[0];
        }
      item = $filter('filter')($scope.tbl_ad_states, function (itm) {
        return (itm.Id_state == $scope.record.Id_state);
      });
      if (item)
        if (item.length > 0) {
          $scope.record.cmbId_state = item[0];
        }
      item = $filter('filter')($scope.tbl_ad_inventory_states, function (itm) {
        return (itm.Id_inventory_state == $scope.record.Id_inventory_state);
      });
      if (item)
        if (item.length > 0) {
          $scope.record.cmbId_inventory_state = item[0];
        }
      item = $filter('filter')($scope.tbl_ad_suppliers, function (itm) {
        return (itm.Id_supplier == $scope.record.Id_supplier);
      });
      if (item)
        if (item.length > 0) {
          $scope.record.cmbId_supplier = item[0];
        }
    };

    $scope.save = function () {
      $scope.urls = [];
      $scope.record.deta0 = $scope.datatbl_ad_battery;
      angular.forEach($scope.record.deta0, function (itm) {
        itm.Id_vehicle = $scope.record.Id_vehicle;
      });
      $scope.record.deta1 = $scope.datatbl_ad_maintenance;
      angular.forEach($scope.record.deta1, function (itm) {
        itm.Id_vehicle = $scope.record.Id_vehicle;
      });
      $scope.record.deta2 = $scope.datatbl_ad_mileage;
      angular.forEach($scope.record.deta2, function (itm) {
        itm.Id_vehicle = $scope.record.Id_vehicle;
      });
      $scope.record.deta3 = $scope.datatbl_ad_new;
      angular.forEach($scope.record.deta3, function (itm) {
        itm.Id_vehicle = $scope.record.Id_vehicle;
      });
      $scope.record.deta4 = $scope.datatbl_ad_repair;
      angular.forEach($scope.record.deta4, function (itm) {
        itm.Id_vehicle = $scope.record.Id_vehicle;
      });
      $scope.record.deta5 = $scope.datatbl_ad_scheduling;
      angular.forEach($scope.record.deta5, function (itm) {
        itm.Id_vehicle = $scope.record.Id_vehicle;
      });
      $scope.record.deta0 = (!$scope.record.deta0 ? [] : $scope.record.deta0);
      $scope.record.deta1 = (!$scope.record.deta1 ? [] : $scope.record.deta1);
      $scope.record.deta2 = (!$scope.record.deta2 ? [] : $scope.record.deta2);
      $scope.record.deta3 = (!$scope.record.deta3 ? [] : $scope.record.deta3);
      $scope.record.deta4 = (!$scope.record.deta4 ? [] : $scope.record.deta4);
      $scope.record.deta5 = (!$scope.record.deta5 ? [] : $scope.record.deta5);

      $scope.record.deta0 = [];
      $scope.record.deta1 = [];
      $scope.record.deta2 = [];
      $scope.record.deta3 = [];
      $scope.record.deta4 = [];
      $scope.record.deta5 = [];

      $scope.urls.push({ url: '/server/main/tbl_ad_vehicle', params: $scope.record, action: (!$scope.record.Id_vehicle ? 'I' : 'U') });
      autenticationService.call($scope.urls).then(function (results) {
        setTimeout(function () {
          if ($rootScope.errormsg.length == 0)
            $uibModalInstance.close($scope.record);
          $scope.$apply();
        }, 0);
      });

    };
    $scope.close = function () {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.cargaCmb();

    /*TRIGGER tbl_ad_battery*/
    $scope.datatbl_ad_battery = [];
    $scope.TriggerLoadDatatbl_ad_battery = new EventTrigger();
    $scope.onCellClicktbl_ad_battery = function (datarow, colname, rowIndex, colIndex) {
      if (colname == 'Eliminar') {
        /*console.log('delete row: ' + rowIndex);*/
        $scope.deleteDetailstbl_ad_battery(1, datarow[0]);
        $scope.data.splicetbl_ad_battery(rowIndex, 1);
        $scope.getDatatbl_ad_battery();
      }
      if (colname == 'Agregar') {
        /*console.log('add row');*/
        $scope.addRowtbl_ad_battery();
        $scope.getDatatbl_ad_battery();
      }
    };

    $scope.deleteDetailstbl_ad_battery = function (type, ID) {
      /*var urls = [];
    
      if (type == 1)
        urls.push({
          url: 'server/main/tbl_ad_battery',
          param: {
              Id_battery: ID
          },
          action: 'D'
        });
    
      autenticationService.call(urls).then(function(results) {
        $scope.getDatatbl_ad_battery();
      });*/
    };

    $scope.onCellChangetbl_ad_battery = function (changes, source, datarow) {
      /*changes[0] 0 row, 1 field, 2 oldvalue, 3 newvalue*/
      var datapivot = {};
      datapivot = $scope.datatbl_ad_battery[changes[0][0]];
      datapivot[changes[0][1]] = changes[0][3];
      /*console.log('New Data onCellChange');
      console.log($scope.data);*/
    };

    $scope.addRowtbl_ad_battery = function () {
      $scope.datatbl_ad_battery.push({
        activo: 0,
        agregar: 'Agregar',
        eliminar: 'Eliminar'
      });
    };

    $scope.getDatatbl_ad_battery = function () {
      var urls = [];
      urls.push({ url: '/server/main/tbl_ad_battery', params: { Id_vehicle: (!$scope.record.Id_vehicle ? 0 : $scope.record.Id_vehicle) }, action: 'S' });
      autenticationService.call(urls).then(function (results) {
        $scope.datatbl_ad_battery = results[0].data.data;
        if ($scope.datatbl_ad_battery.length == 0) {
          for (var i = 0; i < 1; i++) {
            $scope.datatbl_ad_battery.push({
              agregar: 'Agregar',
              eliminar: 'Eliminar',
              activo: 1
            });
          }
        }
        $scope.datapivottbl_ad_battery = $scope.prepareDatatbl_ad_battery($scope.datatbl_ad_battery);

        $scope.TriggerLoadDatatbl_ad_battery.trigger({
          data: $scope.datapivottbl_ad_battery.data,
          headers: $scope.datapivottbl_ad_battery.headers,
          columns: $scope.datapivottbl_ad_battery.columns,
          editors: [
            {
              name: 'Id_battery',
              type: 'number'
            },




            {
              name: 'invoice',
              type: 'text'
            },
            {
              name: 'purchace_date',
              type: 'date'
            },
            {
              name: 'purchace_price',
              type: 'number'
            },
            {
              name: 'cells',
              type: 'number'
            },
            {
              name: 'comment',
              type: 'text'
            },
            {
              name: 'due_date',
              type: 'date'
            },
            {
              name: 'inactivation_date',
              type: 'date'
            },
            {
              name: 'date_mod',
              type: 'date'
            },
            {
              name: 'user_mod',
              type: 'text'
            },
            {
              name: 'active',
              type: 'number'
            },
          ],
          hiddenCols: []
        });

      });
    };

    $scope.prepareDatatbl_ad_battery = function (data) {
      var arr = angular.copy(data, arr);
      var arrpivot = [];

      var count = 0;
      var headers = ['Agregar', 'Eliminar',
        'Id_battery', 'Id_vehicle', 'Id_supplier', 'Id_battery_make', 'Id_battery_type', 'invoice', 'purchace_date', 'purchace_price', 'cells', 'comment', 'due_date', 'inactivation_date', 'date_mod', 'user_mod', 'active'];

      var columns = [{
        data: 'agregar',
        editor: false
      },
      {
        data: 'eliminar',
        editor: false
      },
      {
        data: 'Id_battery',
        editor: false
      },
      {
        data: 'Id_vehicle',
        editor: false
      },
      {
        data: 'Id_supplier',
        editor: false
      },
      {
        data: 'Id_battery_make',
        editor: false
      },
      {
        data: 'Id_battery_type',
        editor: false
      },
      {
        data: 'invoice',
        editor: false
      },
      {
        data: 'purchace_date',
        editor: false
      },
      {
        data: 'purchace_price',
        editor: false
      },
      {
        data: 'cells',
        editor: false
      },
      {
        data: 'comment',
        editor: false
      },
      {
        data: 'due_date',
        editor: false
      },
      {
        data: 'inactivation_date',
        editor: false
      },
      {
        data: 'date_mod',
        editor: false
      },
      {
        data: 'user_mod',
        editor: false
      },
      {
        data: 'active',
        editor: false
      },
      ];

      angular.forEach(arr, function (dr) {
        var myitm = {};
        myitm.agregar = 'Agregar';
        myitm.eliminar = 'Eliminar';
        myitm.Id_battery = dr.Id_battery;
        myitm.Id_vehicle = dr.Id_vehicle;
        myitm.Id_supplier = dr.Id_supplier;
        myitm.Id_battery_make = dr.Id_battery_make;
        myitm.Id_battery_type = dr.Id_battery_type;
        myitm.invoice = dr.invoice;
        myitm.purchace_date = dr.purchace_date;
        myitm.purchace_price = dr.purchace_price;
        myitm.cells = dr.cells;
        myitm.comment = dr.comment;
        myitm.due_date = dr.due_date;
        myitm.inactivation_date = dr.inactivation_date;
        myitm.date_mod = dr.date_mod;
        myitm.user_mod = dr.user_mod;
        myitm.active = dr.active;
        arrpivot.push(myitm);
      });

      return ({
        data: arrpivot,
        headers: headers,
        columns: columns
      });
    };

    setTimeout(function () {
      $scope.getDatatbl_ad_battery();
      $scope.$apply();
    }, 0);
    /*TRIGGER tbl_ad_battery*/
    /*TRIGGER tbl_ad_maintenance*/
    $scope.datatbl_ad_maintenance = [];
    $scope.TriggerLoadDatatbl_ad_maintenance = new EventTrigger();
    $scope.onCellClicktbl_ad_maintenance = function (datarow, colname, rowIndex, colIndex) {
      if (colname == 'Eliminar') {
        /*console.log('delete row: ' + rowIndex);*/
        $scope.deleteDetailstbl_ad_maintenance(1, datarow[0]);
        $scope.data.splicetbl_ad_maintenance(rowIndex, 1);
        $scope.getDatatbl_ad_maintenance();
      }
      if (colname == 'Agregar') {
        /*console.log('add row');*/
        $scope.addRowtbl_ad_maintenance();
        $scope.getDatatbl_ad_maintenance();
      }
    };

    $scope.deleteDetailstbl_ad_maintenance = function (type, ID) {
      /*var urls = [];
    
      if (type == 1)
        urls.push({
          url: 'server/main/tbl_ad_maintenance',
          param: {
              Id_maintenance: ID
          },
          action: 'D'
        });
    
      autenticationService.call(urls).then(function(results) {
        $scope.getDatatbl_ad_maintenance();
      });*/
    };

    $scope.onCellChangetbl_ad_maintenance = function (changes, source, datarow) {
      /*changes[0] 0 row, 1 field, 2 oldvalue, 3 newvalue*/
      var datapivot = {};
      datapivot = $scope.datatbl_ad_maintenance[changes[0][0]];
      datapivot[changes[0][1]] = changes[0][3];
      /*console.log('New Data onCellChange');
      console.log($scope.data);*/
    };

    $scope.addRowtbl_ad_maintenance = function () {
      $scope.datatbl_ad_maintenance.push({
        activo: 0,
        agregar: 'Agregar',
        eliminar: 'Eliminar'
      });
    };

    $scope.getDatatbl_ad_maintenance = function () {
      var urls = [];
      urls.push({ url: '/server/main/tbl_ad_maintenance', params: { Id_vehicle: (!$scope.record.Id_vehicle ? 0 : $scope.record.Id_vehicle) }, action: 'S' });
      autenticationService.call(urls).then(function (results) {
        $scope.datatbl_ad_maintenance = results[0].data.data;
        if ($scope.datatbl_ad_maintenance.length == 0) {
          for (var i = 0; i < 1; i++) {
            $scope.datatbl_ad_maintenance.push({
              agregar: 'Agregar',
              eliminar: 'Eliminar',
              activo: 1
            });
          }
        }
        $scope.datapivottbl_ad_maintenance = $scope.prepareDatatbl_ad_maintenance($scope.datatbl_ad_maintenance);

        $scope.TriggerLoadDatatbl_ad_maintenance.trigger({
          data: $scope.datapivottbl_ad_maintenance.data,
          headers: $scope.datapivottbl_ad_maintenance.headers,
          columns: $scope.datapivottbl_ad_maintenance.columns,
          editors: [
            {
              name: 'Id_maintenance',
              type: 'number'
            },



            {
              name: 'invoice',
              type: 'text'
            },
            {
              name: 'price',
              type: 'number'
            },
            {
              name: 'comment',
              type: 'text'
            },
            {
              name: 'mileage_service_next',
              type: 'number'
            },
            {
              name: 'mileage_service_current',
              type: 'number'
            },
            {
              name: 'has_history',
              type: 'number'
            },
            {
              name: 'is_clean',
              type: 'number'
            },
            {
              name: 'has_fuel',
              type: 'number'
            },
            {
              name: 'date_mod',
              type: 'date'
            },
            {
              name: 'user_mod',
              type: 'text'
            },
            {
              name: 'active',
              type: 'number'
            },
          ],
          hiddenCols: []
        });

      });
    };

    $scope.prepareDatatbl_ad_maintenance = function (data) {
      var arr = angular.copy(data, arr);
      var arrpivot = [];

      var count = 0;
      var headers = ['Agregar', 'Eliminar',
        'Id_maintenance', 'Id_vehicle', 'Id_supplier', 'Id_maintenance_type', 'invoice', 'price', 'comment', 'mileage_service_next', 'mileage_service_current', 'has_history', 'is_clean', 'has_fuel', 'date_mod', 'user_mod', 'active'];

      var columns = [{
        data: 'agregar',
        editor: false
      },
      {
        data: 'eliminar',
        editor: false
      },
      {
        data: 'Id_maintenance',
        editor: false
      },
      {
        data: 'Id_vehicle',
        editor: false
      },
      {
        data: 'Id_supplier',
        editor: false
      },
      {
        data: 'Id_maintenance_type',
        editor: false
      },
      {
        data: 'invoice',
        editor: false
      },
      {
        data: 'price',
        editor: false
      },
      {
        data: 'comment',
        editor: false
      },
      {
        data: 'mileage_service_next',
        editor: false
      },
      {
        data: 'mileage_service_current',
        editor: false
      },
      {
        data: 'has_history',
        editor: false
      },
      {
        data: 'is_clean',
        editor: false
      },
      {
        data: 'has_fuel',
        editor: false
      },
      {
        data: 'date_mod',
        editor: false
      },
      {
        data: 'user_mod',
        editor: false
      },
      {
        data: 'active',
        editor: false
      },
      ];

      angular.forEach(arr, function (dr) {
        var myitm = {};
        myitm.agregar = 'Agregar';
        myitm.eliminar = 'Eliminar';
        myitm.Id_maintenance = dr.Id_maintenance;
        myitm.Id_vehicle = dr.Id_vehicle;
        myitm.Id_supplier = dr.Id_supplier;
        myitm.Id_maintenance_type = dr.Id_maintenance_type;
        myitm.invoice = dr.invoice;
        myitm.price = dr.price;
        myitm.comment = dr.comment;
        myitm.mileage_service_next = dr.mileage_service_next;
        myitm.mileage_service_current = dr.mileage_service_current;
        myitm.has_history = dr.has_history;
        myitm.is_clean = dr.is_clean;
        myitm.has_fuel = dr.has_fuel;
        myitm.date_mod = dr.date_mod;
        myitm.user_mod = dr.user_mod;
        myitm.active = dr.active;
        arrpivot.push(myitm);
      });

      return ({
        data: arrpivot,
        headers: headers,
        columns: columns
      });
    };

    setTimeout(function () {
      $scope.getDatatbl_ad_maintenance();
      $scope.$apply();
    }, 0);
    /*TRIGGER tbl_ad_maintenance*/
    /*TRIGGER tbl_ad_mileage*/
    $scope.datatbl_ad_mileage = [];
    $scope.TriggerLoadDatatbl_ad_mileage = new EventTrigger();
    $scope.onCellClicktbl_ad_mileage = function (datarow, colname, rowIndex, colIndex) {
      if (colname == 'Eliminar') {
        /*console.log('delete row: ' + rowIndex);*/
        $scope.deleteDetailstbl_ad_mileage(1, datarow[0]);
        $scope.data.splicetbl_ad_mileage(rowIndex, 1);
        $scope.getDatatbl_ad_mileage();
      }
      if (colname == 'Agregar') {
        /*console.log('add row');*/
        $scope.addRowtbl_ad_mileage();
        $scope.getDatatbl_ad_mileage();
      }
    };

    $scope.deleteDetailstbl_ad_mileage = function (type, ID) {
      /*var urls = [];
    
      if (type == 1)
        urls.push({
          url: 'server/main/tbl_ad_mileage',
          param: {
              Id_mileage: ID
          },
          action: 'D'
        });
    
      autenticationService.call(urls).then(function(results) {
        $scope.getDatatbl_ad_mileage();
      });*/
    };

    $scope.onCellChangetbl_ad_mileage = function (changes, source, datarow) {
      /*changes[0] 0 row, 1 field, 2 oldvalue, 3 newvalue*/
      var datapivot = {};
      datapivot = $scope.datatbl_ad_mileage[changes[0][0]];
      datapivot[changes[0][1]] = changes[0][3];
      /*console.log('New Data onCellChange');
      console.log($scope.data);*/
    };

    $scope.addRowtbl_ad_mileage = function () {
      $scope.datatbl_ad_mileage.push({
        activo: 0,
        agregar: 'Agregar',
        eliminar: 'Eliminar'
      });
    };

    $scope.getDatatbl_ad_mileage = function () {
      var urls = [];
      urls.push({ url: '/server/main/tbl_ad_mileage', params: { Id_vehicle: (!$scope.record.Id_vehicle ? 0 : $scope.record.Id_vehicle) }, action: 'S' });
      autenticationService.call(urls).then(function (results) {
        $scope.datatbl_ad_mileage = results[0].data.data;
        if ($scope.datatbl_ad_mileage.length == 0) {
          for (var i = 0; i < 1; i++) {
            $scope.datatbl_ad_mileage.push({
              agregar: 'Agregar',
              eliminar: 'Eliminar',
              activo: 1
            });
          }
        }
        $scope.datapivottbl_ad_mileage = $scope.prepareDatatbl_ad_mileage($scope.datatbl_ad_mileage);

        $scope.TriggerLoadDatatbl_ad_mileage.trigger({
          data: $scope.datapivottbl_ad_mileage.data,
          headers: $scope.datapivottbl_ad_mileage.headers,
          columns: $scope.datapivottbl_ad_mileage.columns,
          editors: [
            {
              name: 'Id_mileage',
              type: 'number'
            },


            {
              name: 'mileage_date',
              type: 'date'
            },
            {
              name: 'mileage_current',
              type: 'number'
            },
            {
              name: 'name',
              type: 'text'
            },
            {
              name: 'comment',
              type: 'text'
            },
            {
              name: 'has_history',
              type: 'number'
            },
            {
              name: 'is_clean',
              type: 'number'
            },
            {
              name: 'has_fuel',
              type: 'number'
            },
            {
              name: 'circulation_card',
              type: 'text'
            },
            {
              name: 'light',
              type: 'number'
            },
            {
              name: 'date_mod',
              type: 'date'
            },
            {
              name: 'user_mod',
              type: 'text'
            },
            {
              name: 'active',
              type: 'number'
            },
          ],
          hiddenCols: []
        });

      });
    };

    $scope.prepareDatatbl_ad_mileage = function (data) {
      var arr = angular.copy(data, arr);
      var arrpivot = [];

      var count = 0;
      var headers = ['Agregar', 'Eliminar',
        'Id_mileage', 'Id_vehicle', 'Id_fuel_type', 'mileage_date', 'mileage_current', 'name', 'comment', 'has_history', 'is_clean', 'has_fuel', 'circulation_card', 'light', 'date_mod', 'user_mod', 'active'];

      var columns = [{
        data: 'agregar',
        editor: false
      },
      {
        data: 'eliminar',
        editor: false
      },
      {
        data: 'Id_mileage',
        editor: false
      },
      {
        data: 'Id_vehicle',
        editor: false
      },
      {
        data: 'Id_fuel_type',
        editor: false
      },
      {
        data: 'mileage_date',
        editor: false
      },
      {
        data: 'mileage_current',
        editor: false
      },
      {
        data: 'name',
        editor: false
      },
      {
        data: 'comment',
        editor: false
      },
      {
        data: 'has_history',
        editor: false
      },
      {
        data: 'is_clean',
        editor: false
      },
      {
        data: 'has_fuel',
        editor: false
      },
      {
        data: 'circulation_card',
        editor: false
      },
      {
        data: 'light',
        editor: false
      },
      {
        data: 'date_mod',
        editor: false
      },
      {
        data: 'user_mod',
        editor: false
      },
      {
        data: 'active',
        editor: false
      },
      ];

      angular.forEach(arr, function (dr) {
        var myitm = {};
        myitm.agregar = 'Agregar';
        myitm.eliminar = 'Eliminar';
        myitm.Id_mileage = dr.Id_mileage;
        myitm.Id_vehicle = dr.Id_vehicle;
        myitm.Id_fuel_type = dr.Id_fuel_type;
        myitm.mileage_date = dr.mileage_date;
        myitm.mileage_current = dr.mileage_current;
        myitm.name = dr.name;
        myitm.comment = dr.comment;
        myitm.has_history = dr.has_history;
        myitm.is_clean = dr.is_clean;
        myitm.has_fuel = dr.has_fuel;
        myitm.circulation_card = dr.circulation_card;
        myitm.light = dr.light;
        myitm.date_mod = dr.date_mod;
        myitm.user_mod = dr.user_mod;
        myitm.active = dr.active;
        arrpivot.push(myitm);
      });

      return ({
        data: arrpivot,
        headers: headers,
        columns: columns
      });
    };

    setTimeout(function () {
      $scope.getDatatbl_ad_mileage();
      $scope.$apply();
    }, 0);
    /*TRIGGER tbl_ad_mileage*/
    /*TRIGGER tbl_ad_new*/
    $scope.datatbl_ad_new = [];
    $scope.TriggerLoadDatatbl_ad_new = new EventTrigger();
    $scope.onCellClicktbl_ad_new = function (datarow, colname, rowIndex, colIndex) {
      if (colname == 'Eliminar') {
        /*console.log('delete row: ' + rowIndex);*/
        $scope.deleteDetailstbl_ad_new(1, datarow[0]);
        $scope.data.splicetbl_ad_new(rowIndex, 1);
        $scope.getDatatbl_ad_new();
      }
      if (colname == 'Agregar') {
        /*console.log('add row');*/
        $scope.addRowtbl_ad_new();
        $scope.getDatatbl_ad_new();
      }
    };

    $scope.deleteDetailstbl_ad_new = function (type, ID) {
      /*var urls = [];
    
      if (type == 1)
        urls.push({
          url: 'server/main/tbl_ad_new',
          param: {
              Id_new: ID
          },
          action: 'D'
        });
    
      autenticationService.call(urls).then(function(results) {
        $scope.getDatatbl_ad_new();
      });*/
    };

    $scope.onCellChangetbl_ad_new = function (changes, source, datarow) {
      /*changes[0] 0 row, 1 field, 2 oldvalue, 3 newvalue*/
      var datapivot = {};
      datapivot = $scope.datatbl_ad_new[changes[0][0]];
      datapivot[changes[0][1]] = changes[0][3];
      /*console.log('New Data onCellChange');
      console.log($scope.data);*/
    };

    $scope.addRowtbl_ad_new = function () {
      $scope.datatbl_ad_new.push({
        activo: 0,
        agregar: 'Agregar',
        eliminar: 'Eliminar'
      });
    };

    $scope.getDatatbl_ad_new = function () {
      var urls = [];
      urls.push({ url: '/server/main/tbl_ad_new', params: { Id_vehicle: (!$scope.record.Id_vehicle ? 0 : $scope.record.Id_vehicle) }, action: 'S' });
      autenticationService.call(urls).then(function (results) {
        $scope.datatbl_ad_new = results[0].data.data;
        if ($scope.datatbl_ad_new.length == 0) {
          for (var i = 0; i < 1; i++) {
            $scope.datatbl_ad_new.push({
              agregar: 'Agregar',
              eliminar: 'Eliminar',
              activo: 1
            });
          }
        }
        $scope.datapivottbl_ad_new = $scope.prepareDatatbl_ad_new($scope.datatbl_ad_new);

        $scope.TriggerLoadDatatbl_ad_new.trigger({
          data: $scope.datapivottbl_ad_new.data,
          headers: $scope.datapivottbl_ad_new.headers,
          columns: $scope.datapivottbl_ad_new.columns,
          editors: [
            {
              name: 'Id_new',
              type: 'number'
            },



            {
              name: 'event_date',
              type: 'date'
            },
            {
              name: 'event_site',
              type: 'text'
            },
            {
              name: 'price',
              type: 'number'
            },
            {
              name: 'comment',
              type: 'text'
            },
            {
              name: 'image1',
              type: 'text'
            },
            {
              name: 'image2',
              type: 'text'
            },
            {
              name: 'image3',
              type: 'text'
            },
            {
              name: 'image4',
              type: 'text'
            },
            {
              name: 'image5',
              type: 'text'
            },
            {
              name: 'image6',
              type: 'text'
            },
            {
              name: 'date_mod',
              type: 'date'
            },
            {
              name: 'user_mod',
              type: 'text'
            },
            {
              name: 'active',
              type: 'number'
            },
          ],
          hiddenCols: []
        });

      });
    };

    $scope.prepareDatatbl_ad_new = function (data) {
      var arr = angular.copy(data, arr);
      var arrpivot = [];

      var count = 0;
      var headers = ['Agregar', 'Eliminar',
        'Id_new', 'Id_new_type', 'Id_vehicle', 'Id_manager', 'event_date', 'event_site', 'price', 'comment', 'image1', 'image2', 'image3', 'image4', 'image5', 'image6', 'date_mod', 'user_mod', 'active'];

      var columns = [{
        data: 'agregar',
        editor: false
      },
      {
        data: 'eliminar',
        editor: false
      },
      {
        data: 'Id_new',
        editor: false
      },
      {
        data: 'Id_new_type',
        editor: false
      },
      {
        data: 'Id_vehicle',
        editor: false
      },
      {
        data: 'Id_manager',
        editor: false
      },
      {
        data: 'event_date',
        editor: false
      },
      {
        data: 'event_site',
        editor: false
      },
      {
        data: 'price',
        editor: false
      },
      {
        data: 'comment',
        editor: false
      },
      {
        data: 'image1',
        editor: false
      },
      {
        data: 'image2',
        editor: false
      },
      {
        data: 'image3',
        editor: false
      },
      {
        data: 'image4',
        editor: false
      },
      {
        data: 'image5',
        editor: false
      },
      {
        data: 'image6',
        editor: false
      },
      {
        data: 'date_mod',
        editor: false
      },
      {
        data: 'user_mod',
        editor: false
      },
      {
        data: 'active',
        editor: false
      },
      ];

      angular.forEach(arr, function (dr) {
        var myitm = {};
        myitm.agregar = 'Agregar';
        myitm.eliminar = 'Eliminar';
        myitm.Id_new = dr.Id_new;
        myitm.Id_new_type = dr.Id_new_type;
        myitm.Id_vehicle = dr.Id_vehicle;
        myitm.Id_manager = dr.Id_manager;
        myitm.event_date = dr.event_date;
        myitm.event_site = dr.event_site;
        myitm.price = dr.price;
        myitm.comment = dr.comment;
        myitm.image1 = dr.image1;
        myitm.image2 = dr.image2;
        myitm.image3 = dr.image3;
        myitm.image4 = dr.image4;
        myitm.image5 = dr.image5;
        myitm.image6 = dr.image6;
        myitm.date_mod = dr.date_mod;
        myitm.user_mod = dr.user_mod;
        myitm.active = dr.active;
        arrpivot.push(myitm);
      });

      return ({
        data: arrpivot,
        headers: headers,
        columns: columns
      });
    };

    setTimeout(function () {
      $scope.getDatatbl_ad_new();
      $scope.$apply();
    }, 0);
    /*TRIGGER tbl_ad_new*/
    /*TRIGGER tbl_ad_repair*/
    $scope.datatbl_ad_repair = [];
    $scope.TriggerLoadDatatbl_ad_repair = new EventTrigger();
    $scope.onCellClicktbl_ad_repair = function (datarow, colname, rowIndex, colIndex) {
      if (colname == 'Eliminar') {
        /*console.log('delete row: ' + rowIndex);*/
        $scope.deleteDetailstbl_ad_repair(1, datarow[0]);
        $scope.data.splicetbl_ad_repair(rowIndex, 1);
        $scope.getDatatbl_ad_repair();
      }
      if (colname == 'Agregar') {
        /*console.log('add row');*/
        $scope.addRowtbl_ad_repair();
        $scope.getDatatbl_ad_repair();
      }
    };

    $scope.deleteDetailstbl_ad_repair = function (type, ID) {
      /*var urls = [];
    
      if (type == 1)
        urls.push({
          url: 'server/main/tbl_ad_repair',
          param: {
              Id_repair: ID
          },
          action: 'D'
        });
    
      autenticationService.call(urls).then(function(results) {
        $scope.getDatatbl_ad_repair();
      });*/
    };

    $scope.onCellChangetbl_ad_repair = function (changes, source, datarow) {
      /*changes[0] 0 row, 1 field, 2 oldvalue, 3 newvalue*/
      var datapivot = {};
      datapivot = $scope.datatbl_ad_repair[changes[0][0]];
      datapivot[changes[0][1]] = changes[0][3];
      /*console.log('New Data onCellChange');
      console.log($scope.data);*/
    };

    $scope.addRowtbl_ad_repair = function () {
      $scope.datatbl_ad_repair.push({
        activo: 0,
        agregar: 'Agregar',
        eliminar: 'Eliminar'
      });
    };

    $scope.getDatatbl_ad_repair = function () {
      var urls = [];
      urls.push({ url: '/server/main/tbl_ad_repair', params: { Id_vehicle: (!$scope.record.Id_vehicle ? 0 : $scope.record.Id_vehicle) }, action: 'S' });
      autenticationService.call(urls).then(function (results) {
        $scope.datatbl_ad_repair = results[0].data.data;
        if ($scope.datatbl_ad_repair.length == 0) {
          for (var i = 0; i < 1; i++) {
            $scope.datatbl_ad_repair.push({
              agregar: 'Agregar',
              eliminar: 'Eliminar',
              activo: 1
            });
          }
        }
        $scope.datapivottbl_ad_repair = $scope.prepareDatatbl_ad_repair($scope.datatbl_ad_repair);

        $scope.TriggerLoadDatatbl_ad_repair.trigger({
          data: $scope.datapivottbl_ad_repair.data,
          headers: $scope.datapivottbl_ad_repair.headers,
          columns: $scope.datapivottbl_ad_repair.columns,
          editors: [
            {
              name: 'Id_repair',
              type: 'number'
            },



            {
              name: 'invoice',
              type: 'text'
            },
            {
              name: 'price',
              type: 'number'
            },
            {
              name: 'comment',
              type: 'text'
            },
            {
              name: 'mileage_service_next',
              type: 'number'
            },
            {
              name: 'mileage_service_current',
              type: 'number'
            },
            {
              name: 'has_history',
              type: 'number'
            },
            {
              name: 'is_clean',
              type: 'number'
            },
            {
              name: 'has_fuel',
              type: 'number'
            },
            {
              name: 'date_mod',
              type: 'date'
            },
            {
              name: 'user_mod',
              type: 'text'
            },
            {
              name: 'active',
              type: 'number'
            },
          ],
          hiddenCols: []
        });

      });
    };

    $scope.prepareDatatbl_ad_repair = function (data) {
      var arr = angular.copy(data, arr);
      var arrpivot = [];

      var count = 0;
      var headers = ['Agregar', 'Eliminar',
        'Id_repair', 'Id_vehicle', 'Id_supplier', 'Id_maintenance_type', 'invoice', 'price', 'comment', 'mileage_service_next', 'mileage_service_current', 'has_history', 'is_clean', 'has_fuel', 'date_mod', 'user_mod', 'active'];

      var columns = [{
        data: 'agregar',
        editor: false
      },
      {
        data: 'eliminar',
        editor: false
      },
      {
        data: 'Id_repair',
        editor: false
      },
      {
        data: 'Id_vehicle',
        editor: false
      },
      {
        data: 'Id_supplier',
        editor: false
      },
      {
        data: 'Id_maintenance_type',
        editor: false
      },
      {
        data: 'invoice',
        editor: false
      },
      {
        data: 'price',
        editor: false
      },
      {
        data: 'comment',
        editor: false
      },
      {
        data: 'mileage_service_next',
        editor: false
      },
      {
        data: 'mileage_service_current',
        editor: false
      },
      {
        data: 'has_history',
        editor: false
      },
      {
        data: 'is_clean',
        editor: false
      },
      {
        data: 'has_fuel',
        editor: false
      },
      {
        data: 'date_mod',
        editor: false
      },
      {
        data: 'user_mod',
        editor: false
      },
      {
        data: 'active',
        editor: false
      },
      ];

      angular.forEach(arr, function (dr) {
        var myitm = {};
        myitm.agregar = 'Agregar';
        myitm.eliminar = 'Eliminar';
        myitm.Id_repair = dr.Id_repair;
        myitm.Id_vehicle = dr.Id_vehicle;
        myitm.Id_supplier = dr.Id_supplier;
        myitm.Id_maintenance_type = dr.Id_maintenance_type;
        myitm.invoice = dr.invoice;
        myitm.price = dr.price;
        myitm.comment = dr.comment;
        myitm.mileage_service_next = dr.mileage_service_next;
        myitm.mileage_service_current = dr.mileage_service_current;
        myitm.has_history = dr.has_history;
        myitm.is_clean = dr.is_clean;
        myitm.has_fuel = dr.has_fuel;
        myitm.date_mod = dr.date_mod;
        myitm.user_mod = dr.user_mod;
        myitm.active = dr.active;
        arrpivot.push(myitm);
      });

      return ({
        data: arrpivot,
        headers: headers,
        columns: columns
      });
    };

    setTimeout(function () {
      $scope.getDatatbl_ad_repair();
      $scope.$apply();
    }, 0);
    /*TRIGGER tbl_ad_repair*/
    /*TRIGGER tbl_ad_scheduling*/
    $scope.datatbl_ad_scheduling = [];
    $scope.TriggerLoadDatatbl_ad_scheduling = new EventTrigger();
    $scope.onCellClicktbl_ad_scheduling = function (datarow, colname, rowIndex, colIndex) {
      if (colname == 'Eliminar') {
        /*console.log('delete row: ' + rowIndex);*/
        $scope.deleteDetailstbl_ad_scheduling(1, datarow[0]);
        $scope.data.splicetbl_ad_scheduling(rowIndex, 1);
        $scope.getDatatbl_ad_scheduling();
      }
      if (colname == 'Agregar') {
        /*console.log('add row');*/
        $scope.addRowtbl_ad_scheduling();
        $scope.getDatatbl_ad_scheduling();
      }
    };

    $scope.deleteDetailstbl_ad_scheduling = function (type, ID) {
      /*var urls = [];
    
      if (type == 1)
        urls.push({
          url: 'server/main/tbl_ad_scheduling',
          param: {
              Id_scheduling: ID
          },
          action: 'D'
        });
    
      autenticationService.call(urls).then(function(results) {
        $scope.getDatatbl_ad_scheduling();
      });*/
    };

    $scope.onCellChangetbl_ad_scheduling = function (changes, source, datarow) {
      /*changes[0] 0 row, 1 field, 2 oldvalue, 3 newvalue*/
      var datapivot = {};
      datapivot = $scope.datatbl_ad_scheduling[changes[0][0]];
      datapivot[changes[0][1]] = changes[0][3];
      /*console.log('New Data onCellChange');
      console.log($scope.data);*/
    };

    $scope.addRowtbl_ad_scheduling = function () {
      $scope.datatbl_ad_scheduling.push({
        activo: 0,
        agregar: 'Agregar',
        eliminar: 'Eliminar'
      });
    };

    $scope.getDatatbl_ad_scheduling = function () {
      var urls = [];
      urls.push({ url: '/server/main/tbl_ad_scheduling', params: { Id_vehicle: (!$scope.record.Id_vehicle ? 0 : $scope.record.Id_vehicle) }, action: 'S' });
      autenticationService.call(urls).then(function (results) {
        $scope.datatbl_ad_scheduling = results[0].data.data;
        if ($scope.datatbl_ad_scheduling.length == 0) {
          for (var i = 0; i < 1; i++) {
            $scope.datatbl_ad_scheduling.push({
              agregar: 'Agregar',
              eliminar: 'Eliminar',
              activo: 1
            });
          }
        }
        $scope.datapivottbl_ad_scheduling = $scope.prepareDatatbl_ad_scheduling($scope.datatbl_ad_scheduling);

        $scope.TriggerLoadDatatbl_ad_scheduling.trigger({
          data: $scope.datapivottbl_ad_scheduling.data,
          headers: $scope.datapivottbl_ad_scheduling.headers,
          columns: $scope.datapivottbl_ad_scheduling.columns,
          editors: [
            {
              name: 'Id_scheduling',
              type: 'number'
            },

            {
              name: 'comment',
              type: 'text'
            },
            {
              name: 'source_address',
              type: 'text'
            },
            {
              name: 'destination_address',
              type: 'text'
            },
            {
              name: 'driver',
              type: 'text'
            },
            {
              name: 'start_date',
              type: 'date'
            },
            {
              name: 'end_date',
              type: 'date'
            },
            {
              name: 'mileage_start',
              type: 'number'
            },
            {
              name: 'mileage_end',
              type: 'number'
            },
            {
              name: 'date_mod',
              type: 'date'
            },
            {
              name: 'user_mod',
              type: 'text'
            },
            {
              name: 'active',
              type: 'number'
            },
          ],
          hiddenCols: []
        });

      });
    };

    $scope.prepareDatatbl_ad_scheduling = function (data) {
      var arr = angular.copy(data, arr);
      var arrpivot = [];

      var count = 0;
      var headers = ['Agregar', 'Eliminar',
        'Id_scheduling', 'Id_vehicle', 'comment', 'source_address', 'destination_address', 'driver', 'start_date', 'end_date', 'mileage_start', 'mileage_end', 'date_mod', 'user_mod', 'active'];

      var columns = [{
        data: 'agregar',
        editor: false
      },
      {
        data: 'eliminar',
        editor: false
      },
      {
        data: 'Id_scheduling',
        editor: false
      },
      {
        data: 'Id_vehicle',
        editor: false
      },
      {
        data: 'comment',
        editor: false
      },
      {
        data: 'source_address',
        editor: false
      },
      {
        data: 'destination_address',
        editor: false
      },
      {
        data: 'driver',
        editor: false
      },
      {
        data: 'start_date',
        editor: false
      },
      {
        data: 'end_date',
        editor: false
      },
      {
        data: 'mileage_start',
        editor: false
      },
      {
        data: 'mileage_end',
        editor: false
      },
      {
        data: 'date_mod',
        editor: false
      },
      {
        data: 'user_mod',
        editor: false
      },
      {
        data: 'active',
        editor: false
      },
      ];

      angular.forEach(arr, function (dr) {
        var myitm = {};
        myitm.agregar = 'Agregar';
        myitm.eliminar = 'Eliminar';
        myitm.Id_scheduling = dr.Id_scheduling;
        myitm.Id_vehicle = dr.Id_vehicle;
        myitm.comment = dr.comment;
        myitm.source_address = dr.source_address;
        myitm.destination_address = dr.destination_address;
        myitm.driver = dr.driver;
        myitm.start_date = dr.start_date;
        myitm.end_date = dr.end_date;
        myitm.mileage_start = dr.mileage_start;
        myitm.mileage_end = dr.mileage_end;
        myitm.date_mod = dr.date_mod;
        myitm.user_mod = dr.user_mod;
        myitm.active = dr.active;
        arrpivot.push(myitm);
      });

      return ({
        data: arrpivot,
        headers: headers,
        columns: columns
      });
    };

    setTimeout(function () {
      $scope.getDatatbl_ad_scheduling();
      $scope.$apply();
    }, 0);
    /*TRIGGER tbl_ad_scheduling*/
    $scope.uploadFiles = function (file, errFiles, imgfield) {
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

        file.upload.then(function (response) {
          $timeout(function () {
            file.result = response.data;
            $log.info(JSON.stringify(response.data));
            $scope.record[imgfield] = file.result.data.filename;
          });
        }, function (response) {
          if (response.status > 0) {
            $scope.errorMsg = response.status + ': ' + response.data;
            console.log(response);
          }
        }, function (evt) {
          file.progress = Math.min(100, parseInt(100.0 *
            evt.loaded / evt.total));
        });
      }
    };
    $log.info('tbl_ad_vehicle_detCtrl');
  });
}());
