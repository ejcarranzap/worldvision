(function () {
	'use strict';
	var app = angular.module('itxwebApp', [
		'ui.bootstrap',
		'ui.bootstrap.datetimepicker',
		'ui.mask',
		'ngRoute',
		'ngCookies',
		'ngAnimate',
		'ngFileUpload',
		'angularUtils.directives.dirPagination',
		'base64',
		'uiGmapgoogle-maps',
		'rt.select2',
		'multi-select-tree'
	]);

	app.config(function ($routeProvider, $httpProvider, uiGmapGoogleMapApiProvider) {
		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];

		$routeProvider
			.when('/login', {
				templateUrl: 'app/view/login.html',
				controller: 'loginCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/home', {
				templateUrl: 'app/view/home.html',
				controller: 'homeCtrl',
				data: {
					requireLogin: true
				}
			}).when('/start', {
				templateUrl: 'app/view/start.html',
				controller: 'startCtrl',
				data: {
					requireLogin: true
				}
			})
			/*SOLICITUD DE VIAJE*/			
			.when('/rpt_travel_bitacora', {
				templateUrl: 'app/view/rpt_travel_bitacora.html',
				controller: 'rpt_travel_bitacoraCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_travel', {
				templateUrl: 'app/view/tbl_ad_travel.html',
				controller: 'tbl_ad_travelCtrl',
				data: {
					requireLogin: true
				}
			})
			/*END SOLICITUD DE VIAJE*/
			/*SEGURIDAD CORPORATIVA */
			.when('/tbl_ad_segc_geo_alert_type', {
				templateUrl: 'app/view/tbl_ad_segc_geo_alert_type.html',
				controller: 'tbl_ad_segc_geo_alert_typeCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_segc_geo_location', {
				templateUrl: 'app/view/tbl_ad_segc_geo_location.html',
				controller: 'tbl_ad_segc_geo_locationCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_segc_geo_location_alert', {
				templateUrl: 'app/view/tbl_ad_segc_geo_location_alert.html',
				controller: 'tbl_ad_segc_geo_location_alertCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_segc_incident_app', {
				templateUrl: 'app/view/tbl_ad_segc_incident_app.html',
				controller: 'tbl_ad_segc_incident_appCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_segc_news', {
				templateUrl: 'app/view/tbl_ad_segc_news.html',
				controller: 'tbl_ad_segc_newsCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_segc_news_type', {
				templateUrl: 'app/view/tbl_ad_segc_news_type.html',
				controller: 'tbl_ad_segc_news_typeCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/segc_map', {
				templateUrl: 'app/view/segc_map.html',
				controller: 'segc_mapCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/rptAnalisisRiesgo', {
				templateUrl: 'app/view/rptAnalisisRiesgo.html',
				controller: 'rptAnalisisRiesgoCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_segc_asset_state', {
				templateUrl: 'app/view/tbl_ad_segc_asset_state.html',
				controller: 'tbl_ad_segc_asset_stateCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_segc_asset_type', {
				templateUrl: 'app/view/tbl_ad_segc_asset_type.html',
				controller: 'tbl_ad_segc_asset_typeCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_segc_incident', {
				templateUrl: 'app/view/tbl_ad_segc_incident.html',
				controller: 'tbl_ad_segc_incidentCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_segc_incident_asset', {
				templateUrl: 'app/view/tbl_ad_segc_incident_asset.html',
				controller: 'tbl_ad_segc_incident_assetCtrl',
				data: {
					requireLogin: true
				}
			})
			/*.when('/tbl_ad_segc_incident_children', {
				templateUrl: 'app/view/tbl_ad_segc_incident_children.html',
				controller: 'tbl_ad_segc_incident_childrenCtrl',
				data: {
					requireLogin: true
				}
			})*/
			.when('/tbl_ad_segc_incident_class', {
				templateUrl: 'app/view/tbl_ad_segc_incident_class.html',
				controller: 'tbl_ad_segc_incident_classCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_segc_incident_group', {
				templateUrl: 'app/view/tbl_ad_segc_incident_group.html',
				controller: 'tbl_ad_segc_incident_groupCtrl',
				data: {
					requireLogin: true
				}
			})
			/*.when('/tbl_ad_segc_incident_person', {
				templateUrl: 'app/view/tbl_ad_segc_incident_person.html',
				controller: 'tbl_ad_segc_incident_personCtrl',
				data: {
					requireLogin: true
				}
			})*/
			.when('/tbl_ad_segc_incident_type', {
				templateUrl: 'app/view/tbl_ad_segc_incident_type.html',
				controller: 'tbl_ad_segc_incident_typeCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_segc_job_vacancy', {
				templateUrl: 'app/view/tbl_ad_segc_job_vacancy.html',
				controller: 'tbl_ad_segc_job_vacancyCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_segc_person', {
				templateUrl: 'app/view/tbl_ad_segc_person.html',
				controller: 'tbl_ad_segc_personCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_segc_relation_type', {
				templateUrl: 'app/view/tbl_ad_segc_relation_type.html',
				controller: 'tbl_ad_segc_relation_typeCtrl',
				data: {
					requireLogin: true
				}
			})
			/*END SERGURIDAD CORPORATIVA */
			.when('/tbl_ad_activity', {
				templateUrl: 'app/view/tbl_ad_activity.html',
				controller: 'tbl_ad_activityCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_process_type', {
				templateUrl: 'app/view/tbl_ad_process_type.html',
				controller: 'tbl_ad_process_typeCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_process', {
				templateUrl: 'app/view/tbl_ad_process.html',
				controller: 'tbl_ad_processCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_process/:id', {
				templateUrl: 'app/view/tbl_ad_process.html',
				controller: 'tbl_ad_processCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/rpt_proceso_aprobado_vs_real', {
				templateUrl: 'app/view/rpt_proceso_aprobado_vs_real.html',
				controller: 'rpt_proceso_aprobado_vs_realCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/rpt_proceso_por_usuario', {
				templateUrl: 'app/view/rpt_proceso_por_usuario.html',
				controller: 'rpt_proceso_por_usuarioCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/rpt_proceso', {
				templateUrl: 'app/view/rpt_proceso.html',
				controller: 'rpt_procesoCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_scheduling', {
				templateUrl: 'app/view/tbl_ad_scheduling.html',
				controller: 'tbl_ad_schedulingCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_scheduling_state', {
				templateUrl: 'app/view/tbl_ad_scheduling_state.html',
				controller: 'tbl_ad_scheduling_stateCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_location', {
				templateUrl: 'app/view/tbl_ad_location.html',
				controller: 'tbl_ad_locationCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/treeLocation', {
				templateUrl: 'app/view/treeLocation.html',
				controller: 'treeLocationCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/treeLocationAccess', {
				templateUrl: 'app/view/treeLocationAccess.html',
				controller: 'treeLocationAccessCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/treeMenu', {
				templateUrl: 'app/view/treeMenu.html',
				controller: 'treeMenuCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/treeMenuAccess', {
				templateUrl: 'app/view/treeMenuAccess.html',
				controller: 'treeMenuAccessCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_user_type', {
				templateUrl: 'app/view/tbl_ad_user_type.html',
				controller: 'tbl_ad_user_typeCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_user', {
				templateUrl: 'app/view/tbl_ad_user.html',
				controller: 'tbl_ad_userCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_type', {
				templateUrl: 'app/view/tbl_ad_type.html',
				controller: 'tbl_ad_typeCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_make', {
				templateUrl: 'app/view/tbl_ad_make.html',
				controller: 'tbl_ad_makeCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_model', {
				templateUrl: 'app/view/tbl_ad_model.html',
				controller: 'tbl_ad_modelCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_year', {
				templateUrl: 'app/view/tbl_ad_year.html',
				controller: 'tbl_ad_yearCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_color', {
				templateUrl: 'app/view/tbl_ad_color.html',
				controller: 'tbl_ad_colorCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_manager', {
				templateUrl: 'app/view/tbl_ad_manager.html',
				controller: 'tbl_ad_managerCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_state', {
				templateUrl: 'app/view/tbl_ad_state.html',
				controller: 'tbl_ad_stateCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_inventory_state', {
				templateUrl: 'app/view/tbl_ad_inventory_state.html',
				controller: 'tbl_ad_inventory_stateCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_supplier', {
				templateUrl: 'app/view/tbl_ad_supplier.html',
				controller: 'tbl_ad_supplierCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_vehicle', {
				templateUrl: 'app/view/tbl_ad_vehicle.html',
				controller: 'tbl_ad_vehicleCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_fuel_type', {
				templateUrl: 'app/view/tbl_ad_fuel_type.html',
				controller: 'tbl_ad_fuel_typeCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_mileage', {
				templateUrl: 'app/view/tbl_ad_mileage.html',
				controller: 'tbl_ad_mileageCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_tire_make', {
				templateUrl: 'app/view/tbl_ad_tire_make.html',
				controller: 'tbl_ad_tire_makeCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_tire', {
				templateUrl: 'app/view/tbl_ad_tire.html',
				controller: 'tbl_ad_tireCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_maintenance_type', {
				templateUrl: 'app/view/tbl_ad_maintenance_type.html',
				controller: 'tbl_ad_maintenance_typeCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_maintenance', {
				templateUrl: 'app/view/tbl_ad_maintenance.html',
				controller: 'tbl_ad_maintenanceCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_repair', {
				templateUrl: 'app/view/tbl_ad_repair.html',
				controller: 'tbl_ad_repairCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_battery_make', {
				templateUrl: 'app/view/tbl_ad_battery_make.html',
				controller: 'tbl_ad_battery_makeCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_battery_type', {
				templateUrl: 'app/view/tbl_ad_battery_type.html',
				controller: 'tbl_ad_battery_typeCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_battery', {
				templateUrl: 'app/view/tbl_ad_battery.html',
				controller: 'tbl_ad_batteryCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_new_type', {
				templateUrl: 'app/view/tbl_ad_new_type.html',
				controller: 'tbl_ad_new_typeCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_new', {
				templateUrl: 'app/view/tbl_ad_new.html',
				controller: 'tbl_ad_newCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_currency', {
				templateUrl: 'app/view/tbl_ad_currency.html',
				controller: 'tbl_ad_currencyCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/tbl_ad_location_type', {
				templateUrl: 'app/view/tbl_ad_location_type.html',
				controller: 'tbl_ad_location_typeCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/rptWeeklyReview', {
				templateUrl: 'app/view/rptWeeklyReview.html',
				controller: 'rptWeeklyReviewCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/rptScheduling', {
				templateUrl: 'app/view/rptScheduling.html',
				controller: 'rptSchedulingCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/rptVehicle', {
				templateUrl: 'app/view/rptVehicle.html',
				controller: 'rptVehicleCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/rptMileageVehicle', {
				templateUrl: 'app/view/rptMileageVehicle.html',
				controller: 'rptMileageVehicleCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/rptVehicleLocation', {
				templateUrl: 'app/view/rptVehicleLocation.html',
				controller: 'rptVehicleLocationCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/rptVehicleByDate', {
				templateUrl: 'app/view/rptVehicleByDate.html',
				controller: 'rptVehicleByDateCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/rptVehicleCard', {
				templateUrl: 'app/view/rptVehicleCard.html',
				controller: 'rptVehicleCardCtrl',
				data: {
					requireLogin: true
				}
			})
			.when('/rptGeneral', {
				templateUrl: 'app/view/rptGeneral.html',
				controller: 'rptGeneralCtrl',
				data: {
					requireLogin: true
				}
			}).otherwise({
				redirectTo: '/start',
				data: {
					requireLogin: true
				}
			});

		uiGmapGoogleMapApiProvider.configure({
			key: 'AIzaSyCe5Nu5tcQ8r5Nw2h3fsoHyjAu7snTdIfE',
			v: '3.20', //defaults to latest 3.X anyhow
			libraries: 'weather,geometry,visualization'
		});

		console.log('config...');
	});

	app.run(function ($log, $rootScope, $location, $timeout, $window, $cookieStore,
		$http, autenticationService, $uibModal) {
		$rootScope.Panel = '';
		$rootScope.PanelTitle = '';
		$rootScope.PanelSubTitle = '';
		$rootScope.PanelSubSubTitle = '';

		$rootScope.loading = false;

		if (!$rootScope.isAutenticated)
			$rootScope.isAutenticated = false;
		$rootScope.globals = $cookieStore.get('globals') || {};
		$rootScope.filepath = '../uploads/';
		$rootScope.fileuploadurl = '../upload';
		$rootScope.filebo = 'server/main/bo/';
		$rootScope.filehost = 'http://localhost:3080';
		$rootScope.imageglobalpath = '../images/';

		$rootScope.login = function (record) {
			$rootScope.menuGlobal = [];
			autenticationService.autentication(record).then(function (data) {
				console.log(data);
				if (data.success == true && data.requestPassword == 1) {
					$rootScope.isAutenticated = true;
					autenticationService.setCredential(data);
					if ($location.path() == '/' || $location.path() == '/login')
						$location.path('/start');
				}
				if (data.requestPassword == 0) {
					$rootScope.openRequestPassword({ username: data.data.recordset[0].username }, 'lg');
				}
			});
		};

		$rootScope.openRequestPassword = function (record, size, actn) {
			var modalInstance = $uibModal.open({
				/*animation: $scope.animationsEnabled,*/
				templateUrl: 'app/view/requestPassword.html?dt=' + (new Date()).getTime(),
				controller: 'requestPasswordCtrl',
				size: size,
				windowClass: 'modal-default',
				resolve: {
					record: function () { return ((!record ? {} : record)) }
				}
			});
			modalInstance.result.then(function (record) {

			}, function () {

				/*$log.info('Modal dismissed a')*/
			});
		};

		$rootScope.logout = function () {
			autenticationService.clearCredential();
			$rootScope.isAutenticated = false;
			$location.path('/login');
		};

		$rootScope.validate = function () {
			autenticationService.validateautentication(autenticationService.getCredential()).then(function (data) {
				if (data.success == true) {
					/*console.log('autenticated....');*/
					$rootScope.isAutenticated = true;
					autenticationService.setCredential(data);
					/*console.log($location.path());*/
					if ($location.path() == '/' || $location.path() == '/login')
						$location.path('/start');
				} else {
					console.log('no autenticated....');
					$rootScope.isAutenticated = false;
					if ($location.path() != '/home') {
						$location.path('/login');
					}
				}
			});
		};

		$rootScope.$on('$routeChangeSuccess', function (event, toState, toParams) {
			$rootScope.validate();
		});

		console.log('run...');
	});

})();
