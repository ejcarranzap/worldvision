module.exports.send_email = {
    path: {
        method: 'POST',
        path: '/server/main/send_email',
        config: {
            auth: false,
            handler: function (request, reply) {
                try {
                    var res = request.payload;
                    const nodemailer = require("nodemailer");
                    let transporter = nodemailer.createTransport({
                        secureConnection: false,
                        host: "smtp.gmail.com",
                        port: 587,
                        auth: {
                            user: 'worldvisiongt2023@gmail.com',
                            pass: 'gekgkjtkapdjibkg'
                        },
                        /*tls: { 
                            ciphers: 'SSLv3'
                        },*/
                        debug: true
                    });

                    let info = transporter.sendMail({
                        from: 'Modulo Expedientes<worldvisiongt2023@gmail.com>',
                        to: res.email,
                        subject: res.subject,
                        text: res.message,
                        html: res.body/*,
                        attachments: [{
                            filename: 'file.csv',
                            content: csv
                        }]*/
                    }).then(function () {
                        reply({
                            code: 0,
                            success: true,
                            msg: "Email enviado exitosamente",
                            data: []
                        });
                    }).catch(function (err) {
                        console.log(err);
                        reply({
                            code: -1,
                            success: false,
                            msg: "Error no se pudo enviar el email " + err,
                            data: []
                        });
                    });

                } catch (e) {
                    console.log(e.message);
                    reply({
                        code: -1,
                        msg: e.message,
                        success: false
                    })
                }
            }
        }
    }
};