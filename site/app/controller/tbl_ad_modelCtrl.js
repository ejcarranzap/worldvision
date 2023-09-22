(function() {
  'use strict'
  var app = angular.module('itxwebApp')
  app.controller('tbl_ad_modelCtrl', function($scope, $rootScope, $log, $window, $http, $filter, autenticationService, $uibModal) {
    $rootScope.Panel = 'Modelo (Línea)';
    $rootScope.PanelTitle = 'Administración';
    $rootScope.PanelSubTitle = 'Vehículos';
    $rootScope.PanelSubSubTitle = 'Modelo (Línea)';
    $scope.record = {};
    $scope.data = {};
    $scope.pivot_data = {};
 
    $scope.getData = function(){
      $scope.urls = [];
      $scope.urls.push({url: '/server/main/tbl_ad_model', params: {}, action: 'S'});
      $scope.urls.push({url: '/server/main/tbl_ad_make', params: {}, action: 'S'});
      autenticationService.call($scope.urls).then(function(results){
        setTimeout(function(){
          $scope.data = results[0].data.data;
          $scope.tbl_ad_makes = results[1].data.data;
          $scope.prepareData();
          $scope.loadData();
          $scope.$apply();
        },0);
      });
    };
 
    $scope.prepareData = function () {
      angular.forEach($scope.data, function (itm) {
        var myitm = [];
        myitm = $filter('filter')($scope.tbl_ad_makes,function(itmx){
          return (itmx.Id_make == itm.Id_make)
        });
        if(myitm)
          if(myitm.length > 0)
            itm.tbl_ad_make = myitm[0].name;
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
                templateUrl: 'app/view/tbl_ad_model_det.html?dt=' + (new Date()).getTime(),
                controller: 'tbl_ad_model_detCtrl',
                size: size,
                windowClass: 'modal-default',
                resolve: {
                  record: function(){return((!record ? {} : record))},
                  tbl_ad_makes: function(){return($scope.tbl_ad_makes)}
                }
            });
            modalInstance.result.then(function (record) {
              $scope.getData();
            }, function () {
              $scope.getData();
        /*$log.info('Modal dismissed a')*/
        });
    };

    $log.info('tbl_ad_modelCtrl');
  });

  app.controller('tbl_ad_model_detCtrl', function(Upload, $timeout, $scope, $rootScope, $log, $window, $http, $filter, autenticationService,
    $uibModalInstance, record, tbl_ad_makes) {
    $scope.record = record;
    $scope.tbl_ad_makes = tbl_ad_makes;
    $scope.record.cmbId_make = {};

    $scope.cargaCmb = function(){
        var item;
        item = $filter('filter')($scope.tbl_ad_makes, function(itm){
          return (itm.Id_make == $scope.record.Id_make);
        });
        if(item.length > 0){
          $scope.record.cmbId_make = item[0];
        }
    };

    $scope.save = function(){
      $scope.urls = [];
      $scope.urls.push({url: '/server/main/tbl_ad_model', params: $scope.record, action: (!$scope.record.Id_model ? 'I' : 'U')});
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
    $log.info('tbl_ad_model_detCtrl');
  });
}());
