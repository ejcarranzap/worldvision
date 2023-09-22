module.exports.login = {
    path: {
        method: 'POST',
        path: '/server/main/login',
        config: {
            auth: false,
            handler: function(request, reply) {
                try {
                    var reg = request.payload;
                    var registros, errores, rsdata = [];
                    var b = new Buffer(reg.Password, 'base64');
                    var s = b.toString();
                    reg.Password = s;
                    console.log(reg);
                    var params;
                    var calls = [];
                    var call = {};
                    params = [];
                    params.push({
                        name: 'ACTION',
                        type: module.exports.dbsql.NVarChar(30),
                        value: 'S'
                    });
                    params.push({
                        name: 'IDUSUARIO',
                        type: module.exports.dbsql.Int,
                        value: 0
                    });
                    params.push({
                        name: 'USUARIO',
                        type: module.exports.dbsql.NVarChar(20),
                        value: reg.Usuario
                    });
                    params.push({
                        name: 'PASSWORD',
                        type: module.exports.dbsql.NVarChar(255),
                        value: reg.Password
                    });
                    params.push({
                        name: 'RUTA',
                        type: module.exports.dbsql.NVarChar(20),
                        value: reg.Ruta
                    });
                    params.push({
                        name: 'requestPassword',
                        type: module.exports.dbsql.NVarChar(255),
                        value: reg.requestPassword
                    });
                    call = {};
                    call.type = 'sql';
                    call.query = 'sp_login';
                    call.params = params.splice(0);
                    calls.push(call);
                    module.exports.mssqlcnSync.execute(request, reply, calls, function(err, recordsets) {
                        try {
                            if (err) {
                                console.log(err);
                                reply(err)
                            } else {
                                if (recordsets.length > 0) {
                                    console.log('login worldvision...');
                                    console.log(recordsets[0].recordset[0]);
                                    var userdata = recordsets[0].recordset[0];
                                    userdata.id = userdata.Id_user;
                                    var token = module.exports.autentication.getToken(userdata);
                                    var nombreusuario = userdata.name;
                                    var idtipousuario = userdata.Id_user_type;
                                    var tipousuario = userdata.user_type;
                                    var idusuario = userdata.Id_user;
                                    var requestPassword = userdata.requestPassword;
                                    var email = userdata.email;
                                    var username = userdata.username;
                                    reply({
                                        token: token,
                                        nombreusuario: nombreusuario,
                                        idtipousuario: idtipousuario,
                                        tipousuario: tipousuario,
                                        idusuario: idusuario,
                                        email: email,
                                        username: username,
                                        requestPassword: requestPassword,
                                        code: 0,
                                        success: true,
                                        msg: 'Operaci?n exitosa.',
                                        data : recordsets[0]
                                    })
                                } else {
                                    reply({
                                        code: -1,
                                        success: false,
                                        msg: 'Error usuario/password invalido.'
                                    })
                                }
                            }
                        } catch(e) {
                            reply({
                                code: -1,
                                success: false,
                                msg: e.message
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