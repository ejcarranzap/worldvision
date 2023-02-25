module.exports.tbl_ad_mileage = {
	path: {
		method: 'POST',
		path: '/server/main/tbl_ad_mileage',
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
                name: 'Id_mileage',
                type: module.exports.dbsql.Int,
                value: reg.Id_mileage
              });
              params.push({
                name: 'Id_vehicle',
                type: module.exports.dbsql.Int,
                value: reg.Id_vehicle
              });
              params.push({
                name: 'Id_fuel_type',
                type: module.exports.dbsql.Int,
                value: reg.Id_fuel_type
              });
              params.push({
                name: 'mileage_date',
                type: module.exports.dbsql.DateTime,
                value: reg.mileage_date
              });
              params.push({
                name: 'mileage_current',
                type: module.exports.dbsql.Int,
                value: reg.mileage_current
              });
              params.push({
                name: 'name',
                type: module.exports.dbsql.NVarChar(50),
                value: reg.name
              });
              params.push({
                name: 'comment',
                type: module.exports.dbsql.NVarChar(255),
                value: reg.comment
              });
              params.push({
                name: 'has_history',
                type: module.exports.dbsql.Int,
                value: reg.has_history
              });
              params.push({
                name: 'is_clean',
                type: module.exports.dbsql.Int,
                value: reg.is_clean
              });
              params.push({
                name: 'has_fuel',
                type: module.exports.dbsql.Int,
                value: reg.has_fuel
              });
              params.push({
                name: 'circulation_card',
                type: module.exports.dbsql.NVarChar(50),
                value: reg.circulation_card
              });
              params.push({
                name: 'light',
                type: module.exports.dbsql.Int,
                value: reg.light
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
                name: 'fuel_card',
                type: module.exports.dbsql.Int,
                value: reg.fuel_card
              });
              call = {};
              call.type = 'sql';
              call.query = 'sp_tbl_ad_mileage';
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
