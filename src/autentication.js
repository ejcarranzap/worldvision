module.exports.autentication = {
    jwt: require('jwt-simple'),
    moment: require('moment'),
    getToken: function(user) {
        var payload = {
            sub: user.id,
            iat: module.exports.autentication.moment().unix(),
            exp: module.exports.autentication.moment().add(14, "days").unix(),

        };
        return module.exports.autentication.jwt.encode(payload, module.exports.autentication.config.config.TOKEN_SECRET)
    },
    config: require('./config/config.ini'),
    path: {
        method: 'POST',
        path: '/autentication',
        handler: (request, reply) => {
            try {
                var users = [{
                    id: 1,
                    username: 'jon',
                    password: 'car'
                }];
                var token = '';
                if (users[0].username == request.payload.username && users[0].password == request.payload.password) {
                    token = module.exports.autentication.getToken(users[0]);
                    request.auth.credentials = users[0];
                    request.auth.isAutenticated = true;
                    reply({
                        token: token,
                        username: request.payload.username,
                        success: true,
                        msg: 'Autenticated...',
                        code: '0'
                    })
                } else {
                    request.auth.credentials = null;
                    request.auth.isAutenticated = false;
                    reply({
                        token: null,
                        success: false,
                        msg: 'Not autenticated...',
                        code: '999'
                    })
                }
            } catch(e) {
                console.log(e.stack);
                reply({
                    token: token,
                    success: true,
                    msg: 'Error de autenticaci?n ' + e.stack,
                    code : '999'
                })
            }
        }
    }
};