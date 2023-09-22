(function() {
    'use strict';
    var app = angular.module('itxwebApp')
    app.controller('tbl_ad_segc_personCtrl', function($scope, $rootScope, $log, $window, $http, $filter, autenticationService, $uibModal) {
        $rootScope.Panel = 'Persona';
        $rootScope.PanelTitle = 'Administracion';
        $rootScope.PanelSubTitle = 'Seguridad Corporativa';
        $rootScope.PanelSubSubTitle = 'Persona';
        $scope.record = {};
        $scope.data = {};
        $scope.pivot_data = {};

        $scope.getData = function() {
            $scope.urls = [];
            $scope.urls.push({
                url: '/server/main/tbl_ad_segc_person',
                params: {},
                action: 'S'
            });
            $scope.urls.push({
                url: '/server/main/tbl_ad_segc_relation_type',
                params: {},
                action: 'S'
            });
            $scope.urls.push({
                url: '/server/main/tbl_ad_segc_job_vacancy',
                params: {},
                action: 'S'
            });
            $scope.urls.push({
                url: '/server/main/tbl_ad_location',
                params: {},
                action: 'S'
            });
            autenticationService.call($scope.urls).then(function(results) {
                setTimeout(function() {
                    $scope.data = results[0].data.data;
                    $scope.tbl_ad_segc_relation_types = results[1].data.data;
                    $scope.tbl_ad_segc_job_vacancys = results[2].data.data;
                    $scope.tbl_ad_locations = results[3].data.data;
                    $scope.prepareData();
                    $scope.loadData();
                    $scope.$apply();
                }, 0);
            });
        };

        $scope.prepareData = function() {
            angular.forEach($scope.data, function(itm) {
                var itmaux;
                
                itmaux = $filter('filter')($scope.tbl_ad_segc_relation_types, function(o) {
                    return o.Id_relation_type == itm.Id_relation_type;
                });
                if(itmaux.length > 0) { itmaux = itmaux[0]; } else { itmaux = {}; }
                itm.tbl_ad_segc_relation_type = itmaux.name;
                
                
                itmaux = $filter('filter')($scope.tbl_ad_segc_job_vacancys, function(o) {
                    return o.Id_job_vacancy == itm.Id_job_vacancy;
                });
                if(itmaux.length > 0) { itmaux = itmaux[0]; } else { itmaux = {}; }
                itm.tbl_ad_segc_job_vacancy = itmaux.name;
                
                
                itmaux = $filter('filter')($scope.tbl_ad_locations, function(o) {
                    return o.Id_location == itm.Id_location;
                });
                if(itmaux.length > 0) { itmaux = itmaux[0]; } else { itmaux = {}; }
                itm.tbl_ad_location = itmaux.name;
                
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
                templateUrl: 'app/view/tbl_ad_segc_person_det.html?dt=' + (new Date()).getTime(),
                controller: 'tbl_ad_segc_person_detCtrl',
                size: size,
                windowClass: 'modal-default',
                resolve: {
                    record: function() {
                        return ((!record ? {} : record))                    },
                    tbl_ad_segc_relation_types: function() {
                        return ((!$scope.tbl_ad_segc_relation_types ? [] : $scope.tbl_ad_segc_relation_types))
                    },
                    tbl_ad_segc_job_vacancys: function() {
                        return ((!$scope.tbl_ad_segc_job_vacancys ? [] : $scope.tbl_ad_segc_job_vacancys))
                    },
                    tbl_ad_locations: function() {
                        return ((!$scope.tbl_ad_locations ? [] : $scope.tbl_ad_locations))
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

        $log.info('tbl_ad_segc_personCtrl');
    });

    app.controller('tbl_ad_segc_person_detCtrl', function(Upload, $timeout, $scope, $rootScope, $log, $window, $http, $filter, autenticationService,
        $uibModalInstance, record, tbl_ad_segc_relation_types, tbl_ad_segc_job_vacancys, tbl_ad_locations) {
        $scope.record = record;
        $scope.tbl_ad_segc_relation_types = tbl_ad_segc_relation_types;
        $scope.tbl_ad_segc_job_vacancys = tbl_ad_segc_job_vacancys;
        $scope.tbl_ad_locations = tbl_ad_locations;
        $scope.record.tbl_ad_segc_relation_typeCmb = {};
        $scope.record.tbl_ad_segc_job_vacancyCmb = {};
        $scope.record.tbl_ad_locationCmb = {};

        $scope.cargaCmb = function() {
            var itmaux;
            
            itmaux = $filter('filter')($scope.tbl_ad_segc_relation_types, function(o) {
                return o.Id_relation_type == $scope.record.Id_relation_type;
            });
            if(itmaux.length > 0) { itmaux = itmaux[0]; } else { itmaux = {}; }
            $scope.record.tbl_ad_segc_relation_typeCmb = itmaux;
            
            
            itmaux = $filter('filter')($scope.tbl_ad_segc_job_vacancys, function(o) {
                return o.Id_job_vacancy == $scope.record.Id_job_vacancy;
            });
            if(itmaux.length > 0) { itmaux = itmaux[0]; } else { itmaux = {}; }
            $scope.record.tbl_ad_segc_job_vacancyCmb = itmaux;
            
            
            itmaux = $filter('filter')($scope.tbl_ad_locations, function(o) {
                return o.Id_location == $scope.record.Id_location;
            });
            if(itmaux.length > 0) { itmaux = itmaux[0]; } else { itmaux = {}; }
            $scope.record.tbl_ad_locationCmb = itmaux;
            
        };

        $scope.save = function() {
            $scope.urls = [];
            $scope.urls.push({
                url: '/server/main/tbl_ad_segc_person',
                params: $scope.record,
                action: (!$scope.record.Id_person ? 'I' : 'U')
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

        $log.info('tbl_ad_segc_person_detCtrl');
    });
}());
