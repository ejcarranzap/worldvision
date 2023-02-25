(function () {
  'use strict';
  var app = angular.module('itxwebApp');

  app.service('autenticationService', function ($http, $q, $cookieStore,
    $rootScope, $timeout, $location, $base64) {
    this.getCredential = function () {
      return $cookieStore.get('Credential');
    };
    this.setCredential = function (data) {
      $cookieStore.put('Credential', data);
    };
    this.clearCredential = function (data) {
      $cookieStore.remove('Credential');
    };
    this.autentication = function (user) {
      var deferred = $q.defer();
      var urlCalls = [];
      var urls = [];
      var errors = [];

      urls.push({
        url: '/server/main/login'
      });

      var dataObj = user;
      user.Usuario = user.username;
      user.Password = $base64.encode(user.password);
      angular.forEach(urls, function (url) {
        urlCalls.push($http.post(url.url, dataObj));
      });

      $rootScope.loading = true;
      $rootScope.errormsg = '';

      $q.all(urlCalls)
        .then(
          function (results) {
            $rootScope.loading = false;
            angular.forEach(results, function (itm) {
              if (itm.data.success == false) {
                errors.push(itm.data);
                $rootScope.errormsg = itm.data.msg;
              }
            });

            if (errors.length > 0) {
              $timeout(function () {
                angular.element('#btnShowModal').trigger('click');
              }, 0);
            }

            deferred.resolve(results[0].data);
          },
          function (errors) {
            $rootScope.loading = false;
            deferred.reject(errors);
          },
          function (updates) {
            $rootScope.loading = false;
            deferred.update(updates);
          });
      return deferred.promise;
    };
    this.validateautentication = function (user) {
      var deferred = $q.defer();
      var urlCalls = [];
      var urls = [];
      var errors = [];
      var credentials = (!this.getCredential() ? {} : this.getCredential());

      urls.push({
        url: '../validateautentication'
      });

      $http.defaults.headers.common['Authorization'] = 'Switch ' + credentials.token;

      var dataObj = credentials;
      angular.forEach(urls, function (url) {
        urlCalls.push($http.post(url.url, dataObj));
      });

      $rootScope.loading = true;
      $rootScope.errormsg = '';

      $q.all(urlCalls)
        .then(
          function (results) {
            $rootScope.loading = false;
            angular.forEach(results, function (itm) {
              if (itm.data.success == false) {
                errors.push(itm.data);
                $rootScope.errormsg = itm.data.msg;
              }
            });

            /*if(errors.length > 0){
              $timeout(function() {
                angular.element('#btnShowModal').trigger('click');
              },0);
            }*/

            deferred.resolve(results[0].data);
          },
          function (errors) {
            $rootScope.loading = false;
            deferred.reject(errors);
          },
          function (updates) {
            $rootScope.loading = false;
            deferred.update(updates);
          });
      return deferred.promise;
    };

    this.call = function (urls) {
      var deferred = $q.defer();
      var urlCalls = [];
      var errors = [];
      var credentials = (!this.getCredential() ? {} : this.getCredential());

      $http.defaults.headers.common['Authorization'] = 'Switch ' + credentials.token;
      $http.defaults.headers.common['Content-Type'] = 'application/json';

      var dataObj = credentials;
      angular.forEach(urls, function (url) {
        var req = {};
        var params = angular.copy(url.params, params);
        params.extra = {};

        if (credentials.data && url.action != 'S') {
          params.extra.username = credentials.data.recordset[0].name;
          params.extra.user = credentials.data.recordset[0].username;
          params.extra.date = moment().format('YYYY-MM-DD HH:mm:ss');
        }
        params.rawprm = credentials.data.recordset[0].username;

        params.action = url.action;
        if (url.type == 'formdata') {
          console.log('formdata call');
          var formData = new FormData();
          formData.append("data", angular.toJson(params));
          url.params.files = (!url.params.files ? [] : url.params.files);
          for (var i = 0; i < url.params.files.length; i++) {
            formData.append("file" + i, url.params.files[i].file);
          }

          req = {
            method: 'POST',
            url: url.url,
            headers: {
              'Authorization': 'Switch ' + credentials.token,
              'Content-Type': undefined,
            },
            data: formData
          };

          $http.defaults.headers.common['Authorization'] = 'Switch ' + credentials.token;
          $http.defaults.headers.common['Content-Type'] =  undefined;
          urlCalls.push($http(req));

        } else {

          urlCalls.push($http.post(url.url, params));
        }

      });

      $rootScope.loading = true;
      $rootScope.errormsg = '';

      $q.all(urlCalls)
        .then(
          function (results) {
            console.log('call results: ', results);
            $rootScope.loading = false;
            angular.forEach(results, function (itm) {
              /*console.log('call...');
              console.log(itm);*/
              if (itm.data.success == false) {
                errors.push(itm.data);
                $rootScope.errormsg = itm.data.msg;
              }
            });

            if (errors.length > 0) {
              /*console.log('has error...');*/
              $timeout(function () {
                angular.element('#btnShowModal').trigger('click');
              }, 0);
              deferred.reject(errors[0]);
            }

            deferred.resolve(results);
          },
          function (errors) {
            console.log(errors);
            $rootScope.loading = false;
            deferred.reject(errors);
          },
          function (updates) {
            console.log(updates);
            $rootScope.loading = false;
            deferred.update(updates);
          });
      return deferred.promise;
    };

    this.logout = function () {
      this.clearCredential();
      $location.path('/');
    };
  });

  app.service('dateService', function ($http, $q) {
    this.getLocalDate = function (d) {
      var copiedDate = d;
      var actualdate = new Date();
      var h = actualdate.getTimezoneOffset() / 60;

      copiedDate.setTime(d.getTime() - (h * 60 * 60 * 1000));
      return copiedDate;
    };
    var serializeJSON = function (prms) {
      angular.forEach(prms, function (value, key) {
        if (typeof prms[key] === 'object') {
          serializeJSON(prms[key]);
        } else {
          if (typeof prms[key] === 'string') {
            if (prms[key].indexOf('Date') != -1) {
              var actualdate = new Date();
              var date = new Date(parseInt(prms[key].replace("/Date(", "").replace(")/", ""), 10));
              var h = actualdate.getTimezoneOffset() / 60;
              date.setTime(date.getTime() - (h * 60 * 60 * 1000));
              if (date.getUTCFullYear() == 1970) {
                prms[key] = null;
              } else {
                prms[key] = date;
              }

            }
          }
        }
      });
      return prms;
    };

    this.serializeJSON = serializeJSON;


    var deserializeJSON = function (prms) {
      angular.forEach(prms, function (value, key) {

        if (prms[key])
          if (prms[key].toString().indexOf('GMT-0600') >= 0) {
            var copiedDate = angular.copy(prms[key], copiedDate);
            var h = copiedDate.getTimezoneOffset() / 60;
            prms[key].setTime(prms[key].getTime() - (h * 60 * 60 * 1000));
          }

        if (typeof prms[key] === 'object') {
          deserializeJSON(prms[key]);
        } else {
          if (prms[key])
            if (prms[key].toString().indexOf('GMT-0600') != -1) {
              var copiedDate = new Date();
              var h = copiedDate.getTimezoneOffset() / 60;
              prms[key].setTime(prms[key].getTime() - (h * 60 * 60 * 1000));
            }
        }
      });
      return prms;
    };

    this.deserializeJSON = deserializeJSON;
  });

  app.service('fileServicePHP', function ($rootScope, $http, $q, dateService) {
    this.call = function (urls) {
      var deferred = $q.defer();
      var urlCalls = [];
      var mime = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

      angular.forEach(urls, function (url) {
        var prms;
        var config = {};
        var iframe = null;

        if (url.type) mime = url.type;
        prms = angular.copy(url.param, prms);
        config = url.config;

        /*var req = {
          method: 'POST',
          url: url.url,
          headers: {
            "Accept":"application/json;charset=utf-8",
          },
          data: prms
        };*/

        urlCalls.push($http.post(url.url, prms, config));
        /*urlCalls.push($http(req));*/

      });

      $rootScope.loading = true;
      $rootScope.alerts = [];

      $q.all(urlCalls)
        .then(
          function (results) {
            var data = results[0].data;
            $rootScope.loading = false;

            var blob = null,
              blob_url = null;
            blob = new window.Blob([data], {
              type: mime
              //type: 'text/plain'
            });

            blob_url = window.URL.createObjectURL(blob);
            console.log(blob_url);

            deferred.resolve(blob_url);
          },
          function (errors) {
            $rootScope.loading = false;
            deferred.reject(errors);
            /*console.log(errors);*/
          },
          function (updates) {
            $rootScope.loading = false;
            deferred.update(updates);
            /*console.log(updates);*/
          });
      return deferred.promise;
    };
  });

}());
