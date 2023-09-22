module.exports.ssl_route = {
    path: {
        method: 'GET',
        path: '/.well-known/acme-challenge/{id}',        
        config: {
            auth: false,
            handler: function(request, reply) {
                reply('V0jGxV5244cmQ3n2sjHWM3cAYRUCCoqjsq5w_jzdcEM.3IZOMa20WaRD0QgzyVPLMErlBGGU4YvH5kPBpfZFt7I');
            }    
        }
    }
};