module.exports.tbl_ad_segc_person = {
    path: {
        method: 'POST',
        path: '/server/main/tbl_ad_segc_person',
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
                        name: 'Id_person',
                        type: module.exports.dbsql.Int,
                        value: reg.Id_person
                    });
                    params.push({
                        name: 'Id_relation_type',
                        type: module.exports.dbsql.Int,
                        value: reg.Id_relation_type
                    });
                    params.push({
                        name: 'Id_job_vacancy',
                        type: module.exports.dbsql.Int,
                        value: reg.Id_job_vacancy
                    });
                    params.push({
                        name: 'Id_location',
                        type: module.exports.dbsql.Int,
                        value: reg.Id_location
                    });
                    params.push({
                        name: 'code',
                        type: module.exports.dbsql.NVarChar,
                        value: reg.code
                    });
                    params.push({
                        name: 'name',
                        type: module.exports.dbsql.NVarChar,
                        value: reg.name
                    });
                    params.push({
                        name: 'description',
                        type: module.exports.dbsql.NVarChar,
                        value: reg.description
                    });
                    params.push({
                        name: 'phone',
                        type: module.exports.dbsql.NVarChar,
                        value: reg.phone
                    });
                    params.push({
                        name: 'email',
                        type: module.exports.dbsql.NVarChar,
                        value: reg.email
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
                    call.query = 'sp_tbl_ad_segc_person';
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
