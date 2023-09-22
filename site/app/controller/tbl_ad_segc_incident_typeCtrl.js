(function() {
    'use strict';
    var app = angular.module('itxwebApp')
    app.controller('tbl_ad_segc_incident_typeCtrl', function($scope, $rootScope, $log, $window, $http, $filter, autenticationService, $uibModal) {
        $rootScope.Panel = 'Tipo de Incidente';
        $rootScope.PanelTitle = 'Administracion';
        $rootScope.PanelSubTitle = 'Seguridad Corporativa';
        $rootScope.PanelSubSubTitle = 'Tipo de Incidente';
        $scope.record = {};
        $scope.data = {};
        $scope.pivot_data = {};

        $scope.getData = function() {
            $scope.urls = [];
            $scope.urls.push({
                url: '/server/main/tbl_ad_segc_incident_type',
                params: {},
                action: 'S'
            });
            $scope.urls.push({
                url: '/server/main/tbl_ad_segc_incident_group',
                params: {},
                action: 'S'
            });
            autenticationService.call($scope.urls).then(function(results) {
                setTimeout(function() {
                    $scope.data = results[0].data.data;
                    $scope.tbl_ad_segc_incident_groups = results[1].data.data;
                    $scope.prepareData();
                    $scope.loadData();
                    $scope.$apply();
                }, 0);
            });
        };

        $scope.prepareData = function() {
            angular.forEach($scope.data, function(itm) {
                var itmaux;
                
                itmaux = $filter('filter')($scope.tbl_ad_segc_incident_groups, function(o) {
                    return o.Id_incident_group == itm.Id_incident_group;
                });
                if(itmaux.length > 0) { itmaux = itmaux[0]; } else { itmaux = {}; }
                itm.tbl_ad_segc_incident_group = itmaux.name;
                
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
                templateUrl: 'app/view/tbl_ad_segc_incident_type_det.html?dt=' + (new Date()).getTime(),
                controller: 'tbl_ad_segc_incident_type_detCtrl',
                size: size,
                windowClass: 'modal-default',
                resolve: {
                    record: function() {
                        return ((!record ? {} : record))                    },
                    tbl_ad_segc_incident_groups: function() {
                        return ((!$scope.tbl_ad_segc_incident_groups ? [] : $scope.tbl_ad_segc_incident_groups))
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

        $log.info('tbl_ad_segc_incident_typeCtrl');
    });

    app.controller('tbl_ad_segc_incident_type_detCtrl', function(Upload, $timeout, $scope, $rootScope, $log, $window, $http, $filter, autenticationService,
        $uibModalInstance, record, tbl_ad_segc_incident_groups) {
        $scope.record = record;
        $scope.tbl_ad_segc_incident_groups = tbl_ad_segc_incident_groups;
        $scope.record.tbl_ad_segc_incident_groupCmb = {};

        $scope.cargaCmb = function() {
            var itmaux;
            
            itmaux = $filter('filter')($scope.tbl_ad_segc_incident_groups, function(o) {
                return o.Id_incident_group == $scope.record.Id_incident_group;
            });
            if(itmaux.length > 0) { itmaux = itmaux[0]; } else { itmaux = {}; }
            $scope.record.tbl_ad_segc_incident_groupCmb = itmaux;
            
        };

        $scope.save = function() {
            $scope.urls = [];
            $scope.urls.push({
                url: '/server/main/tbl_ad_segc_incident_type',
                params: $scope.record,
                action: (!$scope.record.Id_incident_type ? 'I' : 'U')
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

        $log.info('tbl_ad_segc_incident_type_detCtrl');
    });
}());
