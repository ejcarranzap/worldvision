(function() {
    'use strict';
    var app = angular.module('itxwebApp')
    app.controller('tbl_ad_segc_incident_classCtrl', function($scope, $rootScope, $log, $window, $http, $filter, autenticationService, $uibModal) {
        $rootScope.Panel = 'Clasificacion Activo';
        $rootScope.PanelTitle = 'Administracion';
        $rootScope.PanelSubTitle = 'Seguridad Corporativa';
        $rootScope.PanelSubSubTitle = 'Clasificacion Activo';
        $scope.record = {};
        $scope.data = {};
        $scope.pivot_data = {};

        $scope.getData = function() {
            $scope.urls = [];
            $scope.urls.push({
                url: '/server/main/tbl_ad_segc_incident_class',
                params: {},
                action: 'S'
            });
            $scope.urls.push({
                url: '/server/main/tbl_ad_segc_incident_class',
                params: {},
                action: 'S'
            });
            autenticationService.call($scope.urls).then(function(results) {
                setTimeout(function() {
                    $scope.data = results[0].data.data;
                    $scope.tbl_ad_segc_incident_classs = results[1].data.data;
                    $scope.prepareData();
                    $scope.loadData();
                    $scope.$apply();
                }, 0);
            });
        };

        $scope.prepareData = function() {
            angular.forEach($scope.data, function(itm) {
                var itmaux;
                
                itmaux = $filter('filter')($scope.tbl_ad_segc_incident_classs, function(o) {
                    return o.Id_incident_class == itm.Id_parent;
                });
                if(itmaux.length > 0) { itmaux = itmaux[0]; } else { itmaux = {}; }
                itm.tbl_ad_segc_incident_class = itmaux.name;
                
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
                templateUrl: 'app/view/tbl_ad_segc_incident_class_det.html?dt=' + (new Date()).getTime(),
                controller: 'tbl_ad_segc_incident_class_detCtrl',
                size: size,
                windowClass: 'modal-default',
                resolve: {
                    record: function() {
                        return ((!record ? {} : record))                    },
                    tbl_ad_segc_incident_classs: function() {
                        return ((!$scope.tbl_ad_segc_incident_classs ? [] : $scope.tbl_ad_segc_incident_classs))
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

        $log.info('tbl_ad_segc_incident_classCtrl');
    });

    app.controller('tbl_ad_segc_incident_class_detCtrl', function(Upload, $timeout, $scope, $rootScope, $log, $window, $http, $filter, autenticationService,
        $uibModalInstance, record, tbl_ad_segc_incident_classs) {
        $scope.record = record;
        $scope.tbl_ad_segc_incident_classs = tbl_ad_segc_incident_classs;
        $scope.record.tbl_ad_segc_incident_classCmb = {};

        $scope.cargaCmb = function() {
            var itmaux;
            
            itmaux = $filter('filter')($scope.tbl_ad_segc_incident_classs, function(o) {
                return o.Id_incident_class == $scope.record.Id_parent;
            });
            if(itmaux.length > 0) { itmaux = itmaux[0]; } else { itmaux = {}; }
            $scope.record.tbl_ad_segc_incident_classCmb = itmaux;
            
        };

        $scope.save = function() {
            $scope.urls = [];
            $scope.urls.push({
                url: '/server/main/tbl_ad_segc_incident_class',
                params: $scope.record,
                action: (!$scope.record.Id_incident_class ? 'I' : 'U')
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

        $log.info('tbl_ad_segc_incident_class_detCtrl');
    });
}());
