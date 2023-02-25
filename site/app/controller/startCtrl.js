(function() {
  'use strict';
  var app = angular.module('itxwebApp');
  app.controller('startCtrl', function($scope, $rootScope, $log, $window, $http) {
    $rootScope.Panel = 'Inicio';
    $rootScope.PanelTitle = 'Inicio';
    $rootScope.PanelSubTitle = '';
    $rootScope.PanelSubSubTitle = '';

    $log.info('startCtrl');
  });
}());
