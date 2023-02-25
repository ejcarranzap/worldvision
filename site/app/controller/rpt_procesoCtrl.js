(function () {
    'use strict';
    var app = angular.module('itxwebApp');
    app.controller('rpt_procesoCtrl', function ($scope, $filter, $routeParams, $uibModal, autenticationService) {
        $scope._id = (!isNaN($routeParams.id) ? parseInt($routeParams.id) : 0);
        $scope.cred = autenticationService.getCredential();
        $scope.record = {};
        $scope.pivot_data = [];
        $scope.data = [];
        $scope.data_activity_aux = [];

        $scope.getChilds = function(o){
            var ok = false;
            angular.forEach($scope.data_activity, function(ou){
              if(ou.Id_activity_parent === o.Id_activity){
                ok = true;
              }
            });
            return ok;
          };

          $scope.getChildsB = function(o){
            var ok = false;
            angular.forEach($scope.data_activity_aux, function(ou){
              if(ou.Id_activity_parent === o.Id_activity){
                ok = true;
              }
            });
            return ok;
          };
          

        $scope.getDataInit = function () {
            $scope.urls = [];
            $scope.urls.push({ url: '/server/main/tbl_ad_activity', params: {}, action: 'S' });
            $scope.urls.push({ url: '/server/main/tbl_ad_user', params: {}, action: 'S' });
            $scope.urls.push({ url: '/server/main/tbl_ad_location', params: {}, action: 'S' });
            autenticationService.call($scope.urls).then(function (results) {
                setTimeout(function () {
                    $scope.data_activity = results[0].data.data;
                    $scope.data_user = results[1].data.data;
                    $scope.data_location = results[2].data.data;   
                    
                    $scope.data_activity_aux = $filter('filter')($scope.data_activity, function(o){
                        /*return (o.Id_activity_parent == null);*/
                        return $scope.getChilds(o);
                    });

                    $scope.data_activity_aux = $filter('filter')($scope.data_activity_aux, function(o){
                        return !$scope.getChildsB(o)
                    });

                    $scope.$apply();
                }, 0);
            });
        };

        $scope.getData = function () {
            $scope.urls = [];
            $scope.urls.push({ url: '/server/main/tbl_ad_process', type: 'formdata', params: $scope.record, action: 'SD_PROCESS' });            
            autenticationService.call($scope.urls).then(function (results) {
                setTimeout(function () {
                    $scope.data = results[0].data.data;                    
                    $scope.prepareData();
                    $scope.loadData();
                    $scope.graphTimeRender();
                    $scope.$apply();
                }, 0);
            });
        };

        $scope.prepareData = function () {
            angular.forEach($scope.data, function (itm) {
                /*var act = $filter('filter')($scope.data_activity, function(o){ return (o.Id_activity === itm.Id_activity_current) });
                if(act.length > 0) act = act[0];
                itm.activity = act.name;*/
            });
        };

        $scope.loadData = function (q) {
            if (q) {
                $scope.pivot_data = $filter('filter')($scope.data, q);
            } else {
                $scope.pivot_data = $scope.data;
            }
        };

        $scope.graphTimeData = [];
        $scope.graphTimeRender = function(){
            $scope.graphTimeData = [];
            $scope.graphTimeData.push({label: 'En Tiempo', data: $scope.getTotalTiempo(1)});
            $scope.graphTimeData.push({label: 'Fuera Tiempo', data: $scope.getTotalTiempo(0)});

            $.plot('#graphTime', $scope.graphTimeData, {
                series: {
                    pie: {
                        show: true,
                        label: {
                            show:true,
                            radius: 0.8,
                            formatter: function (label, series) {                
                                return '<div style="border:1px solid grey;font-size:8pt;text-align:center;padding:5px;color:white;">' +
                                label + ' : ' +
                                Math.round(series.percent) +
                                '%</div>';
                            },
                            background: {
                                opacity: 0.8,
                                color: '#000'
                            }
                        }
                    }
                }
            });
        };

        $scope.getTotalTiempo = function(typo, percent){
            var total = 0;            
            angular.forEach($scope.pivot_data, function(o){
                if(typo == 1){
                    if(o.elapsed_seconds <= o.estimated_seconds){
                        total = total + 1;
                    }                    
                }else{
                    if(o.elapsed_seconds > o.estimated_seconds){
                        total = total + 1;
                    }
                }
            });
            if(percent == true){
                return ($scope.pivot_data.length > 0 ? parseFloat((total/$scope.pivot_data.length)*100).toFixed(2) : 0);
            }else{
                return total;
            }            
        };

        $scope.getDataInit();

        $scope.$watch('record.q', function () {
            $scope.loadData($scope.record.q);
        });

        console.log('rpt_procesoCtrl');
    });
}());