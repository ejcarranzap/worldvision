module.exports.mssqlcnSync = {
    request: function(trx, call, paramsToReplace, parent, callback) {
        try {
            var params = call.params;
            var request = new module.exports.dbsql.Request(trx);
            for (var i = 0; i < params.length; i++) {
                var value = params[i].value;
                if (paramsToReplace) {
                    if (paramsToReplace.indexOf(params[i].name) != -1) {
                        console.log('paramsToReplace');
                        console.log(parent);
                        value = parent[params[i].name]
                    }
                }
                if (params[i].type == module.exports.dbsql.DateTime) {
                    request.input(params[i].name, module.exports.dbsql.NVarChar, value)
                } else {
                    request.input(params[i].name, params[i].type, value)
                }
            }
            request.execute(call.query).then(function(recordsets) {
                console.log('REQUEST OK WORLDVISION');
                callback(null, recordsets)
            }).
            catch(function(err) {
                callback(null, {
                    success: false,
                    msg: '' + err,
                    originalError: err,
                    code: 'ERRREQ'
                })
            })
        } catch(e) {
            console.log(e.stack);
            callback(null, {
                success: false,
                msg: 'Error al realizar la peticion...',
                code: 'ERRREQ'
            })
        }
    },
    execute: function(request, reply, calls, callback, config) {
        try {
            var data = request.query;
            var results = [];
            var cn;
            if (!config) {
                cn = new module.exports.dbsql.ConnectionPool(module.exports.dbconfig)
            } else
            if (config == 'cnBofasaCentral') {
                cn = new module.exports.dbsql.ConnectionPool(module.exports.dbconfigBofasa)
            } else
            if (config == 'configLocal') {
                cn = new module.exports.dbsql.ConnectionPool(module.exports.configLocal)
            }
            cn.connect().then(function() {
                var trx = new module.exports.dbsql.Transaction(cn);
                trx.begin(require('tedious').ISOLATION_LEVEL, function(err) {
                    console.log('BEGIN TRANSACTION');
                    var rolledBack = false;
                    var existsErr = false;
                    var myErr = {};
                    var validateError = function(pmyresults) {
                        var isOk = true;
                        for (var k = 0; k < pmyresults.length; k++) {
                            if (pmyresults[k].code != null && pmyresults[k].code != '0' && pmyresults[k].code != 480) {
                                isOk = false
                            }
                        }
                        return isOk
                    };
                    module.exports.mssqlcnSync.request = module.exports.sync(module.exports.mssqlcnSync.request);
                    module.exports.sync.fiber(function() {
                        trx.on('rollback', function(aborted) {
                            rolledBack = true
                        });
                        for (var i = 0; i < calls.length; i++) {
                            var call = calls[i];
                            console.log('QUERY: ' + call.query);
                            results.push(module.exports.mssqlcnSync.request(trx, call, null, null));
                            if (validateError(results) != false) {
                                if (call.deta) {
                                    for (var ii = 0; ii < call.deta.length; ii++) {
                                        var calld = call.deta[ii];
                                        var parent = null;
                                        if (results) if (results[0]) if (results[0].recordsets) if (results[0].recordsets[0]) if (results[0].recordsets[0].length > 0) {
                                            parent = results[0].recordsets[0][0]
                                        }
                                        console.log(calld.query);
                                        results.push(module.exports.mssqlcnSync.request(trx, calld, calld.paramsToReplace, parent))
                                    }
                                }
                            }
                            if (validateError(results) == false) {
                                i = calls.length
                            }
                        }
                        for (var k = 0; k < results.length; k++) {
                            if (results[k].code != null && results[k].code != '0' && results[k].code != 480) {
                                existsErr = true;
                                myErr = results[k]
                            }
                        }
                        if (existsErr == true) {
                            trx.rollback().then(function() {
                                console.log("ROLLBACK");
                                cn.close();
                                callback(myErr, null)
                            })
                        } else {
                            trx.commit().then(function() {
                                console.log("COMMIT");
                                cn.close();
                                callback(null, results)
                            })
                        }
                    })
                })
            })
        } catch(e) {
            console.log(e.stack);
            callback({
                success: false,
                msg: e.message,
                code: 'TRYERR'
            },
            null)
        }
    }
};