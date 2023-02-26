(function () {
    'use strict'
    var app = angular.module('itxwebApp');
    app.controller('segc_mapCtrl', function ($scope, $rootScope, $log, $window, $http, $filter, autenticationService, $uibModal, uiGmapIsReady) {
        $rootScope.Panel = 'Mapa Geoposicion';
        $rootScope.PanelTitle = 'Seguridad';
        $rootScope.PanelSubTitle = 'Seguridad';
        $rootScope.PanelSubSubTitle = 'Mapa Geoposicion';
        $scope.record = {};
        $scope.data_user = [];
        $scope.data = [];
        $scope.markers = [];
        $scope.timer = null;

        $scope.map = {
            center: {
                latitude: 14.619915,
                longitude: -90.522453
            },
            zoom: 12
        };
        $scope.options = {
            scrollwheel: true
        };

        $scope.getDataInit = function () {
            var urls = [];
            urls.push({ url: '/server/main/tbl_ad_user', params: {}, action: 'S' });
            autenticationService.call(urls).then(function (results) {
                setTimeout(function () {
                    $scope.data_user = results[0].data.data;
                    $scope.$apply();
                }, 0);
            });
        };

        $scope.search = function () {
            var urls = [];
            var params = $scope.record;
            var action = ($scope.record.active == 1 ? 'GEOLOCATIONLAST' : 'GEOLOCATION');

            urls.push({ url: '/server/main/segc_map', params: params, action: action });
            autenticationService.call(urls).then(function (results) {
                setTimeout(function () {
                    $scope.data = results[0].data.data;
                    $scope.setMarkers();
                    $scope.$apply();
                }, 0);
            });
        };

        $scope.rmMarkers = function () {
            angular.forEach($scope.markers, m => {
                m.setMap(null);
            });
        }
        $scope.setMarkers = function () {
            $scope.rmMarkers();
            $scope.markers = [];
            var i = 1;
            angular.forEach($scope.data, r => {
                var latLng = new google.maps.LatLng(r.latitude, r.longitude);

                var image = {
                    url:
                        "http://chart.apis.google.com/chart?chst=d_map_spin&chld=0.75|0|FF0000|8|b|" +
                        i,
                };

                var marker = new google.maps.Marker({
                    position: latLng,
                    title: "WV",
                    /*animation: google.maps.Animation.DROP,*/
                    visible: true,
                    draggable: true,
                    icon: image,
                    tag: 0,
                });
                marker.setMap($scope.mymap);
                $scope.markers.push(marker);
                i++;
            });
        }

        uiGmapIsReady.promise(1).then(function (maps) {
            $scope.mymap = maps[0].map;
            console.log($scope.mymap.uiGmap_id);
        });

        setTimeout(function () {
            $scope.getDataInit();

            $scope.$watch('record.active', function(){
                if($scope.record.active == 1){
                    $scope.search();
                    $scope.timer = setInterval(function() {
                        $scope.search();
                      }, 5000);
                }else{
                    if($scope.timer) clearInterval($scope.timer);
                }
            });
        });

        $log.info('segc_mapCtrl');
    });
}());