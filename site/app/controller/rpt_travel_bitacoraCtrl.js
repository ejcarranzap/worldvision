(function() {
    'use strict'
    var app = angular.module('itxwebApp')
    app.controller('rpt_travel_bitacoraCtrl', function($scope, $rootScope, $log, $window, $http, $filter, autenticationService, $uibModal) {
      $rootScope.Panel = 'Travel';
      $rootScope.PanelTitle = 'Bitacora';
      $rootScope.PanelSubTitle = 'Bitacora';
      $rootScope.PanelSubSubTitle = 'Travel';
      $scope.record = {};
      $scope.data = {};
      $scope.pivot_data = {};
   
      $scope.getData = function(){
        $scope.urls = [];
        $scope.urls.push({url: '/server/main/tbl_ad_make', params: {}, action: 'S'});
        autenticationService.call($scope.urls).then(function(results){
          setTimeout(function(){
            $scope.data = results[0].data.data;
            $scope.prepareData();
            $scope.loadData();
            $scope.$apply();
          },0);
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
        $scope.loadData($scope.record.q);
      });
  
      /*$scope.getData();*/
  
  
      $scope.open = function (record, size, actn) {
              var modalInstance = $uibModal.open({
                  /*animation: $scope.animationsEnabled,*/
                  templateUrl: 'app/view/rpt_travel_bitacora_det.html?dt=' + (new Date()).getTime(),
                  controller: 'rpt_travel_bitacora_detCtrl',
                  size: size,
                  windowClass: 'modal-default',
                  resolve: {
                    record: function(){return((!record ? {} : record))}
                  }
              });
              modalInstance.result.then(function (record) {
                $scope.getData();
              }, function () {
                $scope.getData();
          /*$log.info('Modal dismissed a')*/
          });
      };
  
      $log.info('rpt_travel_bitacoraCtrl');
    });
  
    app.controller('rpt_travel_bitacora_detCtrl', function(Upload, $timeout, $scope, $rootScope, $log, $window, $http, $filter, autenticationService,
      $uibModalInstance, record) {
      $scope.record = record;
  
      $scope.cargaCmb = function(){
          var item;
      };

      $scope.rptUrl = '';
      $scope.generateRpt = function(){
        $rootScope.loading = true;
        var frame = document.getElementsByTagName('iframe')[0];
        
        frame.onload = function () {                              
          setTimeout(function () {
            $rootScope.loading = false;
            $scope.$apply();
          });
        };

        if($scope.record.exportType != 'pdf'){
          setTimeout(function () {
            $rootScope.loading = false;
            $scope.$apply();
          }, 2000);
        }

        var params = {
          title: ''
        };

        params = {...$scope.record};

        const url = '/server/main/rpt_call?rpt=rpt_wv_bitacora&exportType='+$scope.record.exportType+'&p=' + encodeURIComponent(JSON.stringify(params));
        console.log(url);
        frame.src = url;        
        //          '/server/main/rpt_call?rpt=rptTest&p=%7B%22title%22:%22Hola%20Postman%22%7D'
        /*$http.get('/server/main/rpt_call?rpt=rptTest&p=%7B%0A%20%20%20title%3A%20\'Hola%20Postman\'%0A%7D').success(function(data){
          frame.src = data;
          $rootScope.loading = false;
        });*/        
      };

      $scope.getDataInit = function () {
        $scope.urls = [];
        $scope.urls.push({ url: '/server/main/tbl_ad_user', params: {}, action: 'S' });
        autenticationService.call($scope.urls).then(function (results) {
            setTimeout(function () {
                $scope.data_user = results[0].data.data;
                $scope.cargaCmb();
                $scope.$apply();
            }, 0);
        });
    };
  
      $scope.save = function(){
        $scope.urls = [];
        $scope.urls.push({url: '/server/main/tbl_ad_make', params: $scope.record, action: (!$scope.record.Id_make ? 'I' : 'U')});
        autenticationService.call($scope.urls).then(function(results){
          setTimeout(function(){
            if($rootScope.errormsg.length == 0)
            $uibModalInstance.close($scope.record);
            $scope.$apply();
          },0);
        });
  
      };
      $scope.close = function(){
        $uibModalInstance.dismiss('cancel');
      };
  
      setTimeout(function(){
        $scope.getDataInit();
      });            

      /*setTimeout(() => {
        $scope.generateRpt();
      }, 0);*/

      $log.info('rpt_travel_bitacora_detCtrl');
    });
  }());
  