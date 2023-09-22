(function() {
  'use strict'
  var app = angular.module('itxwebApp')
  app.controller('tbl_ad_repairCtrl', function($scope, $rootScope, $log, $window, $http, $filter, autenticationService, $uibModal) {
    $rootScope.Panel = 'Reparación';
    $rootScope.PanelTitle = 'Administraciín';
    $rootScope.PanelSubTitle = 'Transacciones';
    $rootScope.PanelSubSubTitle = 'Reparación';
    $scope.record = {};
    $scope.data = {};
    $scope.pivot_data = {};
 
    $scope.getData = function(){
      $scope.urls = [];
      $scope.urls.push({url: '/server/main/tbl_ad_repair', params: {}, action: 'S'});
      $scope.urls.push({url: '/server/main/tbl_ad_vehicle', params: {}, action: 'S'});
      $scope.urls.push({url: '/server/main/tbl_ad_supplier', params: {}, action: 'S'});
      $scope.urls.push({url: '/server/main/tbl_ad_maintenance_type', params: {}, action: 'S'});
      autenticationService.call($scope.urls).then(function(results){
        setTimeout(function(){
          $scope.data = results[0].data.data;
          $scope.tbl_ad_vehicles = results[1].data.data;
          $scope.tbl_ad_suppliers = results[2].data.data;
          $scope.tbl_ad_maintenance_types = results[3].data.data;
          $scope.prepareData();
          $scope.loadData();
          $scope.$apply();
        },0);
      });
    };
 
    $scope.prepareData = function () {
      angular.forEach($scope.data, function (itm) {
        var myitm = [];
        myitm = $filter('filter')($scope.tbl_ad_vehicles,function(itmx){
          return (itmx.Id_vehicle == itm.Id_vehicle)
        });
        if(myitm)
          if(myitm.length > 0)
            itm.tbl_ad_vehicle = myitm[0].vehiculo;
        var myitm = [];
        myitm = $filter('filter')($scope.tbl_ad_suppliers,function(itmx){
          return (itmx.Id_supplier == itm.Id_supplier)
        });
        if(myitm)
          if(myitm.length > 0)
            itm.tbl_ad_supplier = myitm[0].name;
        var myitm = [];
        myitm = $filter('filter')($scope.tbl_ad_maintenance_types,function(itmx){
          return (itmx.Id_maintenance_type == itm.Id_maintenance_type)
        });
        if(myitm)
          if(myitm.length > 0)
            itm.tbl_ad_maintenance_type = myitm[0].name;
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
                templateUrl: 'app/view/tbl_ad_repair_det.html?dt=' + (new Date()).getTime(),
                controller: 'tbl_ad_repair_detCtrl',
                size: size,
                windowClass: 'modal-default',
                resolve: {
                  record: function(){return((!record ? {} : record))},
                  tbl_ad_vehicles: function(){return($scope.tbl_ad_vehicles)},
                  tbl_ad_suppliers: function(){return($scope.tbl_ad_suppliers)},
                  tbl_ad_maintenance_types: function(){return($scope.tbl_ad_maintenance_types)}
                }
            });
            modalInstance.result.then(function (record) {
              $scope.getData();
            }, function () {
              $scope.getData();
        /*$log.info('Modal dismissed a')*/
        });
    };

    $log.info('tbl_ad_repairCtrl');
  });

  app.controller('tbl_ad_repair_detCtrl', function(Upload, $timeout, $scope, $rootScope, $log, $window, $http, $filter, autenticationService,
    $uibModalInstance, record, tbl_ad_vehicles, tbl_ad_suppliers, tbl_ad_maintenance_types) {
    $scope.record = record;
    $scope.tbl_ad_vehicles = $filter('filter')(tbl_ad_vehicles, function(itm){return (parseInt(itm.active)==1)});
    $scope.tbl_ad_suppliers = $filter('filter')(tbl_ad_suppliers, function(itm){return (parseInt(itm.active)==1)});
    $scope.tbl_ad_maintenance_types = $filter('filter')(tbl_ad_maintenance_types, function(itm){return (parseInt(itm.active)==1)});
    $scope.record.cmbId_vehicle = {};
    $scope.record.cmbId_supplier = {};
    $scope.record.cmbId_maintenance_type = {};

    $scope.cargaCmb = function(){
        var item;
        item = $filter('filter')($scope.tbl_ad_vehicles, function(itm){
          return (itm.Id_vehicle == $scope.record.Id_vehicle);
        });
        if(item.length > 0){
          $scope.record.cmbId_vehicle = item[0];
        }
        item = $filter('filter')($scope.tbl_ad_suppliers, function(itm){
          return (itm.Id_supplier == $scope.record.Id_supplier);
        });
        if(item.length > 0){
          $scope.record.cmbId_supplier = item[0];
        }
        item = $filter('filter')($scope.tbl_ad_maintenance_types, function(itm){
          return (itm.Id_maintenance_type == $scope.record.Id_maintenance_type);
        });
        if(item.length > 0){
          $scope.record.cmbId_maintenance_type = item[0];
        }
    };

    $scope.save = function(){
      $scope.urls = [];
      $scope.urls.push({url: '/server/main/tbl_ad_repair', params: $scope.record, action: (!$scope.record.Id_repair ? 'I' : 'U')});
      autenticationService.call($scope.urls).then(function(results){
        setTimeout(function(){
          if($rootScope.errormsg.length == 0)
          $uibModalInstance.close($scope.record);
          $scope.$apply();
        },0);
      });

    };
    $scope.close = function(){
      $uibModalInstance.dismiss('cancel');
    };

    $scope.cargaCmb();
    
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
                if (response.status > 0){
                    $scope.errorMsg = response.status + ': ' + response.data;
                    console.log(response);
                }
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
            });
        }
    };
    $log.info('tbl_ad_repair_detCtrl');
  });
}());
