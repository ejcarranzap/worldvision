(function() {
    'use strict';
    var app = angular.module('itxwebApp')
    app.controller('tbl_ad_travelCtrl', function($scope, $rootScope, $log, $window, $http, $filter, autenticationService, $uibModal) {
        $rootScope.Panel = 'Autorizacion de Viaje';
        $rootScope.PanelTitle = 'Viaje';
        $rootScope.PanelSubTitle = 'Viaje';
        $rootScope.PanelSubSubTitle = 'Autorizacion de Viaje';
        $scope.record = {};
        $scope.data = {};
        $scope.pivot_data = {};

        $scope.getData = function() {
            $scope.urls = [];
            $scope.urls.push({
                url: '/server/main/tbl_ad_travel',
                params: { Id_scheduling_state: 7 },
                action: 'S'
            });
            $scope.urls.push({
                url: '/server/main/tbl_ad_vehicle',
                params: {},
                action: 'S'
            });            
            autenticationService.call($scope.urls).then(function(results) {
                setTimeout(function() {
                    $scope.data = results[0].data.data;
                    $scope.tbl_ad_vehicles = results[1].data.data;
                    $scope.prepareData();
                    $scope.loadData();
                    $scope.$apply();
                }, 0);
            });
        };

        $scope.prepareData = function() {
            angular.forEach($scope.data, function(itm) {
                var itmaux;
                
                itmaux = $filter('filter')($scope.tbl_ad_vehicles, function(o) {
                    return o.Id_vehicle == itm.Id_vehicle;
                });
                if(itmaux.length > 0) { itmaux = itmaux[0]; } else { itmaux = {}; }
                itm.tbl_ad_vehicle = itmaux.vehiculo;
                
            });
        };

        $scope.loadData = function(q) {
            if (q) {
                $scope.pivot_data = $filter('filter')($scope.data, q);
            } else {
                $scope.pivot_data = $scope.data;
            }
        };

        $scope.$watch('record.q', function() {
            $scope.loadData($scope.record.q);
        });

        $scope.getData();


        $scope.open = function(record, size, actn) {
            var modalInstance = $uibModal.open({
                /*animation: $scope.animationsEnabled,*/
                templateUrl: 'app/view/tbl_ad_travel_det.html?dt=' + (new Date()).getTime(),
                controller: 'tbl_ad_travel_detCtrl',
                size: size,
                windowClass: 'modal-default',
                resolve: {
                    record: function() {
                        return ((!record ? {} : record))                    },
                    tbl_ad_vehicles: function() {
                        return ((!$scope.tbl_ad_vehicles ? [] : $scope.tbl_ad_vehicles))
                    },
                }
            });
            modalInstance.result.then(function(record) {
                $scope.getData();
            }, function() {
                $scope.getData();
                /*$log.info('Modal dismissed a')*/
            });
        };

        $log.info('tbl_ad_travelCtrl');
    });

    app.controller('tbl_ad_travel_detCtrl', function(Upload, $timeout, $scope, $rootScope, $log, $window, $http, $filter, autenticationService,
        $uibModalInstance, record, tbl_ad_vehicles) {
        $scope.record = record;
        $scope.tbl_ad_vehicles = tbl_ad_vehicles;
        $scope.record.tbl_ad_vehicleCmb = {};

        $scope.cargaCmb = function() {
            var itmaux;
            
            itmaux = $filter('filter')($scope.tbl_ad_vehicles, function(o) {
                return o.Id_vehicle == $scope.record.Id_vehicle;
            });
            if(itmaux.length > 0) { itmaux = itmaux[0]; } else { itmaux = {}; }
            $scope.record.tbl_ad_vehicleCmb = itmaux;
            
        };

        $scope.save = function() {
            $scope.urls = [];
            $scope.urls.push({
                url: '/server/main/tbl_ad_travel',
                params: $scope.record,
                action: (!$scope.record.Id_travel ? 'I' : 'U')
            });
            autenticationService.call($scope.urls).then(function(results) {
                setTimeout(function() {
                    if ($rootScope.errormsg.length == 0)
                        $uibModalInstance.close($scope.record);
                    $scope.$apply();
                }, 0);
            });

        };
        $scope.close = function() {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.autorizar = function(){
            $scope.urls = [];
            $scope.urls.push({
                url: '/server/main/tbl_ad_travel',
                params: $scope.record,
                action: 'A'
            });
            autenticationService.call($scope.urls).then(function(results) {
                setTimeout(function() {
                    if ($rootScope.errormsg.length == 0)
                        $uibModalInstance.close($scope.record);
                    $scope.$apply();
                }, 0);
            });
        };

        $scope.rechazar = function(){
            $scope.urls = [];
            $scope.urls.push({
                url: '/server/main/tbl_ad_travel',
                params: $scope.record,
                action: 'R'
            });
            autenticationService.call($scope.urls).then(function(results) {
                setTimeout(function() {
                    if ($rootScope.errormsg.length == 0)
                        $uibModalInstance.close($scope.record);
                    $scope.$apply();
                }, 0);
            });
        };

        $scope.cargaCmb();

        $log.info('tbl_ad_travel_detCtrl');
    });
}());
