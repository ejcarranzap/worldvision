module.exports.validateautentication = {
    jwt: require('jwt-simple'),
    moment: require('moment'),
    config: require('./config/config.ini'),
    path: {
        method: 'POST',
        path: '/validateautentication',
        handler: (request, reply, next) => {
            module.exports.middleware.isAutenticated(request, reply, next)
        }
    }
};