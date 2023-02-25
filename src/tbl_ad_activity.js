module.exports.tbl_ad_activity = {
    path: {
        method: 'POST',
        path: '/server/main/tbl_ad_activity',
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
                        name: 'Id_activity',
                        type: module.exports.dbsql.Int,
                        value: reg.Id_activity
                    });
                    params.push({
                        name: 'Id_activity_parent',
                        type: module.exports.dbsql.Int,
                        value: reg.Id_activity_parent
                    });
                    params.push({
                        name: 'Id_process_type',
                        type: module.exports.dbsql.Int,
                        value: reg.Id_process_type
                    });
                    params.push({
                        name: 'code',
                        type: module.exports.dbsql.NVarChar(20),
                        value: reg.code
                    });
                    params.push({
                        name: 'name',
                        type: module.exports.dbsql.NVarChar(50),
                        value: reg.name
                    });
                    params.push({
                        name: 'description',
                        type: module.exports.dbsql.NVarChar(255),
                        value: reg.description
                    }); 
                    params.push({
                        name: 'estimated_time',
                        type: module.exports.dbsql.Int,
                        value: reg.estimated_time
                    });
                    params.push({
                        name: 'order',
                        type: module.exports.dbsql.Int,
                        value: reg.order
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
                        name: 'is_end',
                        type: module.exports.dbsql.Int,
                        value: reg.is_end
                    });
                    call = {};
                    call.type = 'sql';
                    call.query = 'sp_tbl_ad_activity';
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