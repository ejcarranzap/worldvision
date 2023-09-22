module.exports.rptCustom = {
    path: {
        method: 'GET',
        path: '/server/main/rptCustom',
        handler: function (request, reply) {
            /*var dbname = module.exports.functionTool.getDBName(request.headers);*/
            var res = request.query;
            var rptName = 'rpt_wv_bitacora';
            console.log(res);

            var opsys = process.platform;
            var tempFolder = (opsys == 'win32' || opsys == 'win64' ? 'C://Temp//' : '//tmp//');

            var exec = require('child_process').exec, child;
            var currentPath = process.cwd();
            const searchRegExp = /\\/g;
            const replaceWith = '//';

            currentPath = currentPath.replace(searchRegExp, replaceWith);

            console.log(currentPath);
            child = exec('java -jar ./JCReportTool_V3.jar "' + currentPath +
                '//..//rpts//MyReports//" "' +
                tempFolder +
                '" "' + (!res.rpt ? rptName : res.rpt) +
                '" "' + res.p +
                '" "pdf' +
                '" "" "\\\\JCReportTool_DEFAULT.json"',
                { cwd: currentPath + '//..//libs' },
                function (error, stdout, stderr) {
                    try {
                        child.kill();
                        //console.log('stdout: ' + stdout);
                        console.log('stderr: ' + stderr);
                        if (error !== null) {
                            console.log('exec error: ' + error);
                        }
                        const buf = Buffer.from(stdout, 'base64');
                        reply(buf).header('Content-Type', 'application/pdf').header('Cache-Control', 'no-cache');
                    } catch (e) {
                        child.kill();
                        reply({
                            code: -1,
                            success: false,
                            msg: e.stack,
                            data: []
                        }).header('Content-Type', 'text/plain').header('Cache-Control', 'no-cache');
                    }
                });
        }
    }
};