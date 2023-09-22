(function() {
    'use strict';
    var app = angular.module('itxwebApp')
    app.controller('tbl_ad_segc_incident_appCtrl', function($scope, $rootScope, $log, $window, $http, $filter, autenticationService, $uibModal) {
        $rootScope.Panel = 'Incidente App';
        $rootScope.PanelTitle = 'Title';
        $rootScope.PanelSubTitle = 'SubTitle';
        $rootScope.PanelSubSubTitle = 'Incidente App';
        $scope.record = {};
        $scope.data = {};
        $scope.pivot_data = {};

        $scope.getData = function() {
            $scope.urls = [];
            $scope.urls.push({
                url: '/server/main/tbl_ad_segc_incident_app',
                params: {},
                action: 'S'
            });
            $scope.urls.push({
                url: '/server/main/tbl_ad_segc_incident_type',
                params: {},
                action: 'S'
            });
            autenticationService.call($scope.urls).then(function(results) {
                setTimeout(function() {
                    $scope.data = results[0].data.data;
                    $scope.tbl_ad_segc_incident_types = results[1].data.data;
                    $scope.prepareData();
                    $scope.loadData();
                    $scope.$apply();
                }, 0);
            });
        };

        $scope.prepareData = function() {
            angular.forEach($scope.data, function(itm) {
                var itmaux;
                
                itmaux = $filter('filter')($scope.tbl_ad_segc_incident_types, function(o) {
                    return o.Id_incident_type == itm.Id_incident_type;
                });
                if(itmaux.length > 0) { itmaux = itmaux[0]; } else { itmaux = {}; }
                itm.tbl_ad_segc_incident_type = itmaux.name;
                
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
                templateUrl: 'app/view/tbl_ad_segc_incident_app_det.html?dt=' + (new Date()).getTime(),
                controller: 'tbl_ad_segc_incident_app_detCtrl',
                size: size,
                windowClass: 'modal-default',
                resolve: {
                    record: function() {
                        return ((!record ? {} : record))                    },
                    tbl_ad_segc_incident_types: function() {
                        return ((!$scope.tbl_ad_segc_incident_types ? [] : $scope.tbl_ad_segc_incident_types))
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

        $log.info('tbl_ad_segc_incident_appCtrl');
    });

    app.controller('tbl_ad_segc_incident_app_detCtrl', function(Upload, $timeout, $scope, $rootScope, $log, $window, $http, $filter, autenticationService,
        $uibModalInstance, record, tbl_ad_segc_incident_types) {
        $scope.record = record;
        $scope.tbl_ad_segc_incident_types = tbl_ad_segc_incident_types;
        $scope.record.tbl_ad_segc_incident_typeCmb = {};

        $scope.cargaCmb = function() {
            var itmaux;
            
            itmaux = $filter('filter')($scope.tbl_ad_segc_incident_types, function(o) {
                return o.Id_incident_type == $scope.record.Id_incident_type;
            });
            if(itmaux.length > 0) { itmaux = itmaux[0]; } else { itmaux = {}; }
            $scope.record.tbl_ad_segc_incident_typeCmb = itmaux;
            
        };

        $scope.save = function() {
            $scope.urls = [];
            $scope.urls.push({
                url: '/server/main/tbl_ad_segc_incident_app',
                params: $scope.record,
                action: (!$scope.record.Id_incident ? 'I' : 'U')
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

        $scope.cargaCmb();

        $log.info('tbl_ad_segc_incident_app_detCtrl');
    });
}());
