module.exports.test = {
  path: {
    method: 'GET',
    path: '/test',
    handler: function(request, reply) {
      try{
        var reg = request.payload;
        var params, detparams;
        var calls = [], detcalls = [];
        var call = {}, detcall = {};

        reg = (!reg ? {} : reg);
        console.log(reg);

        params = [];
        params.push({
            name: 'ACTION',
            type: module.exports.dbsql.NVarChar,
            value: 'I'
        });
        params.push({
            name: 'IDENCA',
            type: module.exports.dbsql.Int,
            value: undefined
        });
        params.push({
            name: 'NAME',
            type: module.exports.dbsql.NVarChar,
            value: 'JONATAN CARRANZA'
        });
        params.push({
            name: 'DATE',
            type: module.exports.dbsql.NVarChar,
            value: '2017-09-22'
        });
        params.push({
            name: 'USERNAME',
            type: module.exports.dbsql.NVarChar,
            value: 'JON'
        });
        params.push({
            name: 'ACTIVO',
            type: module.exports.dbsql.Int,
            value: 1
        });

        detparams = [];
        detparams.push({
            name: 'ACTION',
            type: module.exports.dbsql.NVarChar,
            value: 'I'
        });
        detparams.push({
            name: 'IDDETA',
            type: module.exports.dbsql.Int,
            value: undefined
        });
        detparams.push({
            name: 'IDENCA',
            type: module.exports.dbsql.Int,
            value: undefined
        });
        detparams.push({
            name: 'CODE',
            type: module.exports.dbsql.NVarChar,
            value: 'C001'
        });
        detparams.push({
            name: 'DSCRIPTION',
            type: module.exports.dbsql.NVarChar,
            value: 'C001 - DSCRIPTION'
        });
        detparams.push({
            name: 'QUANTITY',
            type: module.exports.dbsql.Numeric(19,10),
            value: 1.23
        });
        detparams.push({
            name: 'PRICE',
            type: module.exports.dbsql.Numeric(19,10),
            value: 152.23
        });

        detcall = {};
        detcall.type = 'sql';
        detcall.query = 'MOBILE.SP_TEST_DETA';
        detcall.paramsToReplace = ['IDENCA'];
        detcall.params = detparams.slice(0);
        detcalls.push(detcall);

        detparams = [];
        detparams.push({
            name: 'ACTION',
            type: module.exports.dbsql.NVarChar,
            value: 'I'
        });
        detparams.push({
            name: 'IDDETA',
            type: module.exports.dbsql.Int,
            value: undefined
        });
        detparams.push({
            name: 'IDENCA',
            type: module.exports.dbsql.Int,
            value: undefined
        });
        detparams.push({
            name: 'CODE',
            type: module.exports.dbsql.NVarChar,
            value: 'C002'
        });
        detparams.push({
            name: 'DSCRIPTION',
            type: module.exports.dbsql.NVarChar,
            value: 'C002 - DSCRIPTION'
        });
        detparams.push({
            name: 'QUANTITY',
            type: module.exports.dbsql.Numeric(19,10),
            value: 22.35
        });
        detparams.push({
            name: 'PRICE',
            type: module.exports.dbsql.Numeric(19,10),
            value: 100.25
        });

        detcall = {};
        detcall.type = 'sql';
        detcall.query = 'MOBILE.SP_TEST_DETA';
        detcall.paramsToReplace = ['IDENCA'];
        detcall.params = detparams.slice(0);
        detcalls.push(detcall);

        call = {};
        call.type = 'sql';
        call.query = 'MOBILE.SP_TEST_ENCA';
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
              msg: 'Operación exitosa',
              data: recordsets[0].recordsets[0]
            });
          }
        }, 'configLocal');
      }catch(e){
        console.log(e.stack);
        reply({
          code: -1,
          success: false,
          msg: e.stack,
          data: []
        },'configLocal');
      }
    }
  }
};
