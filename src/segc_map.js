module.exports.segc_map = {
    path: {
        method: 'POST',
        path: '/server/main/segc_map',
        config: {
            auth: false,
            handler: function(request, reply) {
                try {
                    var reg = request.payload;
                    var params, detparams;
                    var calls = [],
                    detcalls = [];
                    var call = {},
                    detcall = {};
                    reg = (!reg ? {} : reg);
                    console.log(reg);

                    params = [];
                    params.push({
                        name: 'ACTION',
                        type: module.exports.dbsql.NVarChar,
                        value: reg.action
                    });
                    
                    params.push({
                        name: 'FECHAINICIO',
                        type: module.exports.dbsql.DateTime,
                        value: reg.FECHAINICIO
                    });
                    params.push({
                        name: 'FECHAFIN',
                        type: module.exports.dbsql.DateTime,
                        value: reg.FECHAFIN
                    });
                    params.push({
                        name: 'USER',
                        type: module.exports.dbsql.NVarChar(20),
                        value: reg.USER
                    });
                    
                    call = {};
                    call.type = 'sql';
                    call.query = 'sp_rpt_tool_map';
                    call.params = params.slice(0);
                    call.deta = detcalls;
                    calls.push(call);
                    module.exports.mssqlcnSync.execute(request, reply, calls, function(err, recordsets) {
                        if (err) {
                            console.log(err);
                            reply({
                                code: err.code,
                                success: false,
                                msg: err.msg,
                                data: []
                            })
                        } else {
                            reply({
                                code: 0,
                                success: true,
                                msg: 'Operaci?n exitosa',
                                data : recordsets[0].recordsets[0]
                            })
                        }
                    },
                    'configLocal')
                } catch(e) {
                    console.log(e.message);
                    reply({
                        code: -1,
                        msg: e.message,
                        success: false
                    })
                }
            }
        }
    }
};