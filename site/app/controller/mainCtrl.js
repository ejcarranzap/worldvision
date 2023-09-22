(function () {
    'use strict';
    var app = angular.module('itxwebApp');
    app.controller('mainCtrl', function ($scope, $rootScope, $location,$log, $window, $http, $uibModal, $timeout, autenticationService) {

		$rootScope.menuGlobal = [];
		$scope.getMenuGlobal = function(){
			$rootScope.menuGlobal = [];
			$log.info('menudo');
			/*if($rootScope.userData.tipousuario == 'ADMIN'){
				$rootScope.menuGlobal.push('admin_empresa');
				$rootScope.menuGlobal.push('admin_opcion');
				$rootScope.menuGlobal.push('admin_parametro');
				$rootScope.menuGlobal.push('caja_chica');
				$rootScope.menuGlobal.push('caja_chica_egreso');
				$rootScope.menuGlobal.push('caja_chica_ingreso');
				$rootScope.menuGlobal.push('cargo');
				$rootScope.menuGlobal.push('cat_banco');
				$rootScope.menuGlobal.push('cat_banco_cuenta');
				$rootScope.menuGlobal.push('cat_cliente');
				$rootScope.menuGlobal.push('cat_color');
				$rootScope.menuGlobal.push('cat_linea_vehiculo');
				$rootScope.menuGlobal.push('cat_marca_vehiculo');
				$rootScope.menuGlobal.push('cat_modelo');
				$rootScope.menuGlobal.push('cat_proveedor');
				$rootScope.menuGlobal.push('cat_tipo_combustible');
				$rootScope.menuGlobal.push('cat_tipo_descuento');
				$rootScope.menuGlobal.push('cat_tipo_documento');
				$rootScope.menuGlobal.push('cat_tipo_gasto');
				$rootScope.menuGlobal.push('cat_tipo_ingreso');
				$rootScope.menuGlobal.push('cat_tipo_pago');
				$rootScope.menuGlobal.push('cat_tipo_salida_vehiculo');
				$rootScope.menuGlobal.push('cat_tipo_transmision');
				$rootScope.menuGlobal.push('cat_tipo_uso_vehiculo');
				$rootScope.menuGlobal.push('cat_tipo_vehiculo');
				$rootScope.menuGlobal.push('cat_tipo_venta');
				$rootScope.menuGlobal.push('cat_vehiculo');
				$rootScope.menuGlobal.push('cat_vehiculo_descuento');
				$rootScope.menuGlobal.push('cat_vehiculo_gasto');
				$rootScope.menuGlobal.push('entrada_vehiculo');
				$rootScope.menuGlobal.push('gasto');
				$rootScope.menuGlobal.push('salida_vehiculo');
				$rootScope.menuGlobal.push('seg_tipo_usuario');
				$rootScope.menuGlobal.push('seg_usuario');
				$rootScope.menuGlobal.push('seg_usuario_opcion');
				$rootScope.menuGlobal.push('venta');
				$rootScope.menuGlobal.push('venta_abono');
				$rootScope.menuGlobal.push('venta_detalle');
				$rootScope.menuGlobal.push('rptGeneral');
			}
			if($rootScope.userData.tipousuario == 'SUPERVISOR'){
				$rootScope.menuGlobal.push('cat_cliente');
				$rootScope.menuGlobal.push('rptGeneral');
				$rootScope.menuGlobal.push('cat_vehiculo_descuento');
			}
			if($rootScope.userData.tipousuario == 'OPERADOR'){
				$rootScope.menuGlobal.push('cat_cliente');
				$rootScope.menuGlobal.push('rptGeneral');
			}*/
			$scope.getData();
		};
		
		$timeout(function(){
			$scope.$watch('userData.tipousuario', function(){
				$log.info('userData.tipousuario');
				$log.info($rootScope.userData);
				if($rootScope.userData)
				$scope.getMenuGlobal();
			});
		},0);
	
        $scope.getUserCredential = function () {
            $rootScope.userData = autenticationService.getCredential();
            /*console.log('userData:');
            console.log($rootScope.userData);*/
        };

        $scope.getData = function(){
		  $scope.urls = [];
		  $scope.urls.push({url: '/server/main/tbl_ad_user_menu', params: {Id_user: $rootScope.userData.idusuario}, action: 'SX'});
		  autenticationService.call($scope.urls).then(function(results){
			setTimeout(function(){
			  $scope.data = results[0].data.data;
			  $log.info($scope.data);
			  angular.forEach($scope.data, function(itm){
				  if(itm.active == 1)
				  $rootScope.menuGlobal.push(itm.menu);
			  });
			  $log.info($rootScope.menuGlobal);
			  $scope.$apply();
			  /*$location.path('/start');*/
			},0);
		  });
		};

        $scope.open = function (record, size, actn) {
            var modalInstance = $uibModal.open({
                /*animation: $scope.animationsEnabled,*/
                templateUrl: 'app/view/danger-modal.html?dt=' + (new Date()).getTime(),
                controller: 'dangermodalCtrl',
                size: size,
                windowClass: 'modal-danger',
                resolve: {

                }
            });

            modalInstance.result.then(function (record) {

            }, function () {
                /*$log.info('Modal dismissed at: ' + new Date());*/
            });
        };

        $scope.init = function () {
            $rootScope.pushMenu = $('[data-toggle="push-menu"]').data('lte.pushmenu');
            $rootScope.controlSidebar = $('[data-toggle="control-sidebar"]').data('lte.controlsidebar');

            $rootScope.layout = $('body').data('lte.layout');
            $rootScope.wrapper = $('.wrapper');
            $rootScope.pushMenu.close();
            if ($rootScope.isAutenticated == false) {
                $rootScope.pushMenu.close();
            } else {
                $rootScope.pushMenu.open();
            }
        };

        $scope.$on('$viewContentLoaded', function () {
            $('.my-cloak').removeClass('my-cloak');
            $scope.init();
            $scope.getUserCredential();
            $log.info('mainCtrl');
        });

    });
}());
