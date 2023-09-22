module.exports.tool = {
    path: {
        method: 'POST',
        path: '/server/main/tool',
        handler: function (request, reply) {
            try {
                var reg = request.payload;
                var params, detparams;
                var calls = [], detcalls = [];
                var call = {}, detcall = {};

                reg = (!reg ? {} : reg);
                /*console.log(reg);*/

                params = [];
                params.push({
                    name: 'ACTION',
                    type: module.exports.dbsql.NVarChar,
                    value: reg.action
                });
                params.push({
                    name: 'Id_location',
                    type: module.exports.dbsql.Int,
                    value: reg.Id_location
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
                    name: 'RAWPRM',
                    type: module.exports.dbsql.NVarChar,
                    value: reg.rawprm
                });

                call = {};
                call.type = 'sql';
                call.query = 'sp_rpt_tool';
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
                        });
                    } else {
                        /*console.log(recordsets[0].recordsets[0]);*/
                        reply({
                            code: 0,
                            success: true,
                            msg: 'Operación exitosa',
                            data: recordsets[0].recordsets[0]
                        });
                    }
                }, 'configLocal');
            } catch (e) {
                console.log(e.stack);
                reply({
                    code: -1,
                    success: false,
                    msg: e.stack,
                    data: []
                }, 'configLocal');
            }
        }
    }
};
