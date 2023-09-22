module.exports.route = {
  type: function() {
    return 'multiple'
  },
  routes: function() {
    return [{
      method: 'GET',
      path: '/app/{file*}',
      handler: {
        directory: {
          path: './site/app/',
          listing: false
        }
      }
    }, {
      method: 'GET',
      path: '/site/pages/{file*}',
      handler: {
        directory: {
          path: './site/adminlte/pages/',
          listing: false
        }
      }
    }, {
      method: 'GET',
      path: '/site/plugins/{file*}',
      handler: {
        directory: {
          path: './site/adminlte/plugins/',
          listing: false
        }
      }
    }, {
      method: 'GET',
      path: '/site/dist/{file*}',
      handler: {
        directory: {
          path: './site/adminlte/dist/',
          listing: false
        }
      }
    }, {
      method: 'GET',
      path: '/site/bower_components/{file*}',
      handler: {
        directory: {
          path: './site/adminlte/bower_components/',
          listing: false
        }
      }
    }, {
      method: 'GET',
      path: '/site/{file*}',
      handler: {
        directory: {
          path: './site/',
          listing: false
        }
      }
    }, {
      method: 'GET',
      path: '/uploads/{file*}',
      handler: {
        directory: {
          path: './uploads/',
          listing: false
        }
      }
    }, {
      method: 'GET',
      path: '/images/{file*}',
      handler: {
        directory: {
          path: './site/images/',
          listing: false
        }
      }
    }, {
      method: 'GET',
      path: '/home',
      config: {
        auth: false,
        handler: function(req, reply) {
          reply('Hola Mundo...');
        }
      }
    }, {
      method: 'POST',
      path: '/Bo_test',
      config: {
        auth: false,
        handler: function(req, reply) {
          console.log(req.payload);
          reply('Hola ' + req.payload.loginuser + ' desde servidor...');
        }
      }
    }]
  }
};
