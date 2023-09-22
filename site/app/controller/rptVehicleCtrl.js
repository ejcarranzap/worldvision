(function () {
  'use strict'
  var app = angular.module('itxwebApp')
  app.controller('rptVehicleCtrl', function ($scope, $rootScope, $log, $window, $http, $filter, autenticationService, $uibModal) {
    $rootScope.Panel = 'Historial Vehículo';
    $rootScope.PanelTitle = 'Administración';
    $rootScope.PanelSubTitle = 'Reportes';
    $rootScope.PanelSubSubTitle = 'Historial Vehículo';
    $scope.record = {};

    $scope.getDataInit = function () {
      $scope.urls = [];
      $scope.urls.push({ url: '/server/main/tbl_ad_vehicle', params: {}, action: 'S' });
      $scope.urls.push({ url: '/server/main/tbl_ad_location', params: {}, action: 'S' });
      autenticationService.call($scope.urls).then(function (results) {
        setTimeout(function () {
          $scope.tbl_ad_vehicles = $filter('filter')(results[0].data.data, function(itm){ return (parseInt(itm.active)==1)});
          $scope.tbl_ad_locations =  $filter('filter')(results[1].data.data, function(itm){ return (parseInt(itm.active)==1)});
          /*$scope.prepareData();
          $scope.loadData();*/
          $scope.prepareDataTree();
          $scope.$apply();
        }, 0);
      });
    };

    $scope.getDataInit();

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


    $scope.getData = function () {
      $scope.urls = [];
      $scope.urls.push({ url: '/server/main/tool', params: $scope.record, action: 'B' });
      autenticationService.call($scope.urls).then(function (results) {
        setTimeout(function () {
          $scope.data = results[0].data.data;
          $scope.prepareData();
          $scope.loadData();
          $scope.$apply();
        }, 0);
      });
    };

    $scope.prepareData = function () {
      angular.forEach($scope.data, function (itm) {
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
      if ($scope.record.q)
        $scope.loadData($scope.record.q);
    });

    $log.info('rptVehicleCtrl');
  });
}());
