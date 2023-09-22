module.exports.tbl_ad_location = {
    path: {
        method: 'POST',
        path: '/server/main/tbl_ad_location',
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
                        name: 'Id_location',
                        type: module.exports.dbsql.Int,
                        value: reg.Id_location
                    });
                    params.push({
                        name: 'Id_location_parent',
                        type: module.exports.dbsql.Int,
                        value: reg.Id_location_parent
                    });
                    params.push({
                        name: 'Id_location_type',
                        type: module.exports.dbsql.Int,
                        value: reg.Id_location_type
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
                        name: 'address',
                        type: module.exports.dbsql.NVarChar(500),
                        value: reg.address
                    });
                    params.push({
                        name: 'lat',
                        type: module.exports.dbsql.Numeric(19, 10),
                        value: reg.lat
                    });
                    params.push({
                        name: 'lon',
                        type: module.exports.dbsql.Numeric(19, 10),
                        value: reg.lon
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
                    call = {};
                    call.type = 'sql';
                    call.query = 'sp_tbl_ad_location';
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