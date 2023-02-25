module.exports.tbl_ad_new = {
	path: {
		method: 'POST',
		path: '/server/main/tbl_ad_new',
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
                name: 'Id_new',
                type: module.exports.dbsql.Int,
                value: reg.Id_new
              });
              params.push({
                name: 'Id_new_type',
                type: module.exports.dbsql.Int,
                value: reg.Id_new_type
              });
              params.push({
                name: 'Id_vehicle',
                type: module.exports.dbsql.Int,
                value: reg.Id_vehicle
              });
              params.push({
                name: 'Id_manager',
                type: module.exports.dbsql.Int,
                value: reg.Id_manager
              });
              params.push({
                name: 'event_date',
                type: module.exports.dbsql.DateTime,
                value: reg.event_date
              });
              params.push({
                name: 'event_site',
                type: module.exports.dbsql.NVarChar(255),
                value: reg.event_site
              });
              params.push({
                name: 'price',
                type: module.exports.dbsql.Numeric(19,10),
                value: reg.price
              });
              params.push({
                name: 'comment',
                type: module.exports.dbsql.NVarChar(999),
                value: reg.comment
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
                name: 'Id_currency',
                type: module.exports.dbsql.Int,
                value: reg.Id_currency
              });
              call = {};
              call.type = 'sql';
              call.query = 'sp_tbl_ad_new';
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
