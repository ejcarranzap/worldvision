(function() {
    'use strict';
    var app = angular.module('itxwebApp')
    app.controller('tbl_ad_segc_newsCtrl', function($scope, $rootScope, $log, $window, $http, $filter, autenticationService, $uibModal) {
        $rootScope.Panel = 'Noticias/Notificaciones';
        $rootScope.PanelTitle = 'Title';
        $rootScope.PanelSubTitle = 'SubTitle';
        $rootScope.PanelSubSubTitle = 'Noticias/Notificaciones';
        $scope.record = {};
        $scope.data = {};
        $scope.pivot_data = {};

        $scope.getData = function() {
            $scope.urls = [];
            $scope.urls.push({
                url: '/server/main/tbl_ad_segc_news',
                params: {},
                action: 'S'
            });
            $scope.urls.push({
                url: '/server/main/tbl_ad_segc_news_type',
                params: {},
                action: 'S'
            });
            autenticationService.call($scope.urls).then(function(results) {
                setTimeout(function() {
                    $scope.data = results[0].data.data;
                    $scope.tbl_ad_segc_news_types = results[1].data.data;
                    $scope.prepareData();
                    $scope.loadData();
                    $scope.$apply();
                }, 0);
            });
        };

        $scope.prepareData = function() {
            angular.forEach($scope.data, function(itm) {
                var itmaux;

                itmaux = $filter('filter')($scope.tbl_ad_segc_news_types, function(o) {
                    return o.Id_news_type == itm.Id_news_type;
                });
                if(itmaux.length > 0) { itmaux = itmaux[0]; } else { itmaux = {}; }
                itm.tbl_ad_segc_news_type = itmaux.name;
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
                templateUrl: 'app/view/tbl_ad_segc_news_det.html?dt=' + (new Date()).getTime(),
                controller: 'tbl_ad_segc_news_detCtrl',
                size: size,
                windowClass: 'modal-default',
                resolve: {
                    record: function() {
                        return ((!record ? {} : record))                    
                    },
                    tbl_ad_segc_news_types: function() {
                        return ((!$scope.tbl_ad_segc_news_types ? [] : $scope.tbl_ad_segc_news_types))
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

        $log.info('tbl_ad_segc_newsCtrl');
    });

    app.controller('tbl_ad_segc_news_detCtrl', function(Upload, $timeout, $scope, $rootScope, $log, $window, $http, $filter, autenticationService,
        $uibModalInstance, record, tbl_ad_segc_news_types) {
        $scope.record = record;
        $scope.tbl_ad_segc_news_types = tbl_ad_segc_news_types;
        $scope.record.tbl_ad_segc_news_typeCmb = {};

        $scope.cargaCmb = function() {
            var itmaux;

            itmaux = $filter('filter')($scope.tbl_ad_segc_news_types, function(o) {
                return o.Id_news_type == $scope.record.Id_news_type;
            });
            if(itmaux.length > 0) { itmaux = itmaux[0]; } else { itmaux = {}; }
            $scope.record.tbl_ad_segc_news_typeCmb = itmaux;
        };

        $scope.save = function() {
            $scope.urls = [];
            $scope.urls.push({
                url: '/server/main/tbl_ad_segc_news',
                params: $scope.record,
                action: (!$scope.record.Id_news ? 'I' : 'U')
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

        $log.info('tbl_ad_segc_news_detCtrl');
    });
}());
