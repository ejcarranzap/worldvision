(function () {
  'use strict'
  var app = angular.module('itxwebApp')
  app.controller('tbl_ad_schedulingCtrl', function ($scope, $rootScope, $log, $window, $http, $filter, autenticationService, $uibModal) {
    $rootScope.Panel = 'Asignación de Vehículo';
    $rootScope.PanelTitle = 'Administración';
    $rootScope.PanelSubTitle = 'Transacciones';
    $rootScope.PanelSubSubTitle = 'Asignación de Vehículo';
    $scope.record = {};
    $scope.data = {};
    $scope.pivot_data = {};

    $scope.tbl_actives = [{ id: 1, name: 'Reservado' }, { id: 2, name: 'Transíto' }, { id: 3, name: 'Disponible' }];

    $scope.getData = function () {
      $scope.urls = [];
      $scope.urls.push({ url: '/server/main/tbl_ad_scheduling', params: {}, action: 'S' });
      $scope.urls.push({ url: '/server/main/tbl_ad_vehicle', params: {}, action: 'S' });
      $scope.urls.push({ url: '/server/main/tbl_ad_scheduling_state', params: {}, action: 'S' });
      autenticationService.call($scope.urls).then(function (results) {
        setTimeout(function () {
          $scope.data = results[0].data.data;
          $scope.tbl_ad_vehicles = results[1].data.data;
          $scope.tbl_ad_scheduling_states = results[2].data.data;
          $scope.prepareData();
          $scope.loadData();
          $scope.$apply();
        }, 0);
      });
    };

    $scope.cancelScheduling = function (item) {
      item.active = 0;

      $scope.urls = [];
      item.Id_scheduling_state = 6;
      $scope.urls.push({ url: '/server/main/tbl_ad_scheduling', params: item, action: 'U' });
      autenticationService.call($scope.urls).then(function (results) {
        setTimeout(function () {
          $window.alert('La reservación ha sido cancelada con exito.');
          $scope.getData();
        }, 0);
      });
    };

    $scope.prepareData = function () {
      angular.forEach($scope.data, function (itm) {
        var myitm = [];
        myitm = $filter('filter')($scope.tbl_ad_vehicles, function (itmx) {
          return (itmx.Id_vehicle == itm.Id_vehicle)
        });
        if (myitm)
          if (myitm.length > 0)
            itm.tbl_ad_vehicle = myitm[0].vehiculo;

        myitm = $filter('filter')($scope.tbl_ad_scheduling_state, function (itmx) {
          return (itmx.Id_scheduling_state == itm.Id_scheduling_state)
        });
        if (myitm)
          if (myitm.length > 0)
            itm.tbl_scheduling_state = myitm[0].scheduling_state;
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
        templateUrl: 'app/view/tbl_ad_scheduling_det.html?dt=' + (new Date()).getTime(),
        controller: 'tbl_ad_scheduling_detCtrl',
        size: size,
        windowClass: 'modal-default',
        resolve: {
          record: function () { return ((!record ? { active: 1, Id_scheduling_state: 1 } : record)) },
          tbl_ad_vehicles: function () { return ($scope.tbl_ad_vehicles) },
          tbl_ad_scheduling_states: function () { return ($scope.tbl_ad_scheduling_states) }
        }
      });
      modalInstance.result.then(function (record) {
        $scope.getData();
      }, function () {
        $scope.getData();
        /*$log.info('Modal dismissed a')*/
      });
    };

    $log.info('tbl_ad_schedulingCtrl');
  });

  app.controller('tbl_ad_scheduling_detCtrl', function (Upload, $timeout, $scope, $rootScope, $log, $window, $http, $filter, autenticationService,
    $uibModalInstance, record, tbl_ad_vehicles, tbl_ad_scheduling_states) {
    $scope.record = record;
    $scope.tbl_ad_vehicles = $filter('filter')(tbl_ad_vehicles, function (itm) { return (parseInt(itm.active) == 1) });
    $scope.tbl_ad_scheduling_states = $filter('filter')(tbl_ad_scheduling_states, function (itm) { return (parseInt(itm.active) == 1) });
    $scope.record.cmbId_vehicle = {};
    $scope.tbl_ad_vehicles_pivot = [];

    $scope.isDisabled = true;

    $scope.loadVehicles = function (a, b) {
      console.log('loadVehicles');
      $scope.urls = [];
      $scope.urls.push({ url: '/server/main/tool', params: $scope.record, action: (!$scope.record.Id_scheduling ? 'SS' : 'SSA') });
      autenticationService.call($scope.urls).then(function (results) {
        setTimeout(function () {
          $scope.vehicledisponible = results[0].data.data;
          $scope.tbl_ad_vehicles_pivot = $filter('filter')($scope.tbl_ad_vehicles, function (itm) {
            var ok = false;
            angular.forEach($scope.vehicledisponible, function (itmx) {
              if (parseInt(itm.Id_vehicle) == parseInt(itmx.Id_vehicle)) {
                ok = true;
              }
            });
            return ok;
          });
          /*console.log($scope.tbl_ad_vehicles_pivot);
          console.log($scope.vehicledisponible);*/
          setTimeout(function () {
            $scope.$apply();
          }, 100);
        }, 0);
      });
    };


    setTimeout(function () {
      $scope.$watch('record.start_date', $scope.cleanLoadVehicles);
      $scope.$watch('record.end_date', $scope.cleanLoadVehicles);
      $scope.$apply();
    }, 0);


    $scope.cleanLoadVehicles = function () {
      $scope.tbl_ad_vehicles_pivot = [];
    };

    $scope.cargaCmb = function () {
      var item;
      item = $filter('filter')($scope.tbl_ad_vehicles, function (itm) {
        return (itm.Id_vehicle == $scope.record.Id_vehicle);
      });
      if (item.length > 0) {
        $scope.record.cmbId_vehicle = item[0];
      }
      item = $filter('filter')($scope.tbl_ad_scheduling_states, function (itm) {
        return (itm.Id_scheduling_state == $scope.record.Id_scheduling_state);
      });
      if (item.length > 0) {
        $scope.record.cmbId_scheduling_state = item[0];
      }
    };

    $scope.save = function () {
      $scope.urls = [];
      $scope.urls.push({ url: '/server/main/tbl_ad_scheduling', params: $scope.record, action: (!$scope.record.Id_scheduling ? 'I' : 'U') });
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
    $log.info('tbl_ad_scheduling_detCtrl');
  });
}());
