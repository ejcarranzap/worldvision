module.exports.tbl_ad_segc_incident = {
    path: {
        method: 'POST',
        path: '/server/main/tbl_ad_segc_incident',
        config: {
            auth: false,
            handler: function (request, reply) {
                try {
                    var reg = request.payload;
                    var params, detparams;
                    var calls = [], detcalls = [];
                    var call = {}, detcall = {};
                    var row = {};
                    reg = (!reg ? {} : reg);
                    console.log(reg);

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
                        name: 'Id_incident',
                        type: module.exports.dbsql.Int,
                        value: reg.Id_incident
                    });
                    params.push({
                        name: 'Id_person_involved',
                        type: module.exports.dbsql.Int,
                        value: reg.Id_person_involved
                    });
                    params.push({
                        name: 'Id_person_reports',
                        type: module.exports.dbsql.Int,
                        value: reg.Id_person_reports
                    });
                    params.push({
                        name: 'Id_incident_type',
                        type: module.exports.dbsql.Int,
                        value: reg.Id_incident_type
                    });
                    params.push({
                        name: 'incident_date',
                        type: module.exports.dbsql.DateTime,
                        value: reg.incident_date
                    });
                    params.push({
                        name: 'incident_discovery_date',
                        type: module.exports.dbsql.DateTime,
                        value: reg.incident_discovery_date
                    });
                    params.push({
                        name: 'incident_reports_date',
                        type: module.exports.dbsql.DateTime,
                        value: reg.incident_reports_date
                    });
                    params.push({
                        name: 'incident_address',
                        type: module.exports.dbsql.NVarChar,
                        value: reg.incident_address
                    });
                    params.push({
                        name: 'is_authorities_notified',
                        type: module.exports.dbsql.Int,
                        value: reg.is_authorities_notified
                    });
                    params.push({
                        name: 'is_authorities_present',
                        type: module.exports.dbsql.Int,
                        value: reg.is_authorities_present
                    });
                    params.push({
                        name: 'is_involved_medical_test',
                        type: module.exports.dbsql.Int,
                        value: reg.is_involved_medical_test
                    });
                    params.push({
                        name: 'is_involved_hospitalized',
                        type: module.exports.dbsql.Int,
                        value: reg.is_involved_hospitalized
                    });
                    params.push({
                        name: 'is_involved_arrested',
                        type: module.exports.dbsql.Int,
                        value: reg.is_involved_arrested
                    });
                    params.push({
                        name: 'is_assets_arrested',
                        type: module.exports.dbsql.Int,
                        value: reg.is_assets_arrested
                    });
                    params.push({
                        name: 'is_complaint_necessary',
                        type: module.exports.dbsql.Int,
                        value: reg.is_complaint_necessary
                    });
                    params.push({
                        name: 'is_complaint_made',
                        type: module.exports.dbsql.Int,
                        value: reg.is_complaint_made
                    });
                    params.push({
                        name: 'is_ensuranse_assistance',
                        type: module.exports.dbsql.Int,
                        value: reg.is_ensuranse_assistance
                    });
                    params.push({
                        name: 'is_claim_documents',
                        type: module.exports.dbsql.Int,
                        value: reg.is_claim_documents
                    });
                    params.push({
                        name: 'reason',
                        type: module.exports.dbsql.NVarChar,
                        value: reg.reason
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

                    /*deta1 */
                    if(reg.deta1)
                    for(var i = 0; i < reg.deta1.length; i++){
                        row = reg.deta1[i];
                        detparams = [];
                        
                        detparams.push({
                            name: 'ACTION',
                            type: module.exports.dbsql.NVarChar,
                            value: 'I'
                        });
                        detparams.push({
                            name: 'RAWPRM',
                            type: module.exports.dbsql.NVarChar,
                            value: reg.rawprm
                        });
                        detparams.push({
                            name: 'Id_incident_children',
                            type: module.exports.dbsql.Int,
                            value: row.Id_incident_children
                        });
                        detparams.push({
                            name: 'Id_incident',
                            type: module.exports.dbsql.Int,
                            value: row.Id_incident
                        });
                        detparams.push({
                            name: 'Id_relation_type',
                            type: module.exports.dbsql.Int,
                            value: row.Id_relation_type
                        });
                        detparams.push({
                            name: 'Id_person',
                            type: module.exports.dbsql.Int,
                            value: row.Id_person
                        });
                        detparams.push({
                            name: 'incident_role',
                            type: module.exports.dbsql.NVarChar,
                            value: row.incident_role
                        });
                        detparams.push({
                            name: 'another_role',
                            type: module.exports.dbsql.NVarChar,
                            value: row.another_role
                        });
                        detparams.push({
                            name: 'other_relation',
                            type: module.exports.dbsql.NVarChar,
                            value: row.other_relation
                        });
                        detparams.push({
                            name: 'identification_id',
                            type: module.exports.dbsql.NVarChar,
                            value: row.identification_id
                        });
                        detparams.push({
                            name: 'name',
                            type: module.exports.dbsql.NVarChar,
                            value: row.name
                        });
                        detparams.push({
                            name: 'age',
                            type: module.exports.dbsql.Int,
                            value: row.age
                        });
                        detparams.push({
                            name: 'gender',
                            type: module.exports.dbsql.Int,
                            value: row.gender
                        });
                        detparams.push({
                            name: 'state',
                            type: module.exports.dbsql.NVarChar,
                            value: row.state
                        });
                        detparams.push({
                            name: 'other_state',
                            type: module.exports.dbsql.NVarChar,
                            value: row.other_state
                        });
                        detparams.push({
                            name: 'user_mod',
                            type: module.exports.dbsql.NVarChar,
                            value: reg.extra.user
                        });
                        detparams.push({
                            name: 'date_mod',
                            type: module.exports.dbsql.DateTime,
                            value: reg.extra.date
                        });
                        detparams.push({
                            name: 'active',
                            type: module.exports.dbsql.Int,
                            value: row.active
                        });

                        detcalls.push({
                            params: detparams.slice(0),
                            paramsToReplace: ['Id_incident'],
                            query: 'sp_tbl_ad_segc_incident_children',
                            state: 1
                        });
                    }
                    /*end deta1 */

                    /*deta2 */
                    if(reg.deta2)
                    for(var i = 0; i < reg.deta2.length; i++){
                        row = reg.deta2[i];
                        detparams = [];

                        detparams.push({
                            name: 'ACTION',
                            type: module.exports.dbsql.NVarChar,
                            value: 'I'
                        });
                        detparams.push({
                            name: 'RAWPRM',
                            type: module.exports.dbsql.NVarChar,
                            value: reg.rawprm
                        });
                        detparams.push({
                            name: 'Id_incident_person',
                            type: module.exports.dbsql.Int,
                            value: row.Id_incident_person
                        });
                        detparams.push({
                            name: 'Id_incident',
                            type: module.exports.dbsql.Int,
                            value: row.Id_incident
                        });
                        detparams.push({
                            name: 'Id_relation_type',
                            type: module.exports.dbsql.Int,
                            value: row.Id_relation_type
                        });
                        detparams.push({
                            name: 'Id_person',
                            type: module.exports.dbsql.Int,
                            value: row.Id_person
                        });
                        detparams.push({
                            name: 'incident_role',
                            type: module.exports.dbsql.NVarChar,
                            value: row.incident_role
                        });
                        detparams.push({
                            name: 'another_role',
                            type: module.exports.dbsql.NVarChar,
                            value: row.another_role
                        });
                        detparams.push({
                            name: 'other_relation',
                            type: module.exports.dbsql.NVarChar,
                            value: row.other_relation
                        });
                        detparams.push({
                            name: 'identification_id',
                            type: module.exports.dbsql.NVarChar,
                            value: row.identification_id
                        });
                        detparams.push({
                            name: 'name',
                            type: module.exports.dbsql.NVarChar,
                            value: row.name
                        });
                        detparams.push({
                            name: 'phone',
                            type: module.exports.dbsql.NVarChar,
                            value: row.phone
                        });
                        detparams.push({
                            name: 'email',
                            type: module.exports.dbsql.NVarChar,
                            value: row.email
                        });
                        detparams.push({
                            name: 'user_mod',
                            type: module.exports.dbsql.NVarChar,
                            value: reg.extra.user
                        });
                        detparams.push({
                            name: 'date_mod',
                            type: module.exports.dbsql.DateTime,
                            value: reg.extra.date
                        });
                        detparams.push({
                            name: 'active',
                            type: module.exports.dbsql.Int,
                            value: row.active
                        });

                        detcalls.push({
                            params: detparams.slice(0),
                            paramsToReplace: ['Id_incident'],
                            query: 'sp_tbl_ad_segc_incident_person',
                            state: 1
                        });
                    }                    
                    /*end deta2 */

                    /*deta3 */
                    if(reg.deta3)
                    for(var i = 0; i < reg.deta3.length; i++){
                        row = reg.deta3[i];
                        detparams = [];

                        detparams.push({
                            name: 'ACTION',
                            type: module.exports.dbsql.NVarChar,
                            value: 'I'
                        });
                        detparams.push({
                            name: 'RAWPRM',
                            type: module.exports.dbsql.NVarChar,
                            value: reg.rawprm
                        });
                        detparams.push({
                            name: 'Id_incident_asset',
                            type: module.exports.dbsql.Int,
                            value: row.Id_incident_asset
                        });
                        detparams.push({
                            name: 'Id_incident',
                            type: module.exports.dbsql.Int,
                            value: row.Id_incident
                        });
                        detparams.push({
                            name: 'Id_asset_type',
                            type: module.exports.dbsql.Int,
                            value: row.Id_asset_type
                        });
                        detparams.push({
                            name: 'other',
                            type: module.exports.dbsql.NVarChar,
                            value: row.other
                        });
                        detparams.push({
                            name: 'description',
                            type: module.exports.dbsql.NVarChar,
                            value: row.description
                        });
                        detparams.push({
                            name: 'brand',
                            type: module.exports.dbsql.NVarChar,
                            value: row.brand
                        });
                        detparams.push({
                            name: 'model',
                            type: module.exports.dbsql.NVarChar,
                            value: row.model
                        });
                        detparams.push({
                            name: 'asset_number',
                            type: module.exports.dbsql.NVarChar,
                            value: row.asset_number
                        });
                        detparams.push({
                            name: 'plate_number',
                            type: module.exports.dbsql.NVarChar,
                            value: row.plate_number
                        });
                        detparams.push({
                            name: 'state',
                            type: module.exports.dbsql.NVarChar,
                            value: row.state
                        });
                        detparams.push({
                            name: 'user_mod',
                            type: module.exports.dbsql.NVarChar,
                            value: reg.extra.user
                        });
                        detparams.push({
                            name: 'date_mod',
                            type: module.exports.dbsql.DateTime,
                            value: reg.extra.date
                        });
                        detparams.push({
                            name: 'active',
                            type: module.exports.dbsql.Int,
                            value: row.active
                        });

                        detcalls.push({
                            params: detparams.slice(0),
                            paramsToReplace: ['Id_incident'],
                            query: 'sp_tbl_ad_segc_incident_asset',
                            state: 1
                        });
                    }
                    /*end deta3 */

                    call = {};
                    call.type = 'sql';
                    call.query = 'sp_tbl_ad_segc_incident';
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
                            if(reg.action == 'S'){
                                var records = recordsets[0].recordsets[0];
                                var records_deta1 = recordsets[0].recordsets[1];
                                var records_deta2 = recordsets[0].recordsets[2];
                                var records_deta3 = recordsets[0].recordsets[3];

                                records.forEach(r => {
                                    r.deta1 = records_deta1.filter(d => { return (d.Id_incident == r.Id_incident) });
                                    r.deta2 = records_deta2.filter(d => { return (d.Id_incident == r.Id_incident) });
                                    r.deta3 = records_deta3.filter(d => { return (d.Id_incident == r.Id_incident) });
                                })

                                reply({
                                    code: 0,
                                    success: true,
                                    msg: 'Operación exitosa',
                                    data: records
                                });
                            }else{
                                reply({
                                    code: 0,
                                    success: true,
                                    msg: 'Operación exitosa',
                                    data: recordsets[0].recordsets[0]
                                });
                            }                            
                        }
                    }, 'configLocal')
                } catch(e) {
                    console.log(e.stack)
                }
            }
        },
    }
};
