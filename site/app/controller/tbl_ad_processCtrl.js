(function() {
    'use strict'
    var app = angular.module('itxwebApp')
    app.controller('tbl_ad_processCtrl', function($scope, $rootScope, $log, $routeParams, $window, $http, $filter, autenticationService, $uibModal) {
      $scope._id = (!isNaN($routeParams.id) ? parseInt($routeParams.id) : 0);
      $scope.cred = autenticationService.getCredential();
      $scope.sortFields = [{name: 'Id_process'},{name: 'title'},{name: 'target'},{name: 'activity_pred'},
      {name: 'activity'},{name: 'usuario'},{name: 'elapsed_seconds'},{name: 'pending_seconds'}];
      console.log('$routeParams', $routeParams, $scope._id, $scope.cred);
      $rootScope.Panel = 'Proceso';
      $rootScope.PanelTitle = 'Administración';
      $rootScope.PanelSubTitle = 'Expediente';
      if($scope._id == 1){
        $rootScope.PanelSubSubTitle = 'Seguimiento';
      } else {
        $rootScope.PanelSubSubTitle = 'Proceso';
      } 

      $scope.record = {};
      $scope.data = {};
      $scope.pivot_data = {};
   
      $scope.getData = function(){
        $scope.urls = [];
        $scope.urls.push({url: '/server/main/tbl_ad_process', type: 'formdata', params: {}, action: 'S'});
        $scope.urls.push({url: '/server/main/tbl_ad_activity', params: {}, action: 'S'});
        $scope.urls.push({url: '/server/main/tbl_ad_user', params: {}, action: 'S'});
        $scope.urls.push({url: '/server/main/tbl_ad_location', params: {}, action: 'S'});
        autenticationService.call($scope.urls).then(function(results){
          setTimeout(function(){
            
            if($scope._id == 1){
              $scope.data = $filter('filter')(results[0].data.data,function(o){
                return(parseInt(o.Id_user) == parseInt($scope.cred.idusuario))
              });  
            }else{
              $scope.data = results[0].data.data;
            }
            $scope.data_activity = results[1].data.data;            
            $scope.data_user = results[2].data.data;
            $scope.data_location = results[3].data.data;
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
  
      $scope.getData();
  
  
      $scope.open = function (record, size, actn) {
              var modalInstance = $uibModal.open({
                  /*animation: $scope.animationsEnabled,*/
                  templateUrl: 'app/view/tbl_ad_process_det.html?dt=' + (new Date()).getTime(),
                  controller: 'tbl_ad_process_detCtrl',
                  size: size,
                  windowClass: 'modal-default',
                  resolve: {
                    record: function(){return((!record ? {} : record))},
                    data_activity: function(){return(!$scope.data_activity ? [] : $scope.data_activity)},
                    data_user: function(){return(!$scope.data_user ? [] : $scope.data_user)},
                    data_location: function(){return(!$scope.data_location ? [] : $scope.data_location)},
                    myid: $scope._id,
                    cred: $scope.cred
                  }
              });
              modalInstance.result.then(function (record) {
                $scope.getData();
              }, function () {
                $scope.getData();
          /*$log.info('Modal dismissed a')*/
          });
      };
  
      $log.info('tbl_ad_processCtrl');
    });
  
    app.controller('tbl_ad_process_detCtrl', function(Upload, $timeout, $scope, $rootScope, $log, $window, $http, $filter, autenticationService,
      $uibModalInstance, record, data_activity, data_user, data_location, myid, cred) {
      $scope._id = myid;
      $scope.cred = cred;
      $scope.record = record;
      $scope.data_activity = data_activity;
      $scope.disableFields = ($scope.record.Id_process != null); 


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

      $scope.data_activity_aux = $filter('filter')($scope.data_activity, function(o){
        /*return (o.Id_activity_parent == null);*/
        return $scope.getChilds(o);
      });

      
      $scope.data_activity_aux = $filter('filter')($scope.data_activity_aux, function(o){
        return !$scope.getChildsB(o)
    });

      $scope.data_activity_aux_child = [];
      $scope.data_user = data_user;
      $scope.data_location = data_location;

      $scope.data_files = ($scope.record.files || []);
      $scope.data_files_title = 'Soltar Archivos';
      $scope.data_files_on_change = function (evt) {
          console.log(evt);
      };

      $scope.options = {};        
      
      /*timeline*/
      $scope.timeline_title = 'Línea de Tiempo';
      $scope.timeline_data = $scope.record.steps;

      $scope.prepareTimeline = function(){
        angular.forEach($scope.timeline_data, function(o){
          o.comment_aux = 'ACT: ' + o.activity + ' USR: ' + o.user + ' => ' +o.comment
        });
      };

      $scope.prepareTimeline();
      /*end timeline*/
      
  
      $scope.cargaCmb = function(){
          var item;
          item = $filter('filter')($scope.data_activity_aux, function(o){
            return(parseInt(o.Id_activity) === parseInt($scope.record.Id_activity_current));
          });

          if(item.length > 0)
          $scope.record.cmbId_activity_current = item[0];
      };

      $scope.validateSaveEnc = function(){
        var msg = '';
        var ok = true;
        if(!$scope.record.title){
          msg = msg + '- Por favor ingrese titulo.' + '\r\n'
        }
        if(!$scope.record.cmbId_activity_current){
          msg = msg + '- Por favor seleccione tipo de proceso.' + '\r\n'
        }        
        if(!$scope.record.target){
          msg = msg + '- Por favor ingrese objetivo.' + '\r\n'
        }
        
        if(msg.length > 0){
          alert(msg);
          ok = false;
        }
        return ok        
      };

      $scope.validateSave = function(){
        var msg = '';
        var ok = true;
        if(!$scope.record.cmbId_activity){
          msg = msg + '- Por favor seleccione actividad.' + '\r\n'
        }
        if(!$scope.record.cmbId_user){
          msg = msg + '- Por favor seleccione usuario.' + '\r\n'
        }
        if(!$scope.record.cmbId_location){
          msg = msg + '- Por favor seleccione ubicación.' + '\r\n'
        }
        if(!$scope.record.comment){
          msg = msg + '- Por favor ingrese comentario.' + '\r\n'
        }
        if(msg.length > 0){
          alert(msg);
          ok = false;
        }
        return ok        
      };
  
      $scope.save = function(){
        if($scope._id == 1)
        if(!$scope.validateSave()){
          return;
        }

        if($scope._id != 1)
        if(!$scope.validateSaveEnc()){
          return;
        }

        $scope.record.files = $scope.data_files;
        $scope.record.sent_email = 0;
        $scope.urls = [];
        $scope.urls.push({url: '/server/main/tbl_ad_process', type: 'formdata', params: $scope.record, action: (!$scope.record.Id_process ? 'I' : 'U')});
        autenticationService.call($scope.urls).then(function(results){
          setTimeout(function(){
            if($rootScope.errormsg.length == 0){
              $uibModalInstance.close($scope.record);
              if($scope.record.Id_activity)
              $scope.sendEmail();
            }            
            $scope.$apply();
          },0);
        });
  
      };

      $scope.sendEmail = function(){
        var urls = [];
        var params = {};
        params.email = $scope.cred.email;
        params.subject = $scope.record.title;
        params.message = 'Prueba WV';
        params.body = '<h1>'+$scope.record.target+'</h1><p>'+$scope.record.cmbId_activity.name+' => '+$scope.record.comment+'</p>';
        
        urls.push({url: '/server/main/send_email', type: null, params: params, action: 'EMAIL'});
        autenticationService.call(urls).then(function(results){
          setTimeout(function(){
            if($rootScope.errormsg.length == 0){
              console.log('email: ', results);
            }            
            $scope.$apply();
          },0);
        });
      };

      $scope.close = function(){
        $uibModalInstance.dismiss('cancel');
      };
  
      $scope.cargaCmb();

      

      setTimeout(function(){
        $scope.$watch('record.Id_activity_current', function(){
          console.log('$scope.record.Id_activity_current', $scope.record.Id_activity_current);
          if($scope.record.Id_activity_current){            
            $scope.data_activity_aux_child = $filter('filter')($scope.data_activity, function(o){
              return (o.Id_activity_parent == $scope.record.Id_activity_current && $scope.getChilds(o) == false || o.Id_activity == 1);              
            });            
          }          
        });                                        
        
        $scope.options.load();
      });        
      $log.info('tbl_ad_process_detCtrl');
    });
  }());
  