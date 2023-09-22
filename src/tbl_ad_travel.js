module.exports.tbl_ad_travel = {
    path: {
        method: 'POST',
        path: '/server/main/tbl_ad_travel',
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
                        name: 'Id_travel',
                        type: module.exports.dbsql.Int,
                        value: reg.Id_travel
                    });
                    params.push({
                        name: 'Id_vehicle',
                        type: module.exports.dbsql.Int,
                        value: reg.Id_vehicle
                    });
                    params.push({
                        name: 'start_date',
                        type: module.exports.dbsql.DateTime,
                        value: reg.start_date
                    });
                    params.push({
                        name: 'end_date',
                        type: module.exports.dbsql.DateTime,
                        value: reg.end_date
                    });
                    params.push({
                        name: 'source_address',
                        type: module.exports.dbsql.NVarChar,
                        value: reg.source_address
                    });
                    params.push({
                        name: 'destination_address',
                        type: module.exports.dbsql.NVarChar,
                        value: reg.destination_address
                    });
                    params.push({
                        name: 'mileage_start',
                        type: module.exports.dbsql.Numeric(19, 10),
                        value: reg.mileage_start
                    });
                    params.push({
                        name: 'mileage_end',
                        type: module.exports.dbsql.Numeric(19, 10),
                        value: reg.mileage_end
                    });
                    params.push({
                        name: 'driver',
                        type: module.exports.dbsql.NVarChar,
                        value: reg.driver
                    });
                    params.push({
                        name: 'comment',
                        type: module.exports.dbsql.NVarChar,
                        value: reg.comment
                    });
                    params.push({
                        name: 'Id_scheduling_state',
                        type: module.exports.dbsql.Int,
                        value: reg.Id_scheduling_state
                    });
                    params.push({
                        name: 'applicant_firstname',
                        type: module.exports.dbsql.NVarChar,
                        value: reg.applicant_firstname
                    });
                    params.push({
                        name: 'applicant_lastname',
                        type: module.exports.dbsql.NVarChar,
                        value: reg.applicant_lastname
                    });
                    params.push({
                        name: 'applicant_uid',
                        type: module.exports.dbsql.NVarChar,
                        value: reg.applicant_uid
                    });
                    params.push({
                        name: 'pilot_firstname',
                        type: module.exports.dbsql.NVarChar,
                        value: reg.pilot_firstname
                    });
                    params.push({
                        name: 'pilot_lastname',
                        type: module.exports.dbsql.NVarChar,
                        value: reg.pilot_lastname
                    });
                    params.push({
                        name: 'pilot_uid',
                        type: module.exports.dbsql.NVarChar,
                        value: reg.pilot_uid
                    });
                    params.push({
                        name: 'pilot_immediate_superior',
                        type: module.exports.dbsql.NVarChar,
                        value: reg.pilot_immediate_superior
                    });
                    params.push({
                        name: 'policy_exception',
                        type: module.exports.dbsql.Int,
                        value: reg.policy_exception
                    });
                    params.push({
                        name: 'date_mod',
                        type: module.exports.dbsql.DateTime,
                        value: reg.extra.date
                    });
                    params.push({
                        name: 'user_mod',
                        type: module.exports.dbsql.NVarChar,
                        value: reg.extra.user
                    });
                    params.push({
                        name: 'active',
                        type: module.exports.dbsql.Int,
                        value: reg.active
                    });
                    call = {};
                    call.type = 'sql';
                    call.query = 'sp_tbl_ad_travel_mod';
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
