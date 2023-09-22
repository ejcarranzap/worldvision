'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server({ connections: { routes: { timeout: { server: 500000 * 9, socket: 500000 * 10 } }, state: { strictHeader: false } } });
const Inert = require('inert');
const Cookie = require('hapi-auth-cookie');
const glob = require('glob');
const Boom = require('boom');
const path = require('path');
const fs = require('fs'),
  str2js = require('string-to-js'),
  read = fs.readFileSync;
const vm = require('vm');

var __dirname = '.\\dll\\';
/*var edge = require('edge');

var decryFunction = edge.func({
  assemblyFile: (__dirname + 'SourceCodeEncryption.dll'),
  typeName: 'Encryption',
  methodName: 'Decrypt',
  sync: true
});*/

const sandbox = vm.createContext({
  console: console,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  require: require,
  module: module,
  exports: exports,
  process: process,
  Buffer: Buffer
});
/*mssql*/
//const sql = require('mssql/msnodesqlv8');
const sql = require('mssql');

const configLocal = {
  //user: 'sa',
  //password: 'V1s10n2018*',
  //server: 'GTMOFLLETMGMT',
  //database: 'WORLDVISION',
  user: 'sa',
  password: 'Sopmac08%',
  server: 'sqlexpress',
  database: 'WORLDVISION',
  //port: 4445,
  //port: 50843,
  packetSize: 32767,
  connectionTimeout: 300000,
  requestTimeout: 300000,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 300000
  },
  options: {
    encrypt: false, // Use this if you're on Windows Azure
    trustedConnection: true,
    useUTC: true
    //,instanceName: 'SQLEXPRESS'
  }
};
//const pool = sql.connect(config);
//module.exports.dbpool = pool;
module.exports.configLocal = configLocal;
module.exports.dbsql = sql;

const sync = require('synchronize')
module.exports.sync = sync;
/*end mssql*/
/*postgresql*/
/*const connectionString = 'postgres://postgres:sopmac08$$@192.168.8.131:5432/TIMESHEETDB';
const pgPromise = require('pg-promise');
const pgp = pgPromise({});
const QueryResultError = pgp.errors.QueryResultError;
const qrec = pgp.errors.queryResultErrorCode;
const db = pgp(connectionString);
const TransactionMode = pgp.txMode.TransactionMode;
const isolationLevel = pgp.txMode.isolationLevel;
const tmSRD = new TransactionMode({
  tiLevel: isolationLevel.serializable,
  readOnly: false,
  deferrable: true
});

module.exports.db = db;*/
/*end postgresql*/

var options = {
  /*host: '0.0.0.0',*/
  port: 3082,
  router: {
    stripTrailingSlash: true
  },
  routes: {
    cors: true
  }
};

server.connection(options);


/*server.connection({
  port: 3081,
  router: {
    stripTrailingSlash: true
  },
  routes: {
    cors: true
  }
});*/

server.ext('onPreResponse', function (request, reply) {
  //corsHeaders(request, reply);
  var response = request.response;  
  /*console.log(response.headers);

  if (response.variety === 'file') {
    var path = request.params.path;
    var route = request.route;
    response.header('X-Frame-Options', 'SAMEORIGIN');
  }*/

  if (request.response.isBoom) {
    const err = request.response;
    const errMsg = err.originalError;
    const errCode = err.code;
    const statusCode = err.output.payload.statusCode;
    console.log('ERROR ONPRERESPONSE');
    console.log(err);
    return reply({
      code: errCode,
      msg: errMsg,
      success: false,
      data: []
    })
      .code(statusCode);
  }

  reply.continue();
});

server.register(require('hapi-auth-jwt'), (err) => {

  glob.sync('config/*.ini', {
    root: __dirname
  }).forEach(file => {
    console.log('loading *.ini');
    let res = read(file, 'utf8');
    let dir = './mymodulesx/' + path.basename(file);
    vm.runInNewContext(res, sandbox, dir);
    //const route = require(path.join(__dirname, file));
  });

  server.auth.strategy('jwt', 'jwt', {
    key: sandbox.module.exports.config.TOKEN_SECRET,
    verifyOptions: {
      algorithms: ['HS256']
    }
  });

  /*EJCP 20220316*//*glob.sync('mymodulesenc/*.jse', {*//*EJCP 20220316*/
  glob.sync('src/*.js', {/*EJCP 20220316*/
    root: __dirname
  }).forEach(file => {
    /*EJCP 20220316*//*decryFunction({
      message: read(file, 'utf8'),
      password: 'epsilon8'
    }, function(err, res) {*//*EJCP 20220316*/

    //const route = require(path.join(__dirname, file));
    //let res = read(file, 'utf8');
    //console.log(res);
    var res = fs.readFileSync(file, "utf8");/*EJCP 20220316*/
    let basename = path.basename(file);
    /*let name = path.basename(file, '.jse');*//*EJCP 20220316*/
    let name = path.basename(file, '.js');/*EJCP 20220316*/
    let dir = './mymodulesx/' + basename;

    console.log('loading ' + dir);

    vm.runInNewContext(res, sandbox, dir);
    /*switch (name) {
      case 'route':
        sandbox.module.exports.route.routes().forEach(mroute => {
          server.route(mroute);
        });
        break;
      default:
        if (name != 'pgcnsync' && name != 'mssqlcnSync'
        && name != 'middleware' && name != 'modelernodejs'
        && name != 'modelercore' && name != 'modelerdatabase'
        && name != 'modelertemplate' && name != 'modelercontroller'
        && name != 'modelerjava' && name != 'modelerjavadb'
        && name != 'modelerjavadbhelper')
          server.route(sandbox.module.exports[name].path);
        break;
    };*/
    switch (name) {
      case 'route':
        sandbox.module.exports.route.routes().forEach(mroute => {
          server.route(mroute);
        });
        break;
      default:
        if (name != 'pgcnsync' && name != 'mssqlcnSync'
          && name != 'middleware' && name != 'modelernodejs'
          && name != 'modelercore' && name != 'modelerdatabase'
          && name != 'modelertemplate' && name != 'modelercontroller'
          && name != 'modelerjava' && name != 'modelerjavadb'
          && name != 'modelerjavadbhelper')
          server.route(sandbox.module.exports[name].path);
        break;
    };
    /*EJCP 20220316*//*});*//*EJCP 20220316*/

    /*if (route.path != null && route.type != 'multiple') {
      server.route(route);
    }
    if (route.type == 'multiple') {
      route.routes.forEach(mroute => {
        server.route(mroute);
      });
    }*/
  });

  if (err)
    console.log("Error: " + err);
});

server.register(Inert, function (err) {
  if (err)
    console.log("Error: " + err);
});

server.register(Cookie, function (err) {
  server.start(function (err) {
    if (err) {
      console.log('Error: ' + err.message);
    }

    console.log('ITXWEB server running at: ', server.info);
  });
});
