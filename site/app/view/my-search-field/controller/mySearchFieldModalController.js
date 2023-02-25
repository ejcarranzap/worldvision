(function () {
    'use strict';
    var app = angular.module('itxwebApp');

    app.controller('mySearchFieldModalController', function ($scope, $rootScope, $log, $timeout, $filter, Upload, $uibModalInstance, data, fields) {
        /*console.log(data);
        console.log(fields);*/

        $scope.fields = fields;

        $scope.data = {};
        $scope.data.itemsPerPage = 5;
        $scope.data.total_count = data.length;

        $scope.data.getData = function (newPageNumber, filter) {
            /*console.log(filter);*/
            $scope.data.data = angular.copy(data, $scope.data.data);

            if(filter)
            $scope.data.data = $filter('filter')($scope.data.data, filter);

            var noPages = 0, sItem = 0, tItem = 0;
            if ($scope.data.data.length >= 0) {
                noPages = ($scope.data.data.length / $scope.data.itemsPerPage);
                sItem = (newPageNumber * $scope.data.itemsPerPage) - $scope.data.itemsPerPage;
                tItem = (newPageNumber * $scope.data.itemsPerPage);

                $scope.data.total_count = $scope.data.data.length;
                $scope.data.data = $scope.data.data.slice(sItem, tItem);
            } else {
                $scope.data.data = [];
                $scope.data.total_count = 0;
            }
        };

        $scope.q = null;
        $scope.$watch('q',function(){
            $scope.data.getData(1,$scope.q);
        });

        $scope.setSelection = function (item) {
            $uibModalInstance.close(item);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.data.getData(1, null);
        $log.info('mySearchFieldModalController');
    });
}());
