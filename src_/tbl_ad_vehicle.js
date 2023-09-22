module.exports.tbl_ad_vehicle = {
	path: {
		method: 'POST',
		path: '/server/main/tbl_ad_vehicle',
		config: {
			auth: false,
			handler: function (request, reply) {
            try {
              var reg = request.payload;
              var params, detparams;
              var calls = [], detcalls = [];
              var call = {}, detcall = {};
              reg = (!reg ? {} : reg);
              params = [];
              params.push({
                name: 'ACTION',
                type: module.exports.dbsql.NVarChar,
                value: reg.action
              });
              params.push({
                name: 'RAWPRM',
                type: module.exports.dbsql.NVarChar,
                value: reg.rawprm
              });
              params.push({
                name: 'Id_vehicle',
                type: module.exports.dbsql.Int,
                value: reg.Id_vehicle
              });
              params.push({
                name: 'Id_location',
                type: module.exports.dbsql.Int,
                value: reg.Id_location
              });
              params.push({
                name: 'Id_make',
                type: module.exports.dbsql.Int,
                value: reg.Id_make
              });
              params.push({
                name: 'Id_model',
                type: module.exports.dbsql.Int,
                value: reg.Id_model
              });
              params.push({
                name: 'Id_type',
                type: module.exports.dbsql.Int,
                value: reg.Id_type
              });
              params.push({
                name: 'Id_year',
                type: module.exports.dbsql.Int,
                value: reg.Id_year
              });
              params.push({
                name: 'Id_color',
                type: module.exports.dbsql.Int,
                value: reg.Id_color
              });
              params.push({
                name: 'Id_manager',
                type: module.exports.dbsql.Int,
                value: reg.Id_manager
              });
              params.push({
                name: 'Id_state',
                type: module.exports.dbsql.Int,
                value: reg.Id_state
              });
              params.push({
                name: 'Id_inventory_state',
                type: module.exports.dbsql.Int,
                value: reg.Id_inventory_state
              });
              params.push({
                name: 'Id_supplier',
                type: module.exports.dbsql.Int,
                value: reg.Id_supplier
              });
              params.push({
                name: 'code',
                type: module.exports.dbsql.NVarChar(20),
                value: reg.code
              });
              params.push({
                name: 'policy',
                type: module.exports.dbsql.NVarChar(20),
                value: reg.policy
              });
              params.push({
                name: 'comment',
                type: module.exports.dbsql.NVarChar(255),
                value: reg.comment
              });
              params.push({
                name: 'mileage_service',
                type: module.exports.dbsql.Int,
                value: reg.mileage_service
              });
              params.push({
                name: 'mileage_alert',
                type: module.exports.dbsql.Int,
                value: reg.mileage_alert
              });
              params.push({
                name: 'mileage_current',
                type: module.exports.dbsql.Int,
                value: reg.mileage_current
              });
              params.push({
                name: 'mileage_date_read',
                type: module.exports.dbsql.DateTime,
                value: reg.mileage_date_read
              });
              params.push({
                name: 'mileage_service_applied',
                type: module.exports.dbsql.Int,
                value: reg.mileage_service_applied
              });
              params.push({
                name: 'mileage_service_applied_date',
                type: module.exports.dbsql.DateTime,
                value: reg.mileage_service_applied_date
              });
              params.push({
                name: 'mileage_service_next',
                type: module.exports.dbsql.Int,
                value: reg.mileage_service_next
              });
              params.push({
                name: 'purchace_price',
                type: module.exports.dbsql.Numeric(19,10),
                value: reg.purchace_price
              });
              params.push({
                name: 'depreciation',
                type: module.exports.dbsql.Numeric(19,10),
                value: reg.depreciation
              });
              params.push({
                name: 'circulation_card',
                type: module.exports.dbsql.NVarChar(50),
                value: reg.circulation_card
              });
              params.push({
                name: 'title',
                type: module.exports.dbsql.NVarChar(50),
                value: reg.title
              });
              params.push({
                name: 'engine',
                type: module.exports.dbsql.NVarChar(50),
                value: reg.engine
              });
              params.push({
                name: 'chassis',
                type: module.exports.dbsql.NVarChar(50),
                value: reg.chassis
              });
              params.push({
                name: 'inactivation_date',
                type: module.exports.dbsql.DateTime,
                value: reg.inactivation_date
              });
              params.push({
                name: 'image1',
                type: module.exports.dbsql.NVarChar(255),
                value: reg.image1
              });
              params.push({
                name: 'image2',
                type: module.exports.dbsql.NVarChar(255),
                value: reg.image2
              });
              params.push({
                name: 'image3',
                type: module.exports.dbsql.NVarChar(255),
                value: reg.image3
              });
              params.push({
                name: 'image4',
                type: module.exports.dbsql.NVarChar(255),
                value: reg.image4
              });
              params.push({
                name: 'image5',
                type: module.exports.dbsql.NVarChar(255),
                value: reg.image5
              });
              params.push({
                name: 'image6',
                type: module.exports.dbsql.NVarChar(255),
                value: reg.image6
              });
              params.push({
                name: 'date_mod',
                type: module.exports.dbsql.DateTime,
                value: reg.extra.date
              });
              params.push({
                name: 'user_mod',
                type: module.exports.dbsql.NVarChar(20),
                value: reg.extra.user
              });
              params.push({
                name: 'active',
                type: module.exports.dbsql.Int,
                value: reg.active
              });
              params.push({
                name: 'vehicle_number',
                type: module.exports.dbsql.NVarChar,
                value: reg.vehicle_number
              });
              if(reg.action == 'I' || reg.action == 'U')
                for(var i = 0; i < reg.deta0.length; i++){
                  var regdeta = reg.deta0[i];
                  var regaction = (!regdeta.Id_battery ? 'I' : 'U');
                  detparams = [];
                  detparams.push({
                    name: 'ACTION',
                    type: module.exports.dbsql.NVarChar,
                    value: regaction
                  });
              	detparams.push({
                	  name: 'RAWPRM',
                	  type: module.exports.dbsql.NVarChar,
                	  value: reg.rawprm
              	});
                detparams.push({
                  name: 'Id_battery',
                  type: module.exports.dbsql.Int,
                  value: regdeta.Id_battery
                });
                detparams.push({
                  name: 'Id_vehicle',
                  type: module.exports.dbsql.Int,
                  value: regdeta.Id_vehicle
                });
                detparams.push({
                  name: 'Id_supplier',
                  type: module.exports.dbsql.Int,
                  value: regdeta.Id_supplier
                });
                detparams.push({
                  name: 'Id_battery_make',
                  type: module.exports.dbsql.Int,
                  value: regdeta.Id_battery_make
                });
                detparams.push({
                  name: 'Id_battery_type',
                  type: module.exports.dbsql.Int,
                  value: regdeta.Id_battery_type
                });
                detparams.push({
                  name: 'invoice',
                  type: module.exports.dbsql.NVarChar(50),
                  value: regdeta.invoice
                });
                detparams.push({
                  name: 'purchace_date',
                  type: module.exports.dbsql.DateTime,
                  value: regdeta.purchace_date
                });
                detparams.push({
                  name: 'purchace_price',
                  type: module.exports.dbsql.Numeric(19,10),
                  value: regdeta.purchace_price
                });
                detparams.push({
                  name: 'cells',
                  type: module.exports.dbsql.Int,
                  value: regdeta.cells
                });
                detparams.push({
                  name: 'comment',
                  type: module.exports.dbsql.NVarChar(255),
                  value: regdeta.comment
                });
                detparams.push({
                  name: 'due_date',
                  type: module.exports.dbsql.DateTime,
                  value: regdeta.due_date
                });
                detparams.push({
                  name: 'inactivation_date',
                  type: module.exports.dbsql.DateTime,
                  value: regdeta.inactivation_date
                });
                detparams.push({
                  name: 'date_mod',
                  type: module.exports.dbsql.DateTime,
                  value: regdeta.date_mod
                });
                detparams.push({
                  name: 'user_mod',
                  type: module.exports.dbsql.NVarChar(20),
                  value: regdeta.user_mod
                });
                detparams.push({
                  name: 'active',
                  type: module.exports.dbsql.Int,
                  value: regdeta.active
                });
                detcall = {};
                detcall.type = 'sql';
                detcall.query = 'sp_tbl_ad_battery';
                detcall.params = detparams.slice(0);
                detcall.paramsToReplace = [ 'Id_vehicle'];
                detcalls.push(detcall);
            }
              if(reg.action == 'I' || reg.action == 'U')
                for(var i = 0; i < reg.deta1.length; i++){
                  var regdeta = reg.deta1[i];
                  var regaction = (!regdeta.Id_maintenance ? 'I' : 'U');
                  detparams = [];
                  detparams.push({
                    name: 'ACTION',
                    type: module.exports.dbsql.NVarChar,
                    value: regaction
                  });
              	detparams.push({
                	  name: 'RAWPRM',
                	  type: module.exports.dbsql.NVarChar,
                	  value: reg.rawprm
              	});
                detparams.push({
                  name: 'Id_maintenance',
                  type: module.exports.dbsql.Int,
                  value: regdeta.Id_maintenance
                });
                detparams.push({
                  name: 'Id_vehicle',
                  type: module.exports.dbsql.Int,
                  value: regdeta.Id_vehicle
                });
                detparams.push({
                  name: 'Id_supplier',
                  type: module.exports.dbsql.Int,
                  value: regdeta.Id_supplier
                });
                detparams.push({
                  name: 'Id_maintenance_type',
                  type: module.exports.dbsql.Int,
                  value: regdeta.Id_maintenance_type
                });
                detparams.push({
                  name: 'invoice',
                  type: module.exports.dbsql.NVarChar(50),
                  value: regdeta.invoice
                });
                detparams.push({
                  name: 'price',
                  type: module.exports.dbsql.Numeric(19,10),
                  value: regdeta.price
                });
                detparams.push({
                  name: 'comment',
                  type: module.exports.dbsql.NVarChar(255),
                  value: regdeta.comment
                });
                detparams.push({
                  name: 'mileage_service_next',
                  type: module.exports.dbsql.Int,
                  value: regdeta.mileage_service_next
                });
                detparams.push({
                  name: 'mileage_service_current',
                  type: module.exports.dbsql.Int,
                  value: regdeta.mileage_service_current
                });
                detparams.push({
                  name: 'has_history',
                  type: module.exports.dbsql.Int,
                  value: regdeta.has_history
                });
                detparams.push({
                  name: 'is_clean',
                  type: module.exports.dbsql.Int,
                  value: regdeta.is_clean
                });
                detparams.push({
                  name: 'has_fuel',
                  type: module.exports.dbsql.Int,
                  value: regdeta.has_fuel
                });
                detparams.push({
                  name: 'date_mod',
                  type: module.exports.dbsql.DateTime,
                  value: regdeta.date_mod
                });
                detparams.push({
                  name: 'user_mod',
                  type: module.exports.dbsql.NVarChar(20),
                  value: regdeta.user_mod
                });
                detparams.push({
                  name: 'active',
                  type: module.exports.dbsql.Int,
                  value: regdeta.active
                });
                detcall = {};
                detcall.type = 'sql';
                detcall.query = 'sp_tbl_ad_maintenance';
                detcall.params = detparams.slice(0);
                detcall.paramsToReplace = [ 'Id_vehicle'];
                detcalls.push(detcall);
            }
              if(reg.action == 'I' || reg.action == 'U')
                for(var i = 0; i < reg.deta2.length; i++){
                  var regdeta = reg.deta2[i];
                  var regaction = (!regdeta.Id_mileage ? 'I' : 'U');
                  detparams = [];
                  detparams.push({
                    name: 'ACTION',
                    type: module.exports.dbsql.NVarChar,
                    value: regaction
                  });
              	detparams.push({
                	  name: 'RAWPRM',
                	  type: module.exports.dbsql.NVarChar,
                	  value: reg.rawprm
              	});
                detparams.push({
                  name: 'Id_mileage',
                  type: module.exports.dbsql.Int,
                  value: regdeta.Id_mileage
                });
                detparams.push({
                  name: 'Id_vehicle',
                  type: module.exports.dbsql.Int,
                  value: regdeta.Id_vehicle
                });
                detparams.push({
                  name: 'Id_fuel_type',
                  type: module.exports.dbsql.Int,
                  value: regdeta.Id_fuel_type
                });
                detparams.push({
                  name: 'mileage_date',
                  type: module.exports.dbsql.DateTime,
                  value: regdeta.mileage_date
                });
                detparams.push({
                  name: 'mileage_current',
                  type: module.exports.dbsql.Int,
                  value: regdeta.mileage_current
                });
                detparams.push({
                  name: 'name',
                  type: module.exports.dbsql.NVarChar(50),
                  value: regdeta.name
                });
                detparams.push({
                  name: 'comment',
                  type: module.exports.dbsql.NVarChar(255),
                  value: regdeta.comment
                });
                detparams.push({
                  name: 'has_history',
                  type: module.exports.dbsql.Int,
                  value: regdeta.has_history
                });
                detparams.push({
                  name: 'is_clean',
                  type: module.exports.dbsql.Int,
                  value: regdeta.is_clean
                });
                detparams.push({
                  name: 'has_fuel',
                  type: module.exports.dbsql.Int,
                  value: regdeta.has_fuel
                });
                detparams.push({
                  name: 'circulation_card',
                  type: module.exports.dbsql.NVarChar(50),
                  value: regdeta.circulation_card
                });
                detparams.push({
                  name: 'light',
                  type: module.exports.dbsql.Int,
                  value: regdeta.light
                });
                detparams.push({
                  name: 'date_mod',
                  type: module.exports.dbsql.DateTime,
                  value: regdeta.date_mod
                });
                detparams.push({
                  name: 'user_mod',
                  type: module.exports.dbsql.NVarChar(20),
                  value: regdeta.user_mod
                });
                detparams.push({
                  name: 'active',
                  type: module.exports.dbsql.Int,
                  value: regdeta.active
                });
                detcall = {};
                detcall.type = 'sql';
                detcall.query = 'sp_tbl_ad_mileage';
                detcall.params = detparams.slice(0);
                detcall.paramsToReplace = [ 'Id_vehicle'];
                detcalls.push(detcall);
            }
              if(reg.action == 'I' || reg.action == 'U')
                for(var i = 0; i < reg.deta3.length; i++){
                  var regdeta = reg.deta3[i];
                  var regaction = (!regdeta.Id_new ? 'I' : 'U');
                  detparams = [];
                  detparams.push({
                    name: 'ACTION',
                    type: module.exports.dbsql.NVarChar,
                    value: regaction
                  });
              	detparams.push({
                	  name: 'RAWPRM',
                	  type: module.exports.dbsql.NVarChar,
                	  value: reg.rawprm
              	});
                detparams.push({
                  name: 'Id_new',
                  type: module.exports.dbsql.Int,
                  value: regdeta.Id_new
                });
                detparams.push({
                  name: 'Id_new_type',
                  type: module.exports.dbsql.Int,
                  value: regdeta.Id_new_type
                });
                detparams.push({
                  name: 'Id_vehicle',
                  type: module.exports.dbsql.Int,
                  value: regdeta.Id_vehicle
                });
                detparams.push({
                  name: 'Id_manager',
                  type: module.exports.dbsql.Int,
                  value: regdeta.Id_manager
                });
                detparams.push({
                  name: 'event_date',
                  type: module.exports.dbsql.DateTime,
                  value: regdeta.event_date
                });
                detparams.push({
                  name: 'event_site',
                  type: module.exports.dbsql.NVarChar(255),
                  value: regdeta.event_site
                });
                detparams.push({
                  name: 'price',
                  type: module.exports.dbsql.Numeric(19,10),
                  value: regdeta.price
                });
                detparams.push({
                  name: 'comment',
                  type: module.exports.dbsql.NVarChar(999),
                  value: regdeta.comment
                });
                detparams.push({
                  name: 'image1',
                  type: module.exports.dbsql.NVarChar(255),
                  value: regdeta.image1
                });
                detparams.push({
                  name: 'image2',
                  type: module.exports.dbsql.NVarChar(255),
                  value: regdeta.image2
                });
                detparams.push({
                  name: 'image3',
                  type: module.exports.dbsql.NVarChar(255),
                  value: regdeta.image3
                });
                detparams.push({
                  name: 'image4',
                  type: module.exports.dbsql.NVarChar(255),
                  value: regdeta.image4
                });
                detparams.push({
                  name: 'image5',
                  type: module.exports.dbsql.NVarChar(255),
                  value: regdeta.image5
                });
                detparams.push({
                  name: 'image6',
                  type: module.exports.dbsql.NVarChar(255),
                  value: regdeta.image6
                });
                detparams.push({
                  name: 'date_mod',
                  type: module.exports.dbsql.DateTime,
                  value: regdeta.date_mod
                });
                detparams.push({
                  name: 'user_mod',
                  type: module.exports.dbsql.NVarChar(20),
                  value: regdeta.user_mod
                });
                detparams.push({
                  name: 'active',
                  type: module.exports.dbsql.Int,
                  value: regdeta.active
                });
                detcall = {};
                detcall.type = 'sql';
                detcall.query = 'sp_tbl_ad_new';
                detcall.params = detparams.slice(0);
                detcall.paramsToReplace = [ 'Id_vehicle'];
                detcalls.push(detcall);
            }
              if(reg.action == 'I' || reg.action == 'U')
                for(var i = 0; i < reg.deta4.length; i++){
                  var regdeta = reg.deta4[i];
                  var regaction = (!regdeta.Id_repair ? 'I' : 'U');
                  detparams = [];
                  detparams.push({
                    name: 'ACTION',
                    type: module.exports.dbsql.NVarChar,
                    value: regaction
                  });
              	detparams.push({
                	  name: 'RAWPRM',
                	  type: module.exports.dbsql.NVarChar,
                	  value: reg.rawprm
              	});
                detparams.push({
                  name: 'Id_repair',
                  type: module.exports.dbsql.Int,
                  value: regdeta.Id_repair
                });
                detparams.push({
                  name: 'Id_vehicle',
                  type: module.exports.dbsql.Int,
                  value: regdeta.Id_vehicle
                });
                detparams.push({
                  name: 'Id_supplier',
                  type: module.exports.dbsql.Int,
                  value: regdeta.Id_supplier
                });
                detparams.push({
                  name: 'Id_maintenance_type',
                  type: module.exports.dbsql.Int,
                  value: regdeta.Id_maintenance_type
                });
                detparams.push({
                  name: 'invoice',
                  type: module.exports.dbsql.NVarChar(50),
                  value: regdeta.invoice
                });
                detparams.push({
                  name: 'price',
                  type: module.exports.dbsql.Numeric(19,10),
                  value: regdeta.price
                });
                detparams.push({
                  name: 'comment',
                  type: module.exports.dbsql.NVarChar(255),
                  value: regdeta.comment
                });
                detparams.push({
                  name: 'mileage_service_next',
                  type: module.exports.dbsql.Int,
                  value: regdeta.mileage_service_next
                });
                detparams.push({
                  name: 'mileage_service_current',
                  type: module.exports.dbsql.Int,
                  value: regdeta.mileage_service_current
                });
                detparams.push({
                  name: 'has_history',
                  type: module.exports.dbsql.Int,
                  value: regdeta.has_history
                });
                detparams.push({
                  name: 'is_clean',
                  type: module.exports.dbsql.Int,
                  value: regdeta.is_clean
                });
                detparams.push({
                  name: 'has_fuel',
                  type: module.exports.dbsql.Int,
                  value: regdeta.has_fuel
                });
                detparams.push({
                  name: 'date_mod',
                  type: module.exports.dbsql.DateTime,
                  value: regdeta.date_mod
                });
                detparams.push({
                  name: 'user_mod',
                  type: module.exports.dbsql.NVarChar(20),
                  value: regdeta.user_mod
                });
                detparams.push({
                  name: 'active',
                  type: module.exports.dbsql.Int,
                  value: regdeta.active
                });
                detcall = {};
                detcall.type = 'sql';
                detcall.query = 'sp_tbl_ad_repair';
                detcall.params = detparams.slice(0);
                detcall.paramsToReplace = [ 'Id_vehicle'];
                detcalls.push(detcall);
            }
              if(reg.action == 'I' || reg.action == 'U')
                for(var i = 0; i < reg.deta5.length; i++){
                  var regdeta = reg.deta5[i];
                  var regaction = (!regdeta.Id_scheduling ? 'I' : 'U');
                  detparams = [];
                  detparams.push({
                    name: 'ACTION',
                    type: module.exports.dbsql.NVarChar,
                    value: regaction
                  });
              	detparams.push({
                	  name: 'RAWPRM',
                	  type: module.exports.dbsql.NVarChar,
                	  value: reg.rawprm
              	});
                detparams.push({
                  name: 'Id_scheduling',
                  type: module.exports.dbsql.Int,
                  value: regdeta.Id_scheduling
                });
                detparams.push({
                  name: 'Id_vehicle',
                  type: module.exports.dbsql.Int,
                  value: regdeta.Id_vehicle
                });
                detparams.push({
                  name: 'comment',
                  type: module.exports.dbsql.NVarChar(999),
                  value: regdeta.comment
                });
                detparams.push({
                  name: 'source_address',
                  type: module.exports.dbsql.NVarChar(255),
                  value: regdeta.source_address
                });
                detparams.push({
                  name: 'destination_address',
                  type: module.exports.dbsql.NVarChar(255),
                  value: regdeta.destination_address
                });
                detparams.push({
                  name: 'driver',
                  type: module.exports.dbsql.NVarChar(50),
                  value: regdeta.driver
                });
                detparams.push({
                  name: 'start_date',
                  type: module.exports.dbsql.DateTime,
                  value: regdeta.start_date
                });
                detparams.push({
                  name: 'end_date',
                  type: module.exports.dbsql.DateTime,
                  value: regdeta.end_date
                });
                detparams.push({
                  name: 'mileage_start',
                  type: module.exports.dbsql.Int,
                  value: regdeta.mileage_start
                });
                detparams.push({
                  name: 'mileage_end',
                  type: module.exports.dbsql.Int,
                  value: regdeta.mileage_end
                });
                detparams.push({
                  name: 'date_mod',
                  type: module.exports.dbsql.DateTime,
                  value: regdeta.date_mod
                });
                detparams.push({
                  name: 'user_mod',
                  type: module.exports.dbsql.NVarChar(20),
                  value: regdeta.user_mod
                });
                detparams.push({
                  name: 'active',
                  type: module.exports.dbsql.Int,
                  value: regdeta.active
                });
                detcall = {};
                detcall.type = 'sql';
                detcall.query = 'sp_tbl_ad_scheduling';
                detcall.params = detparams.slice(0);
                detcall.paramsToReplace = [ 'Id_vehicle'];
                detcalls.push(detcall);
            }
              call = {};
              call.type = 'sql';
              call.query = 'sp_tbl_ad_vehicle';
              call.params = params.slice(0);
              call.deta = detcalls;
              calls.push(call);
              module.exports.mssqlcnSync.execute(request, reply, calls, function(err,recordsets){
                if(err){
                  console.log(err);
                  reply({
                    code: err.code,
                    success: false,
                    msg: err.msg,
                    data: []
                  });
                }else{
                  /*console.log(recordsets[0].recordsets[0]);*/
                  reply({
                    code: 0,
                    success: true,
                    msg: 'Operaci?n exitosa',
                    data: recordsets[0].recordsets[0]
                  });
                }
              }, 'configLocal');
            } catch (e) {
              console.log(e.message);
              reply({
                code: -1,
                msg: e.message,
                success: false
              });
            }
      }
    }
  }
};
