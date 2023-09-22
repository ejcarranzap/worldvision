module.exports.catalog_tool = {
  path: {
    method: 'POST',
    path: '/server/main/catalog_tool',
    handler: function(request, reply) {
      try{
        var reg = request.payload;
        var params;
        var calls = [];
        var call = {};

        reg = (!reg ? {} : reg);
        console.log(reg);

        if(reg.action != 'GUARDARUSUARIO' || reg.action != 'GUARDARTIPOUSUARIO'){
          params = [];
          params.push({
              name: 'ACTION',
              type: module.exports.dbsql.NVarChar,
              value: reg.action
          });
          params.push({
              name: 'USUARIO',
              type: module.exports.dbsql.NVarChar,
              value: null
          });

          call = {};
          call.type = 'sql';
          call.query = 'MOBILE.SP_CATALOG_TOOL';
          call.params = params.slice(0);
          calls.push(call);
        }
        if(reg.action == 'GUARDARTIPOUSUARIO'){
          params = [];
          params.push({
              name: 'ACTION',
              type: module.exports.dbsql.NVarChar,
              value: reg.action
          });
          params.push({
              name: 'IDTIPO',
              type: module.exports.dbsql.Int,
              value: reg.IDTIPO
          });
          params.push({
              name: 'NOMBRE',
              type: module.exports.dbsql.NVarChar,
              value: reg.NOMBRE
          });
          params.push({
              name: 'ACTIVO',
              type: module.exports.dbsql.Int,
              value: reg.ACTIVO
          });

          call = {};
          call.type = 'sql';
          call.query = 'MOBILE.SP_CATALOG_TIPOUSUARIO';
          call.params = params.slice(0);
          calls.push(call);
        }
        if(reg.action == 'GUARDAROPCION'){
          params = [];
          params.push({
              name: 'ACTION',
              type: module.exports.dbsql.NVarChar,
              value: reg.action
          });
          params.push({
              name: 'IDOPCION',
              type: module.exports.dbsql.Int,
              value: reg.IDOPCION
          });
          params.push({
              name: 'NOMBRE',
              type: module.exports.dbsql.NVarChar,
              value: reg.NOMBRE
          });
          params.push({
              name: 'URL',
              type: module.exports.dbsql.NVarChar,
              value: reg.URL
          });
          params.push({
              name: 'ACTIVO',
              type: module.exports.dbsql.Int,
              value: reg.ACTIVO
          });

          call = {};
          call.type = 'sql';
          call.query = 'MOBILE.SP_CATALOG_OPCION';
          call.params = params.slice(0);
          calls.push(call);
        }
        if(reg.action == 'GUARDARUSUARIO'){
          params = [];
          params.push({
              name: 'ACTION',
              type: module.exports.dbsql.NVarChar,
              value: reg.action
          });
          params.push({
              name: 'IDUSUARIO',
              type: module.exports.dbsql.Int,
              value: reg.IDUSUARIO
          });

          params.push({
              name: 'USUARIO',
              type: module.exports.dbsql.NVarChar,
              value: reg.USUARIO
          });
          params.push({
              name: 'PASSWORD',
              type: module.exports.dbsql.NVarChar,
              value: reg.PASSWORD
          });
          params.push({
              name: 'NOMBRE',
              type: module.exports.dbsql.NVarChar,
              value: reg.NOMBRE
          });
          params.push({
              name: 'EMAIL',
              type: module.exports.dbsql.NVarChar,
              value: reg.EMAIL
          });
          params.push({
              name: 'TELEFONO',
              type: module.exports.dbsql.NVarChar,
              value: reg.TELEFONO
          });
          params.push({
              name: 'IMEI',
              type: module.exports.dbsql.NVarChar,
              value: reg.IMEI
          });
          params.push({
              name: 'TOKEN',
              type: module.exports.dbsql.NVarChar,
              value: reg.TOKEN
          });
          params.push({
              name: 'CODIGO',
              type: module.exports.dbsql.NVarChar,
              value: reg.CODIGO
          });
          params.push({
              name: 'REFERENCIA',
              type: module.exports.dbsql.NVarChar,
              value: reg.REFERENCIA
          });
          params.push({
              name: 'IDTIPO',
              type: module.exports.dbsql.Int,
              value: reg.IDTIPO
          });
          params.push({
              name: 'ACTIVO',
              type: module.exports.dbsql.Int,
              value: reg.ACTIVO
          });


          call = {};
          call.type = 'sql';
          call.query = 'MOBILE.SP_CATALOG_USUARIO';
          call.params = params.slice(0);
          calls.push(call);
        }

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
        }, null);
      }catch(e){
        console.log(e.stack);
        reply({
          code: -1,
          success: false,
          msg: e.stack,
          data: []
        });
      }
    }
  }
};
