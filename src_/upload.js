module.exports.upload = {
  fs: require('fs'),
  path: {
    method: 'POST',
    path: '/upload',
    config: {
      payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data'
      },
      handler: function(request, reply) {
        try {
          var data = request.payload;
          if (data.file) {
            console.log(data.file);

            var name = data.file.hapi.filename;
            var path = '.\\uploads\\' + name;
            var file = module.exports.upload.fs.createWriteStream(path);

            file.on('error', function(err) {
              console.error(err);
            });

            data.file.pipe(file);

            data.file.on('end', function(err) {
              var ret = {
                data: {
                  filename: data.file.hapi.filename,
                  headers: data.file.hapi.headers
                }
              };
              reply(ret);
            });
          }

        } catch (e) {
          reply({
            code: -1,
            msg: "Error: " + e.message,
            success: false,
            message: "Error: " + e.message
          });
        }
      }
    }
  }
};
