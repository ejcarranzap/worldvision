module.exports.tbl_ad_segc_geo_location_alert = {
    path: {
        method: 'POST',
        path: '/server/main/tbl_ad_segc_geo_location_alert',
        config: {
            auth: false,
            handler: function (request, reply) {
                try {
                    var reg = request.payload;
                    var params, detparams;
                    var calls = [], detcalls = [];
                    var call = {}, detcall = {};
                    reg = (!reg ? {} : reg);

                    console.log('tbl_ad_segc_geo_location_alert',reg);
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
                        name: 'Id_geo_location_alert',
                        type: module.exports.dbsql.Int,
                        value: reg.Id_geo_location_alert
                    });
                    params.push({
                        name: 'Id_alert_type',
                        type: module.exports.dbsql.Int,
                        value: reg.Id_alert_type
                    });
                    params.push({
                        name: 'latitude',
                        type: module.exports.dbsql.Numeric(19, 10),
                        value: reg.latitude
                    });
                    params.push({
                        name: 'longitude',
                        type: module.exports.dbsql.Numeric(19, 10),
                        value: reg.longitude
                    });
                    params.push({
                        name: 'description',
                        type: module.exports.dbsql.NVarChar,
                        value: reg.description
                    });
                    params.push({
                        name: 'user_mod',
                        type: module.exports.dbsql.NVarChar,
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
                    call.query = 'sp_tbl_ad_segc_geo_location_alert';
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
                        } else {
                            reply({
                                code: 0,
                                success: true,
                                msg: 'Operación exitosa',
                                data: recordsets[0].recordsets[0]
                            });
                        }
                    }, 'configLocal')
                } catch(e) {
                }
            }
        },
    }
};
