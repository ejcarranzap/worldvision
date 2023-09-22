module.exports.tbl_ad_segc_incident_asset = {
    path: {
        method: 'POST',
        path: '/server/main/tbl_ad_segc_incident_asset',
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
                        name: 'Id_incident_asset',
                        type: module.exports.dbsql.Int,
                        value: reg.Id_incident_asset
                    });
                    params.push({
                        name: 'Id_asset_type',
                        type: module.exports.dbsql.Int,
                        value: reg.Id_asset_type
                    });
                    params.push({
                        name: 'other',
                        type: module.exports.dbsql.NVarChar,
                        value: reg.other
                    });
                    params.push({
                        name: 'description',
                        type: module.exports.dbsql.NVarChar,
                        value: reg.description
                    });
                    params.push({
                        name: 'brand',
                        type: module.exports.dbsql.NVarChar,
                        value: reg.brand
                    });
                    params.push({
                        name: 'model',
                        type: module.exports.dbsql.NVarChar,
                        value: reg.model
                    });
                    params.push({
                        name: 'asset_number',
                        type: module.exports.dbsql.NVarChar,
                        value: reg.asset_number
                    });
                    params.push({
                        name: 'plate_number',
                        type: module.exports.dbsql.NVarChar,
                        value: reg.plate_number
                    });
                    params.push({
                        name: 'state',
                        type: module.exports.dbsql.NVarChar,
                        value: reg.state
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
                    call.query = 'sp_tbl_ad_segc_incident_asset';
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
