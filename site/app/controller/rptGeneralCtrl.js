(function () {
	'use strict';
	var app = angular.module('itxwebApp');
	app.controller('rptGeneralCtrl', function ($scope, $log, $filter, $uibModal, autenticationService) {
		$scope.data = [];
		$scope.record = {};
		$scope.factura = {};
		$scope.recibo = {};
		$scope.venta = {};
		$scope.abono = {};
		$scope.cajachica = {};
		$scope.kardex  = {};
		$scope.cuentacorriente  = {}
		$scope.clientemoroso  = {};		

		$scope.getData = function () {
			$scope.urls = [];
			$scope.urls.push({
			  url: '/server/main/caja_chica',
			  params: {},
			  action: 'S'
			});
			autenticationService.call($scope.urls).then(function(results) {
				setTimeout(function() {
				  $scope.data = results[0].data.data;				  
				  $scope.prepareData();
				  //$scope.loadData();
				  $scope.$apply();
				}, 0);
			});
		};

		$scope.prepareData = function () {
			angular.forEach($scope.data, function (itm) {
				var sitem;
				/*sitem = $filter('filter')($scope.cuentas, function (itm2) {
					return (itm2.Cuenta == itm.cuenta);
				});

				if (sitem) {
					if (sitem.length > 0)
						itm.CuentaNombre = sitem[0].NombreFactura;
				}*/
			});
		};

		$scope.loadData = function (q) {
			if (q) {
				$scope.pivot_data = $filter('filter')($scope.data, q);
			} else {
				$scope.pivot_data = $scope.data;
			}
		};

		$scope.getData();

		$scope.q = null;
		$scope.$watch('q', function () {
			//$scope.loadData($scope.q);
		});

		/*detalle*/
		$scope.open = function (record, size, actn, rpt) {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'app/view/rptGeneraldet.html?' + (new Date()).getTime(),
				controller: 'rptGeneraldetCtrl',
				size: size,
                windowClass: 'modal-default',                
				resolve: {
					record: function () {
						return (record);
					},
					url: function(){
						return(actn)
					},
					rpt: function(){
						return(rpt)
					}
				}
			});

			modalInstance.result.then(function (record) {
				/*$scope.selectedrecord = record;*/
			}, function () {
				/*$log.info('Modal dismissed at: ' + new Date());*/
			});
		};
		/*end detalle*/

		$log.info('rptGeneralCtrl');
	});

	app.controller('rptGeneraldetCtrl', function ($scope, $log, $filter, $window, fileServicePHP, $uibModalInstance,
		record, url, rpt) {
		$scope.record = record;		
		$scope.url = url;
		$scope.rpt = rpt;		
		$scope.record.action = $scope.rpt;

		$scope.loadReport = function () {
			fileServicePHP.call([{
				type: 'application/pdf',
				/*type: 'text/plain',*/
				url: $scope.url,
				param: {
					action: $scope.rpt,
					data: $scope.record
				},
				config: {
					responseType: 'arraybuffer'
				}
            }]).then(function (results) {
				var frame = document.getElementsByTagName('iframe')[0];
				frame.src = results;
			});
		};
		
		$scope.loadReport();

		$scope.getDataDetalle = function () {
			var urls = [];
			/*urls.push({
				url: 'server/main/itxweb_tool',
				param: {
					action: 'getcargo',
					data: {
						catalog: 'CARGO',
						codigo: $scope.record.cuenta,
						Id_enca: $scope.record.Id_enca
					}
				}
			});

			boService.call(urls).then(function (results) {
				$scope.cargos = results[0].data.data;
				$scope.record.extradata = $scope.cargos;
				$scope.loadReport();
			});*/
		};

		$scope.clear = function () {
			$scope.record = {};
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.getDataDetalle();

		$log.info('rptGeneraldetCtrl');
	});
}());
