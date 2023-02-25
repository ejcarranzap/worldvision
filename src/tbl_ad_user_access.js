module.exports.tbl_ad_user_access = {
    path: {
        method: 'POST',
        path: '/server/main/tbl_ad_user_access',
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
                    if (reg.action == 'IX') {
                        for (var i = 0; i < reg.data.length; i++) {
                            var myreg = reg.data[i];
                            params = [];
                            params.push({
                                name: 'ACTION',
                                type: module.exports.dbsql.NVarChar,
                                value: 'I'
                            });
                            params.push({
                                name: 'RAWPRM',
                                type: module.exports.dbsql.NVarChar,
                                value: myreg.rawprm
                            });
                            params.push({
                                name: 'Id_user_access',
                                type: module.exports.dbsql.Int,
                                value: myreg.Id_user_access
                            });
                            params.push({
                                name: 'Id_location',
                                type: module.exports.dbsql.Int,
                                value: myreg.Id_location
                            });
                            params.push({
                                name: 'Id_user',
                                type: module.exports.dbsql.Int,
                                value: myreg.Id_user
                            });
                            params.push({
                                name: 'user_mod',
                                type: module.exports.dbsql.NVarChar(20),
                                value: reg.extra.user
                            });
                            params.push({
                                name: 'date_mod',
                                type: module.exports.dbsql.DateTime,
                                value: reg.extra.date
                            });
                            params.push({
                                name: 'active',
                                type: module.exports.dbsql.Int,
                                value: myreg.active
                            });
                            call = {};
                            call.type = 'sql';
                            call.query = 'sp_tbl_ad_user_access_mod';
                            call.params = params.slice(0);
                            call.deta = detcalls;
                            calls.push(call)
                        }
                    } else {
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
                            name: 'Id_user_access',
                            type: module.exports.dbsql.Int,
                            value: reg.Id_user_access
                        });
                        params.push({
                            name: 'Id_location',
                            type: module.exports.dbsql.Int,
                            value: reg.Id_location
                        });
                        params.push({
                            name: 'Id_user',
                            type: module.exports.dbsql.Int,
                            value: reg.Id_user
                        });
                        params.push({
                            name: 'user_mod',
                            type: module.exports.dbsql.NVarChar(20),
                            value: reg.extra.user
                        });
                        params.push({
                            name: 'date_mod',
                            type: module.exports.dbsql.DateTime,
                            value: reg.extra.date
                        });
                        params.push({
                            name: 'active',
                            type: module.exports.dbsql.Int,
                            value: reg.active
                        });
                        call = {};
                        call.type = 'sql';
                        call.query = 'sp_tbl_ad_user_access_mod';
                        call.params = params.slice(0);
                        call.deta = detcalls;
                        calls.push(call)
                    }
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