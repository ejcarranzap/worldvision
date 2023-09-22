module.exports.middleware = {
    isAutenticated: function(request, reply, next) {
        try {
            console.log('AUTH HEADER');
            console.log(request.headers.authorization);
            if (request.headers.authorization == 'Basic') {
                return reply({
                    success: false,
                    msg: 'Invalid basic autentication',
                    code: "403"
                })
            }
            if (!request.headers.authorization) {
                return reply({
                    success: false,
                    msg: 'Invalid token, could not find header',
                    code: "403"
                })
            }
            if (request.headers.authorization.length < 100) {
                return reply({
                    success: false,
                    msg: 'Invalid token length',
                    code: "403"
                })
            }
            var token = request.headers.authorization.split(" ")
            [1];
            var payload = module.exports.validateautentication.jwt.decode(token, module.exports.validateautentication.config.config.TOKEN_SECRET);
            if (payload.exp <= module.exports.validateautentication.moment().unix()) {
                return reply({
                    success: false,
                    msg: 'Invalid token',
                    code: "401"
                })
            }
            return reply(request.payload)
        } catch(e) {
            console.log(e.stack);
            return reply({
                success: false,
                msg: 'Invalid token ' + e.stack + ' you need to login.',
                code: "403"
            })
        }
    }
};