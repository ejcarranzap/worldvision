(function () {
    'use strict';
    var app = angular.module('itxwebApp');
    app.controller('rpt_proceso_aprobado_vs_realCtrl', function ($scope, $filter, $routeParams, $uibModal, autenticationService) {
        $scope._id = (!isNaN($routeParams.id) ? parseInt($routeParams.id) : 0);
        $scope.cred = autenticationService.getCredential();

        $scope.getData = function () {
            $scope.urls = [];
            $scope.urls.push({ url: '/server/main/tbl_ad_process', type: 'formdata', params: {}, action: 'S' });
            $scope.urls.push({ url: '/server/main/tbl_ad_activity', params: {}, action: 'S' });
            $scope.urls.push({ url: '/server/main/tbl_ad_user', params: {}, action: 'S' });
            $scope.urls.push({ url: '/server/main/tbl_ad_location', params: {}, action: 'S' });
            autenticationService.call($scope.urls).then(function (results) {
                setTimeout(function () {
                    $scope.data = results[0].data.data;
                    $scope.data_activity = results[1].data.data;
                    $scope.data_user = results[2].data.data;
                    $scope.data_location = results[3].data.data;
                    $scope.prepareData();
                    $scope.loadData();
                    $scope.$apply();
                }, 0);
            });
        };

        $scope.prepareData = function () {
            angular.forEach($scope.data, function (itm) {
                var act = $filter('filter')($scope.data_activity, function(o){ return (o.Id_activity === itm.Id_activity_current) });
                if(act.length > 0) act = act[0];
                itm.activity = act.name;
            });
        };

        $scope.loadData = function (q) {
            if (q) {
                $scope.pivot_data = $filter('filter')($scope.data, q);
            } else {
                $scope.pivot_data = $scope.data;
            }
        };

        $scope.open = function (record, size, actn) {
            var modalInstance = $uibModal.open({
                /*animation: $scope.animationsEnabled,*/
                templateUrl: 'app/view/rpt_proceso_aprobado_vs_realDet.html?dt=' + (new Date()).getTime(),
                controller: 'rpt_proceso_aprobado_vs_realDetCtrl',
                size: size,
                windowClass: 'modal-default',
                resolve: {
                    record: function () { return ((!record ? {} : record)) },
                    data_activity: function () { return (!$scope.data_activity ? [] : $scope.data_activity) },
                    data_user: function () { return (!$scope.data_user ? [] : $scope.data_user) },
                    data_location: function () { return (!$scope.data_location ? [] : $scope.data_location) },
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

        $scope.getData();
        console.log('rpt_proceso_aprobado_vs_realCtrl');
    });

    app.controller('rpt_proceso_aprobado_vs_realDetCtrl', function ($scope, $filter, autenticationService, $uibModalInstance, record, data_activity, data_user, data_location, myid, cred) {
        $scope._id = myid;
        $scope.cred = cred;
        $scope.record = record;
        $scope.data_activity = data_activity;
        $scope.data_activity_act = $filter('filter')(data_activity, function(o){
            return o.Id_activity_parent == $scope.record.Id_activity_current;
        });
        $scope.data_user = data_user;
        $scope.data_location = data_location;

        $scope.data_activity_ = [];
        $scope.tree_options = {};
        $scope.tree_options2 = {};
        $scope.parents = [];
        $scope.colspan_aux = 0;
        
        $scope.getTreeH = function (Id_parent, level) {
            var arr = $filter('filter')($scope.data_activity, function (o) {
                return (o.Id_activity_parent == Id_parent);
            });
            /*console.log(arr);*/
            angular.forEach(arr, function (o) {
                /*console.log(o);*/
                if(!Id_parent) o.level = 1; else o.level = (level+1);
                o.childs = $scope.getTreeH(o.Id_activity, o.level);
            });
            return arr;
        };

        $scope.prepareTitleTree = function(aux, tree){
            if(!aux) aux = [];
            angular.forEach(tree, function(o){
                console.log('o: ', o);
                aux.push(o);
                if(o.childs) $scope.prepareTitleTree(aux, o.childs);
            });
            return aux;
        };

        setTimeout(function(){
            $scope.tree = $scope.getTreeH();
            console.log('tree: ', $scope.tree);
            $scope.tree_options2.render();            
            var aux_tree = $scope.tree_options2.getAllNodeParentById($scope.record.Id_activity_current);
            $scope.title_tree = $scope.prepareTitleTree(null, aux_tree);           
            $scope.$apply();
        },0);        

        $scope.getTree = function (Id_parent, level) {
            var arr = $filter('filter')($scope.data_activity_, function (o) {
                return (o.Id_step_prev == Id_parent);
            });
            /*console.log(arr);*/
            angular.forEach(arr, function (o) {
                /*console.log(o);*/
                if(!Id_parent) o.level = 1; else o.level = (level+1);
                o.childs = $scope.getTree(o.ID, o.level);
            });
            return arr;
        };

        $scope.getData = function () {
            $scope.urls = [];
            $scope.urls.push({ url: '/server/main/tbl_ad_process', type: 'formdata', params: $scope.record, action: 'SD' });
            
            autenticationService.call($scope.urls).then(function (results) {
                setTimeout(function () {
                    $scope.data_activity_ = results[0].data.data;
                    $scope.tree_ = $scope.getTree();
                    if($scope.data_activity_.length > 0){
                        setTimeout(function(){     
                            $scope.tree_options.render();                   
                            var aux_tree_activity = $scope.tree_options.getTreeJson();
                            $scope.title_tree_activity = $scope.prepareTitleTree(null, aux_tree_activity); 
                            $scope.colspan_aux = ($scope.title_tree_activity.length - $scope.data_activity_act.length);                           
                        });
                    }                                        
                    $scope.$apply();
                }, 0);
            });
        };

        $scope.close = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.getData();

        console.log('rpt_proceso_aprobado_vs_realDetCtrl');
    });
}());