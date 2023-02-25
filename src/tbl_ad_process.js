module.exports.tbl_ad_process = {
    fs: require('fs'),
    path: {
        method: 'POST',
        path: '/server/main/tbl_ad_process',
        config: {
            auth: false,
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data',
                maxBytes: 100485760
            },
            handler: function (request, reply) {
                try {
                    var pay = request.payload;
                    var params, detparams;
                    var calls = [],
                        detcalls = [];
                    var call = {},
                        detcall = {};
                    var reg = JSON.parse(pay.data);
                    reg.files = (reg.files || []);

                    /*detalle 1*/
                    /*console.log('data: ', reg);*/
                    if (reg.action != 'S' && reg.action != 'D' && reg.action != 'SD' && reg.Id_process) {
                        Object.keys(pay).forEach((key) => {
                            var record = reg.files.filter(x => { return(pay[key] === x.file); });
                            if(record.length == 0) record = {}; else record = record[0];

                            console.log('data key: ', key, pay[key]);
                            if (key.indexOf('file') != -1) {
                                var uploadPath = '.\\uploads\\' + reg.Id_process + '\\';
                                if (!module.exports.tbl_ad_process.fs.existsSync(uploadPath)) {
                                    module.exports.tbl_ad_process.fs.mkdirSync(uploadPath);
                                }

                                if(pay[key].hapi){
                                    console.log(key, pay[key].hapi.filename);
                                    var _file = pay[key];

                                    var name = _file.hapi.filename;
                                    var path = uploadPath + name;
                                    var file = module.exports.upload.fs.createWriteStream(path);
                                    _file.pipe(file);
                                }             
                                                                

                                detparams = [];

                                if(record.Id_process_file && record._del){
                                    module.exports.upload.fs.unlinkSync(record.file);

                                    detparams.push({
                                        name: 'ACTION',
                                        type: module.exports.dbsql.NVarChar,
                                        value: 'D'
                                    });
                                }else{
                                    detparams.push({
                                        name: 'ACTION',
                                        type: module.exports.dbsql.NVarChar,
                                        value: 'I'
                                    });
                                }                                
                                detparams.push({
                                    name: 'RAWPRM',
                                    type: module.exports.dbsql.NVarChar,
                                    value: reg.rawprm
                                });
                                detparams.push({
                                    name: 'Id_process_file',
                                    type: module.exports.dbsql.Int,
                                    value: (record.Id_process_file || reg.Id_process_file)
                                });
                                detparams.push({
                                    name: 'Id_process',
                                    type: module.exports.dbsql.Int,
                                    value: reg.Id_process
                                });
                                detparams.push({
                                    name: 'name',
                                    type: module.exports.dbsql.NVarChar,
                                    value: name
                                });
                                detparams.push({
                                    name: 'file',
                                    type: module.exports.dbsql.NVarChar,
                                    value: path
                                });
                                detparams.push({
                                    name: 'date_mod',
                                    type: module.exports.dbsql.DateTime,
                                    value: reg.extra.date
                                });
                                detparams.push({
                                    name: 'user_mod',
                                    type: module.exports.dbsql.NVarChar,
                                    value: reg.extra.user
                                });
                                detparams.push({
                                    name: 'active',
                                    type: module.exports.dbsql.Int,
                                    value: reg.active
                                });


                                detcall = {};
                                detcall.type = 'sql';
                                detcall.query = 'sp_tbl_ad_process_file';
                                detcall.params = detparams.slice(0);
                                detcall.paramsToReplace = ['Id_process'];
                                detcalls.push(detcall);
                            }
                        });

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
                            name: 'Id_step',
                            type: module.exports.dbsql.Int,
                            value: reg.Id_step
                        });
                        detparams.push({
                            name: 'Id_process',
                            type: module.exports.dbsql.Int,
                            value: reg.Id_process
                        });
                        detparams.push({
                            name: 'Id_activity',
                            type: module.exports.dbsql.Int,
                            value: reg.Id_activity
                        });
                        detparams.push({
                            name: 'Id_user',
                            type: module.exports.dbsql.Int,
                            value: reg.Id_user
                        });
                        detparams.push({
                            name: 'Id_location',
                            type: module.exports.dbsql.Int,
                            value: reg.Id_location
                        });
                        detparams.push({
                            name: 'comment',
                            type: module.exports.dbsql.NVarChar,
                            value: reg.comment
                        });
                        detparams.push({
                            name: 'date_mod',
                            type: module.exports.dbsql.DateTime,
                            value: reg.extra.date
                        });
                        detparams.push({
                            name: 'user_mod',
                            type: module.exports.dbsql.NVarChar,
                            value: reg.extra.user
                        });
                        detparams.push({
                            name: 'active',
                            type: module.exports.dbsql.Int,
                            value: reg.active
                        });

                        detparams.push({
                            name: 'sent_email',
                            type: module.exports.dbsql.Int,
                            value: reg.sent_email
                        });


                        detcall = {};
                        detcall.type = 'sql';
                        detcall.query = 'sp_tbl_ad_process_step';
                        detcall.params = detparams.slice(0);
                        detcall.paramsToReplace = ['Id_process'];
                        detcalls.push(detcall);
                    }
                    /*end detalle 1*/
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
                        name: 'Id_process',
                        type: module.exports.dbsql.Int,
                        value: reg.Id_process
                    });
                    params.push({
                        name: 'Id_activity_current',
                        type: module.exports.dbsql.Int,
                        value: reg.Id_activity_current
                    });
                    params.push({
                        name: 'title',
                        type: module.exports.dbsql.NVarChar,
                        value: reg.title
                    });
                    params.push({
                        name: 'target',
                        type: module.exports.dbsql.NVarChar,
                        value: reg.target
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
                        name: 'status',
                        type: module.exports.dbsql.Int,
                        value: reg.status
                    });
                    params.push({
                        name: 'Id_user',
                        type: module.exports.dbsql.Int,
                        value: reg.Id_user
                    });
                    params.push({
                        name: 'date_start',
                        type: module.exports.dbsql.DateTime,
                        value: reg.date_start
                    });
                    params.push({
                        name: 'date_end',
                        type: module.exports.dbsql.DateTime,
                        value: reg.date_end
                    });


                    call = {};
                    call.type = 'sql';
                    call.query = 'sp_tbl_ad_process';
                    call.params = params.slice(0);
                    call.deta = detcalls;
                    calls.push(call);
                    module.exports.mssqlcnSync.execute(request, reply, calls, function (err, recordsets) {
                        if (err) {
                            console.log(err);
                            reply({
                                code: err.code,
                                success: false,
                                msg: err.msg,
                                data: []
                            })
                        } else {
                            if (reg.action != 'S') {
                                reply({
                                    code: 0,
                                    success: true,
                                    msg: 'Operaci?n exitosa',
                                    data: recordsets[0].recordsets[0]
                                });
                            } else {
                                var docs = recordsets[0].recordsets[0];
                                var files = recordsets[0].recordsets[1];
                                var steps = recordsets[0].recordsets[2];

                                docs.forEach(document => {
                                    document.files = files.filter(x => { return parseInt(x.Id_process) === parseInt(document.Id_process) });
                                });

                                docs.forEach(document => {
                                    document.steps = steps.filter(x => { return parseInt(x.Id_process) === parseInt(document.Id_process) });
                                });

                                reply({
                                    code: 0,
                                    success: true,
                                    msg: 'Operaci?n exitosa',
                                    data: docs
                                });
                            }
                        }
                    },
                        'configLocal')
                } catch (e) {
                    console.log(e.stack);
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