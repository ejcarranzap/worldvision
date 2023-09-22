(function() {
  'use strict';
  var app = angular.module('itxwebApp');
  app.controller('dangermodalCtrl', function($scope, $rootScope, $log, $window, $http, $uibModalInstance) {
      $scope.save = function(){
        $uibModalInstance.close($scope.record);
      };
      $scope.close = function(){
        $uibModalInstance.dismiss('cancel');
      };
  });
}());
