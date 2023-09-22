module.exports.tbl_ad_maintenance = {
  path: {
    method: 'POST',
    path: '/server/main/tbl_ad_maintenance',
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
            name: 'Id_maintenance',
            type: module.exports.dbsql.Int,
            value: reg.Id_maintenance
          });
          params.push({
            name: 'Id_vehicle',
            type: module.exports.dbsql.Int,
            value: reg.Id_vehicle
          });
          params.push({
            name: 'Id_supplier',
            type: module.exports.dbsql.Int,
            value: reg.Id_supplier
          });
          params.push({
            name: 'Id_maintenance_type',
            type: module.exports.dbsql.Int,
            value: reg.Id_maintenance_type
          });
          params.push({
            name: 'invoice',
            type: module.exports.dbsql.NVarChar(50),
            value: reg.invoice
          });
          params.push({
            name: 'price',
            type: module.exports.dbsql.Numeric(19, 10),
            value: reg.price
          });
          params.push({
            name: 'comment',
            type: module.exports.dbsql.NVarChar(255),
            value: reg.comment
          });
          params.push({
            name: 'mileage_service_next',
            type: module.exports.dbsql.Int,
            value: reg.mileage_service_next
          });
          params.push({
            name: 'mileage_service_current',
            type: module.exports.dbsql.Int,
            value: reg.mileage_service_current
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
          params.push({
            name: 'maintenance_date',
            type: module.exports.dbsql.DateTime,
            value: reg.maintenance_date
          });
          call = {};
          call.type = 'sql';
          call.query = 'sp_tbl_ad_maintenance';
          call.params = params.slice(0);
          call.deta = detcalls;
          calls.push(call);
          module.exports.mssqlcnSync.execute(request, reply, calls, function (err, recordsets) {
            if (err) {
              console.log(err);
              reply({
                code: err.code,
                success: false,
                msg: err.msg,
                data: []
              });
            } else {
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
