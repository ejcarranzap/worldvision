module.exports.tbl_ad_tire = {
	path: {
		method: 'POST',
		path: '/server/main/tbl_ad_tire',
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
                name: 'Id_tire',
                type: module.exports.dbsql.Int,
                value: reg.Id_tire
              });
              params.push({
                name: 'Id_vehicle',
                type: module.exports.dbsql.Int,
                value: reg.Id_vehicle
              });
              params.push({
                name: 'Id_tire_make',
                type: module.exports.dbsql.Int,
                value: reg.Id_tire_make
              });
              params.push({
                name: 'Id_supplier',
                type: module.exports.dbsql.Int,
                value: reg.Id_supplier
              });
              params.push({
                name: 'invoice',
                type: module.exports.dbsql.NVarChar(50),
                value: reg.invoice
              });
              params.push({
                name: 'rin',
                type: module.exports.dbsql.NVarChar(50),
                value: reg.rin
              });
              params.push({
                name: 'purchace_date',
                type: module.exports.dbsql.DateTime,
                value: reg.purchace_date
              });
              params.push({
                name: 'price',
                type: module.exports.dbsql.Numeric(19,10),
                value: reg.price
              });
              params.push({
                name: 'comment',
                type: module.exports.dbsql.NVarChar(255),
                value: reg.comment
              });
              params.push({
                name: 'mileage',
                type: module.exports.dbsql.Int,
                value: reg.mileage
              });
              params.push({
                name: 'inactivation_date',
                type: module.exports.dbsql.DateTime,
                value: reg.inactivation_date
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
                name: 'Id_currency',
                type: module.exports.dbsql.Int,
                value: reg.Id_currency
              });
              call = {};
              call.type = 'sql';
              call.query = 'sp_tbl_ad_tire';
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
