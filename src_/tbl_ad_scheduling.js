module.exports.tbl_ad_scheduling = {
	path: {
		method: 'POST',
		path: '/server/main/tbl_ad_scheduling',
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
                name: 'Id_scheduling',
                type: module.exports.dbsql.Int,
                value: reg.Id_scheduling
              });
              params.push({
                name: 'Id_vehicle',
                type: module.exports.dbsql.Int,
                value: reg.Id_vehicle
              });
              params.push({
                name: 'comment',
                type: module.exports.dbsql.NVarChar(999),
                value: reg.comment
              });
              params.push({
                name: 'source_address',
                type: module.exports.dbsql.NVarChar(255),
                value: reg.source_address
              });
              params.push({
                name: 'destination_address',
                type: module.exports.dbsql.NVarChar(255),
                value: reg.destination_address
              });
              params.push({
                name: 'driver',
                type: module.exports.dbsql.NVarChar(50),
                value: reg.driver
              });
              params.push({
                name: 'start_date',
                type: module.exports.dbsql.DateTime,
                value: reg.start_date
              });
              params.push({
                name: 'end_date',
                type: module.exports.dbsql.DateTime,
                value: reg.end_date
              });
              params.push({
                name: 'mileage_start',
                type: module.exports.dbsql.Int,
                value: reg.mileage_start
              });
              params.push({
                name: 'mileage_end',
                type: module.exports.dbsql.Int,
                value: reg.mileage_end
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
                name: 'Id_scheduling_state',
                type: module.exports.dbsql.Int,
                value: reg.Id_scheduling_state
              });
              call = {};
              call.type = 'sql';
              call.query = 'sp_tbl_ad_scheduling';
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
