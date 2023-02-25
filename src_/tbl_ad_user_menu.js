module.exports.tbl_ad_user_menu = {
	path: {
		method: 'POST',
		path: '/server/main/tbl_ad_user_menu',
		config: {
			auth: false,
			handler: function (request, reply) {
				try {
					var reg = request.payload;
					var params,
					detparams;
					var calls = [],
					detcalls = [];
					var call = {},
					detcall = {};
					reg = (!reg ? {}
						 : reg);
					if (reg.action == 'IX') {
						for (var i = 0; i < reg.data.length; i++) {
							var myreg = reg.data[i];
							params = [];
							params.push({
								name: 'ACTION',
								type: module.exports.dbsql.NVarChar,
								value: 'I'
							});
							params.push({
								name: 'RAWPRM',
								type: module.exports.dbsql.NVarChar,
								value: myreg.rawprm
							});
							params.push({
								name: 'Id_user_menu',
								type: module.exports.dbsql.Int,
								value: myreg.Id_user_menu
							});
							params.push({
								name: 'Id_user',
								type: module.exports.dbsql.Int,
								value: myreg.Id_user
							});
							params.push({
								name: 'Id_menu',
								type: module.exports.dbsql.Int,
								value: myreg.Id_menu
							});
							params.push({
								name: 'user_mod',
								type: module.exports.dbsql.NVarChar(20),
								value: reg.extra.user
							});
							params.push({
								name: 'date_mod',
								type: module.exports.dbsql.DateTime,
								value: reg.extra.date
							});
							params.push({
								name: 'active',
								type: module.exports.dbsql.Int,
								value: myreg.active
							});
							call = {};
							call.type = 'sql';
							call.query = 'sp_tbl_ad_user_menu_mod';
							call.params = params.slice(0);
							call.deta = detcalls;
							calls.push(call);
						}
					} else {
						params = [];
						params.push({
							name: 'ACTION',
							type: module.exports.dbsql.NVarChar,
							value: reg.action
						});
						params.push({
							name: 'RAWPRM',
							type: module.exports.dbsql.NVarChar,
							value: reg.rawprm
						});
						params.push({
							name: 'Id_user_menu',
							type: module.exports.dbsql.Int,
							value: reg.Id_user_menu
						});
						params.push({
							name: 'Id_user',
							type: module.exports.dbsql.Int,
							value: reg.Id_user
						});
						params.push({
							name: 'Id_menu',
							type: module.exports.dbsql.Int,
							value: reg.Id_menu
						});
						params.push({
							name: 'user_mod',
							type: module.exports.dbsql.NVarChar(20),
							value: reg.extra.user
						});
						params.push({
							name: 'date_mod',
							type: module.exports.dbsql.DateTime,
							value: reg.extra.date
						});
						params.push({
							name: 'active',
							type: module.exports.dbsql.Int,
							value: reg.active
						});
						call = {};
						call.type = 'sql';
						call.query = 'sp_tbl_ad_user_menu_mod';
						call.params = params.slice(0);
						call.deta = detcalls;
						calls.push(call);
					}

					module.exports.mssqlcnSync.execute(request, reply, calls, function (err, recordsets) {
						if (err) {
							console.log(err);
							reply({
								code: err.code,
								success: false,
								msg: err.msg,
								data: []
							});
						} else {
							/*console.log(recordsets[0].recordsets[0]);*/
							reply({
								code: 0,
								success: true,
								msg: 'Operaci?n exitosa',
								data: recordsets[0].recordsets[0]
							});
						}
					}, 'configLocal');
				} catch (e) {
					console.log(e.message);
					reply({
						code: -1,
						msg: e.message,
						success: false
					});
				}
			}
		}
	}
};
