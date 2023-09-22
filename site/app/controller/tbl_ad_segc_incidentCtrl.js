(function () {
    'use strict';
    var app = angular.module('itxwebApp')
    app.controller('tbl_ad_segc_incidentCtrl', function ($scope, $rootScope, $log, $window, $http, $filter, autenticationService, $uibModal) {
        $rootScope.Panel = 'Registro de Incidente';
        $rootScope.PanelTitle = 'Administracion';
        $rootScope.PanelSubTitle = 'Seguridad Corporativa';
        $rootScope.PanelSubSubTitle = 'Registro de Incidente';
        $scope.record = {};
        $scope.data = {};
        $scope.pivot_data = {};

        $scope.getData = function () {
            $scope.urls = [];
            $scope.urls.push({
                url: '/server/main/tbl_ad_segc_incident',
                params: {},
                action: 'S'
            });
            $scope.urls.push({
                url: '/server/main/tbl_ad_segc_person',
                params: {},
                action: 'S'
            });
            $scope.urls.push({
                url: '/server/main/tbl_ad_segc_person',
                params: {},
                action: 'S'
            });
            $scope.urls.push({
                url: '/server/main/tbl_ad_segc_incident_type',
                params: {},
                action: 'S'
            });
            $scope.urls.push({
                url: '/server/main/tbl_ad_segc_relation_type',
                params: {},
                action: 'S'
            });
            $scope.urls.push({
                url: '/server/main/tbl_ad_segc_asset_type',
                params: {},
                action: 'S'
            });
            autenticationService.call($scope.urls).then(function (results) {
                setTimeout(function () {
                    $scope.data = results[0].data.data;
                    $scope.tbl_ad_segc_persons = results[1].data.data;
                    $scope.tbl_ad_segc_persons2 = results[2].data.data;
                    $scope.tbl_ad_segc_incident_types = results[3].data.data;
                    $scope.tbl_ad_segc_relation_type = results[4].data.data;
                    $scope.tbl_ad_segc_asset_type = results[5].data.data;
                    $scope.prepareData();
                    $scope.loadData();
                    $scope.$apply();
                }, 0);
            });
        };

        $scope.prepareData = function () {
            angular.forEach($scope.data, function (itm) {
                var itmaux;

                itmaux = $filter('filter')($scope.tbl_ad_segc_persons, function (o) {
                    return o.Id_person == itm.Id_person_involved;
                });
                if (itmaux.length > 0) { itmaux = itmaux[0]; } else { itmaux = {}; }
                itm.tbl_ad_segc_person = itmaux.name;


                itmaux = $filter('filter')($scope.tbl_ad_segc_persons2, function (o) {
                    return o.Id_person == itm.Id_person_reports;
                });
                if (itmaux.length > 0) { itmaux = itmaux[0]; } else { itmaux = {}; }
                itm.tbl_ad_segc_person2 = itmaux.name;


                itmaux = $filter('filter')($scope.tbl_ad_segc_incident_types, function (o) {
                    return o.Id_incident_type == itm.Id_incident_type;
                });
                if (itmaux.length > 0) { itmaux = itmaux[0]; } else { itmaux = {}; }
                itm.tbl_ad_segc_incident_type = itmaux.name;

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
                templateUrl: 'app/view/tbl_ad_segc_incident_det.html?dt=' + (new Date()).getTime(),
                controller: 'tbl_ad_segc_incident_detCtrl',
                size: size,
                windowClass: 'modal-default',
                resolve: {
                    record: function () {
                        return ((!record ? {} : record))
                    },
                    tbl_ad_segc_persons: function () {
                        return ((!$scope.tbl_ad_segc_persons ? [] : $scope.tbl_ad_segc_persons))
                    },
                    tbl_ad_segc_persons2: function () {
                        return ((!$scope.tbl_ad_segc_persons2 ? [] : $scope.tbl_ad_segc_persons2))
                    },
                    tbl_ad_segc_incident_types: function () {
                        return ((!$scope.tbl_ad_segc_incident_types ? [] : $scope.tbl_ad_segc_incident_types))
                    },
                    tbl_ad_segc_relation_type: function () {
                        return ((!$scope.tbl_ad_segc_relation_type ? [] : $scope.tbl_ad_segc_relation_type))
                    },
                    tbl_ad_segc_asset_type: function () {
                        return ((!$scope.tbl_ad_segc_asset_type ? [] : $scope.tbl_ad_segc_asset_type))
                    }
                }
            });
            modalInstance.result.then(function (record) {
                $scope.getData();
            }, function () {
                $scope.getData();
                /*$log.info('Modal dismissed a')*/
            });
        };

        $log.info('tbl_ad_segc_incidentCtrl');
    });

    app.controller('tbl_ad_segc_incident_detCtrl', function (Upload, $timeout, $scope, $rootScope, $log, $window, $http, $filter, autenticationService,
        $uibModalInstance, record, tbl_ad_segc_persons, tbl_ad_segc_persons2, tbl_ad_segc_incident_types, tbl_ad_segc_relation_type, tbl_ad_segc_asset_type) {
        $scope.record = record;
        $scope.tbl_ad_segc_persons = tbl_ad_segc_persons;
        $scope.tbl_ad_segc_persons2 = tbl_ad_segc_persons2;
        $scope.tbl_ad_segc_incident_types = tbl_ad_segc_incident_types;
        $scope.tbl_ad_segc_relation_type = tbl_ad_segc_relation_type;
        $scope.tbl_ad_segc_asset_type = tbl_ad_segc_asset_type;
        $scope.record.tbl_ad_segc_personCmb = {};
        $scope.record.tbl_ad_segc_person2Cmb = {};
        $scope.record.tbl_ad_segc_incident_typeCmb = {};

        $scope.cargaCmb = function () {
            var itmaux;

            itmaux = $filter('filter')($scope.tbl_ad_segc_persons, function (o) {
                console.log(o.Id_person, $scope.record.Id_person_involved);
                return o.Id_person == $scope.record.Id_person_involved;
            });
            console.log(itmaux)
            if (itmaux.length > 0) { itmaux = itmaux[0]; $scope.record.tbl_ad_segc_personCmb = itmaux; } else { itmaux = {}; }


            itmaux = $filter('filter')($scope.tbl_ad_segc_persons2, function (o) {
                console.log(o.Id_person, $scope.record.Id_person_involved);
                return o.Id_person == $scope.record.Id_person_reports;
            });
            console.log(itmaux)
            if (itmaux.length > 0) { itmaux = itmaux[0]; $scope.record.tbl_ad_segc_person2Cmb = itmaux; } else { itmaux = {}; }



            itmaux = $filter('filter')($scope.tbl_ad_segc_incident_types, function (o) {
                return o.Id_incident_type == $scope.record.Id_incident_type;
            });
            if (itmaux.length > 0) { itmaux = itmaux[0]; } else { itmaux = {}; }
            $scope.record.tbl_ad_segc_incident_typeCmb = itmaux;

            $scope.getHandson();
            $scope.getHandson2();
            $scope.getHandson3();
        };

        $scope.save = function () {
            $scope.urls = [];
            $scope.record.deta1 = $scope.handsondata;
            $scope.record.deta2 = $scope.handsondata2;
            $scope.record.deta3 = $scope.handsondata3;
            $scope.urls.push({
                url: '/server/main/tbl_ad_segc_incident',
                params: $scope.record,
                action: (!$scope.record.Id_incident ? 'I' : 'U')
            });
            autenticationService.call($scope.urls).then(function (results) {
                setTimeout(function () {
                    if ($rootScope.errormsg.length == 0)
                        $uibModalInstance.close($scope.record);
                    $scope.$apply();
                }, 0);
            });

        };
        $scope.close = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.getHandsonRender = function (op) {
            if (op == 1) {
                $scope.options.render();
            }
            if (op == 2) {
                $scope.options2.render();
            }
            if (op == 3) {
                $scope.options3.render();
            }
        };

        $scope.tbl_ad_segc_relation_typeHS = [];
        $scope.tbl_ad_segc_personHS = [];
        $scope.tbl_ad_segc_asset_typeHS = [];

        $scope.tbl_ad_segc_relation_typeHS = Object.assign([], $scope.tbl_ad_segc_relation_type).map((c) => { return { id: c.Id_relation_type, text: c.name } });
        $scope.tbl_ad_segc_personHS = Object.assign([], $scope.tbl_ad_segc_persons).map((c) => { return { id: c.Id_person, text: c.name } });
        $scope.tbl_ad_segc_asset_typeHS = Object.assign([], $scope.tbl_ad_segc_asset_type).map((c) => { return { id: c.Id_asset_type, text: c.name } });

        $scope.options = {};
        
        $scope.removeRow1 = function (row, col, datarow) {
			console.log(row, col, datarow);
			$scope.handsondata.splice(row, 1);
			$scope.options.render();
		};

		$scope.addRow1 = function (row, col) {			
			if ($scope.handsondata.length > 0 && $scope.handsondata[row]) {
				$scope.handsondata[row].active = 1;
			}
		}

        $scope.getHandson = function () {

            $scope.handsonheaders = ['Id_incident_children', 'Id_relation_type', 'Id_person', 'incident_role', 'another_role', 'other_relation', 'identification_id', 'name', 'age', 'gender', 'state', 'other_state', /*'user_mod', 'date_mod',*/ 'active'];
            $scope.handsoncols = [
                {
                    data: 'Id_incident_children', readOnly: true
                },
                {
                    data: 'Id_relation_type', type: 'select2', selectOptions: $scope.tbl_ad_segc_relation_typeHS
                },
                {
                    data: 'Id_person', type: 'select2', selectOptions: $scope.tbl_ad_segc_personHS
                },
                {
                    data: 'incident_role', type: 'text'
                },
                {
                    data: 'another_role', type: 'text'
                },
                {
                    data: 'other_relation', type: 'text'
                },
                {
                    data: 'identification_id', type: 'text'
                },
                {
                    data: 'name', type: 'text'
                },
                {
                    data: 'age', type: 'number'
                },
                {
                    data: 'gender', type: 'number'
                },
                {
                    data: 'state', type: 'text'
                },
                {
                    data: 'other_state', type: 'text'
                },
                /*{
                    data: 'user_mod', type: 'text'
                },
                {
                    data: 'date_mod', type: 'date2', editformat: 'DD/MM/YYYY'
                },*/
                {
                    data: 'active', type: 'checkbox', checkedTemplate: 1, uncheckedTemplate: 0
                },
            ];

            if(!$scope.record.deta1  || $scope.record.deta1.length == 0) $scope.record.deta1 = [{active: 1}];
            $scope.handsondata = $scope.record.deta1;

            $scope.handsondata_pivot = angular.copy($scope.handsondata, $scope.handsondata_pivot);
        };

        $scope.options2 = {};

        $scope.removeRow2 = function (row, col, datarow) {
			console.log(row, col, datarow);
			$scope.handsondata2.splice(row, 1);
			$scope.options2.render();
		};

		$scope.addRow2 = function (row, col) {			
			if ($scope.handsondata2.length > 0 && $scope.handsondata2[row]) {
				$scope.handsondata2[row].active = 1;
			}
		}

        $scope.getHandson2 = function () {
            $scope.handsonheaders2 = ['Id_incident_person', 'Id_relation_type', 'Id_person', 'incident_role', 'another_role', 'other_relation', 'identification_id', 'name', 'phone', 'email',	/*'user_mod',	'date_mod',*/	'active'];
            $scope.handsoncols2 = [
                {
                    data: 'Id_incident_person', readOnly: true
                },
                {
                    data: 'Id_relation_type', type: 'select2', selectOptions: $scope.tbl_ad_segc_relation_typeHS
                },
                {
                    data: 'Id_person', type: 'select2', selectOptions: $scope.tbl_ad_segc_personHS
                },
                {
                    data: 'incident_role', type: 'text'
                },
                {
                    data: 'another_role', type: 'text'
                },
                {
                    data: 'other_relation', type: 'text'
                },
                {
                    data: 'identification_id', type: 'text'
                },
                {
                    data: 'name', type: 'text'
                },
                {
                    data: 'phone', type: 'text'
                },
                {
                    data: 'email', type: 'text'
                },
                /*{
                    data: 'user_mod',    type: 'text'
                },
                {
                    data: 'date_mod',    type: 'date2',    editformat: 'DD/MM/YYYY'},*/
                {
                    data: 'active', type: 'checkbox', checkedTemplate: 1, uncheckedTemplate: 0
                },
            ];

            if(!$scope.record.deta2  || $scope.record.deta2.length == 0) $scope.record.deta2 = [{active: 1}];
            $scope.handsondata2 = $scope.record.deta2;

            $scope.handsondata_pivot2 = angular.copy($scope.handsondata2, $scope.handsondata_pivot2);
        };

        $scope.options3 = {};
        $scope.removeRow3 = function (row, col, datarow) {
			console.log(row, col, datarow);
			$scope.handsondata3.splice(row, 1);
			$scope.options3.render();
		};

		$scope.addRow3 = function (row, col) {			
			if ($scope.handsondata3.length > 0 && $scope.handsondata3[row]) {
				$scope.handsondata3[row].active = 1;
			}
		}
        $scope.getHandson3 = function () {
            $scope.handsonheaders3 = ['Id_incident_asset', 'Id_asset_type', 'other', 'description', 'brand', 'model', 'asset_number', 'plate_number', 'state',	/*'user_mod',	'date_mod',*/	'active',];
            $scope.handsoncols3 = [
                {
                    data: 'Id_incident_asset', readOnly: true
                },
                {
                    data: 'Id_asset_type', type: 'select2', selectOptions: $scope.tbl_ad_segc_asset_typeHS
                },
                {
                    data: 'other', type: 'text'
                },
                {
                    data: 'description', type: 'text'
                },
                {
                    data: 'brand', type: 'text'
                },
                {
                    data: 'model', type: 'text'
                },
                {
                    data: 'asset_number', type: 'text'
                },
                {
                    data: 'plate_number', type: 'text'
                },
                {
                    data: 'state', type: 'text'
                },
                /*{
                    data: 'user_mod',    type: 'text'
                },
                {
                    data: 'date_mod',    type: 'date2',    editformat: 'DD/MM/YYYY'},*/
                {
                    data: 'active', type: 'checkbox', checkedTemplate: 1, uncheckedTemplate: 0
                },
            ];

            if(!$scope.record.deta3 || $scope.record.deta3.length == 0) $scope.record.deta3 = [{active: 1}];
            $scope.handsondata3 = ($scope.record.deta3);

            $scope.handsondata_pivot3 = angular.copy($scope.handsondata3, $scope.handsondata_pivot3);
        };

        $scope.cargaCmb();

        $log.info('tbl_ad_segc_incident_detCtrl');
    });
}());
