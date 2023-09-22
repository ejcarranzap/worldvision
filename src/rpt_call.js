module.exports.rpt_call = {
    path: {
        method: 'GET',
        path: '/server/main/rpt_call',
        handler: function (request, reply) {
            /*var dbname = module.exports.functionTool.getDBName(request.headers);*/
            var res = request.query;
            var rptName = '';
            res.p = res.p.split('"').join('\'')
            console.log(res);

            var contentType = 'application/pdf';

            if(res.exportType == 'xls'){
                contentType = 'application/vnd.ms-excel';
            }else if(res.exportType == 'doc'){
                contentType = 'application/msword';
            }

            var opsys = process.platform;
            var tempFolder = (opsys == 'win32' || opsys == 'win64' ? 'C://Temp//' : '//tmp//');

            var exec = require('child_process').exec, child;
            var currentPath = process.cwd();
            const searchRegExp = /\\/g;
            const replaceWith = '//';

            currentPath = currentPath.replace(searchRegExp, replaceWith);

            console.log(currentPath);
            child = exec('java -Dapple.awt.UIElement="true" -jar ./JCReportTool_V3.jar "' + currentPath +
                '//..//rpts//MyReports//" "' +
                tempFolder +
                '" "' + (!res.rpt ? rptName : res.rpt) +
                '" "' + res.p +
                '" "' + (res.exportType || 'pdf') +
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
                        reply(buf).header('Content-Type', contentType).header('Cache-Control', 'no-cache');
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
