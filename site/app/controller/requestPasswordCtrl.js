(function() {
  'use strict'
  var app = angular.module('itxwebApp')
  app.controller('requestPasswordCtrl', function($scope, $rootScope, $log, $window, $http, 
  $filter, autenticationService, $uibModalInstance, record) {
    $rootScope.Panel = 'Cambio de Password';
    $rootScope.PanelTitle = 'Login';
    $rootScope.PanelSubTitle = 'Login';
    $rootScope.PanelSubSubTitle = 'Cambio de Password';
    $scope.record = record;
 
    $scope.save = function(){
		$scope.record.requestPassword = 1;
		autenticationService.autentication($scope.record).then(function (data) {
			$uibModalInstance.close($scope.record);	
		});
    };
    $scope.close = function(){
      $uibModalInstance.dismiss('cancel');
    };

    $log.info('requestPasswordCtrl');
  });
}());
