(function() {
  'use strict';
  var app = angular.module('itxwebApp');
  app.controller('loginCtrl', function($scope, $rootScope, $log, $window, $http) {
    $scope.record = {username: '', password: ''};
	
	$scope.loginIfEnterKey = function($event){
		var keyCode = $event.which || $event.keyCode;
		if (keyCode === 13) {
			$rootScope.login($scope.record);
		}

	};
	
    $log.info('loginCtrl');
  });
}());
