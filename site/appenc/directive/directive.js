(function () {
	'use strict';
	var app = angular.module('itxwebApp');

	app.filter('total', function () {
		return function (input, property, multiplier) {
			var i =  input.length;
				var total = 0;
				while (i--)
					total += (input[i][property] * (!multiplier ? 1 : multiplier));
				return total;
			}
	});

	app.directive('myTreeViewNew', function ($timeout, $filter, $compile) {
		return {
			restrict: 'A',
			scope: {
				data: '@',
				options: '=options',
				fieldId: '@',
				fieldParent: '@',
				fieldText: '@',
				size: '=size',
				multiSelect: '&',
				onSelectionChange: '&',
				onDrop: '&',
			},
			replace: true,
			template: "<div id=\"treeId\" style=\"width:100%; height:{{size + 'px'}}; overflow: hidden;\"></div>",
			link: function (scope, elem, attrs) {
				/*this.$element.off('click');
				this.$element.off('nodeChecked');
				this.$element.off('nodeCollapsed');
				this.$element.off('nodeDisabled');
				this.$element.off('nodeEnabled');
				this.$element.off('nodeExpanded');
				this.$element.off('nodeSelected');
				this.$element.off('nodeUnchecked');
				this.$element.off('nodeUnselected');
				this.$element.off('searchComplete');
				this.$element.off('searchCleared');
				*/
				setTimeout(function () {
					scope.searchValue = '';
					scope.itemsAux = [];


					angular.extend(scope.options, {
						getData: function () {
							return scope.itemsAux;
						}
					});

					scope.getTreeData = function (parent) {
						var dataNodes = [];

						var dataFiltered = $filter('filter')(scope.items, function (itm) {
							return (itm[scope.fieldParent] == parent);
						});

						if (dataFiltered) {
							angular.forEach(dataFiltered, function (itm) {
								itm.text = itm[scope.fieldText];
								var nodes = scope.getTreeData(itm[scope.fieldId]);

								if (nodes.length > 0)
									itm.nodes = nodes;

								dataNodes.push(itm);
							});
						}

						return dataNodes;
					};

					scope.findNode = function (node) {
						var obj = null;
						angular.forEach(scope.itemsAux, function (o) {
							if (node[scope.fieldId].toString() === o[scope.fieldId].toString()) {
								obj = o;
							}
						});
						return obj;
					};

					scope.arrayMove = function (arr, fromIndex, toIndex) {
						console.log('from: ', fromIndex, ' to: ', toIndex);
						var element = arr[fromIndex];
						arr.splice(fromIndex, 1);
						arr.splice(toIndex, 0, element);
					};

					scope.dropped = function (dragEl, dropEl) {
						if (scope.onDrop) {
							scope.onDrop({ dragEl: dragEl, dropEl: dropEl });

							var node = $(scope.el[0]).data('treeview').getNode($(dragEl.dragEl).attr('data-nodeid')),
								node2 = $(scope.el[0]).data('treeview').getNode($(dragEl.dropEl).attr('data-nodeid'));

							var nodeaux = scope.findNode(node), nodeaux2 = scope.findNode(node2);
							scope.arrayMove(scope.itemsAux, scope.itemsAux.indexOf(nodeaux), scope.itemsAux.indexOf(nodeaux2));

							if (!nodeaux2) {
								nodeaux[scope.fieldParent] = null;
							} else {
								nodeaux[scope.fieldParent] = nodeaux2[scope.fieldId];
							}

							/*$(scope.el[0]).data('treeview').selectNode($(dragEl.dragEl).attr('data-nodeid'));*/
							$(scope.el[0]).data('treeview').getSelected();
							scope.loadTreeItems();
							console.log('items: ', scope.itemsAux, 'nodeaux: ', nodeaux, 'nodeaux2: ', nodeaux2);
						}
					};

					scope.getTreeJson = function () {
						var tree = $(scope.el[0]).data('treeview'), allCollapsedNodes = tree.getCollapsed(),
							allExpandedNodes = tree.getExpanded(), allNodes = allCollapsedNodes.concat(allExpandedNodes);

						return allNodes;
					};

					scope.addDragAttr = function () {
						var tree = $(scope.el[0].childNodes[0]);
						tree.find('li').each(function () {
							var _li = angular.element(this);

							_li.attr('x-lvl-draggable', true);
							_li.attr('x-lvl-drop-target', true);
							_li.attr('on-drop', 'dropped({dragEl: dragEl, dropEl: dropEl})');
						});

						$compile(angular.element(scope.el).contents())(scope);

						/*setTimeout(function () {
							scope.$apply();
						});*/
					};

					scope.loadTreeItems = function () {
						if (scope.itemsAux.length == 0) {
							scope.itemsAux = angular.copy(scope.$parent[scope.data], scope.itemsAux);
							scope.itemsAux.push({
								id: 0,
								parent: null,
								text: 'Root',
								icon: "glyphicon glyphicon-stop",
								selectedIcon: "glyphicon glyphicon-check",
								state: {}
							});
							console.log('load itemsAux new', scope.itemsAux);
						}

						scope.items = [];
						scope.items = angular.copy(scope.itemsAux, scope.items);
						scope.items = scope.getTreeData(null);

						scope.el = $(elem);
						scope.el.empty();
						scope.el.treeview({
							data: scope.items,
							multiSelect: false,
							searchResultBackColor: '#EEF442',
							onNodeSelected: function (event, data) {
								scope.onSelectionChange({
									event: event,
									data: data
								});
								setTimeout(function () {
									scope.addDragAttr();
								});
							},
							onNodeUnselected: function (event, data) {
								scope.onSelectionChange({
									event: event,
									data: data
								});
								setTimeout(function () {
									scope.addDragAttr();
								});
							},
							onNodeExpanded: function (event, data) {
								/*console.log('nodes E', scope.getTreeJson(), data);*/
								setTimeout(function () {
									scope.addDragAttr();
								});
							},
							onNodeCollapsed: function (event, data) {
								/*console.log('nodes C', scope.getTreeJson(), data);*/
								setTimeout(function () {
									scope.addDragAttr();
								});
							}
						});

						/*console.log('treeview: ', scope.el[0].childNodes[0].childNodes);*/

						scope.addDragAttr();
					};
					scope.loadTreeItems();

					/*scope.$watchCollection(function () {
						if (JSON.stringify(scope.itemsAux) === JSON.stringify(scope.items)) {
							console.log('MyTreeView items watch collection NO CHANGE');
						} else {
							console.log('MyTreeView items watch collection HAS CHANGE');
							scope.loadTreeItems();
						}
	
						return scope.items;
					}, function () {
	
					});*/

					scope.$apply();

					/*scope.$watchCollection(function () {                          
						scope.loadTreeItems();
						return scope.items;
					}, function (newVal, oldVal) {
						console.log('TreeView Change...', newVal, oldVal, (newVal===oldVal));
					});*/
				}, 0);
			}
		}
	});


	app.directive('myPrintDiv', function ($timeout, $filter) {
		return {
			restrict: 'A',
			scope: {
				divName: '@',
			},
			link: function (scope, elem, attrs) {
				scope.el = $(elem);
				scope.el.on('click', function (e) {
					e.preventDefault();
					console.log(scope.divName);
					var el = document.getElementById(scope.divName);
					var jel = $(el);
					var hiddenEls = jel.find('.no-print');
					angular.forEach(hiddenEls, function (iel) {
						iel.style.display = 'none';
					});

					var content = el.innerHTML;
					var mywindow = window.open('', 'Print', 'height=600,width=800');

					mywindow.document.write('<html><head><title>World Vision</title>');
					mywindow.document.write('</head><body >');
					mywindow.document.write(content);
					mywindow.document.write('</body></html>');

					mywindow.document.close();
					mywindow.focus()
					mywindow.print();
					mywindow.close();

					var hiddenEls = jel.find('.no-print');
					angular.forEach(hiddenEls, function (iel) {
						iel.style.display = 'block';
					});
				});
			}
		}
	});

	app.directive('myTreeView', function ($timeout, $filter) {
		return {
			restrict: 'A',
			scope: {
				data: '@',
				size: '=size',
				multiSelect: '=multiSelect',
				onSelectionChange: '&'
			},
			replace: true,
			template: "<div style=\"width:100%; height:{{size + 'px'}}; overflow: hidden;\"></div>",
			link: function (scope, elem, attrs) {
				/*this.$element.off('click');
				this.$element.off('nodeChecked');
				this.$element.off('nodeCollapsed');
				this.$element.off('nodeDisabled');
				this.$element.off('nodeEnabled');
				this.$element.off('nodeExpanded');
				this.$element.off('nodeSelected');
				this.$element.off('nodeUnchecked');
				this.$element.off('nodeUnselected');
				this.$element.off('searchComplete');
				this.$element.off('searchCleared');
				 */
				setTimeout(function () {
					scope.searchValue = '';

					scope.loadTreeItems = function () {
						scope.items = scope.$parent[scope.data];
						scope.el = $(elem);
						scope.el.treeview({
							data: scope.items,
							multiSelect: scope.multiSelect,
							searchResultBackColor: '#EEF442',
							onNodeSelected: function (event, data) {
								scope.onSelectionChange({
									event: event,
									data: data
								});
							},
							onNodeUnselected: function (event, data) {
								scope.onSelectionChange({
									event: event,
									data: data
								});
							}
						});
					};
					scope.loadTreeItems();

					scope.$watchCollection(function () {
						scope.loadTreeItems();
						return scope.items;
					}, function (newVal, oldVal) { });
				}, 0);
			}
		}
	});

	app.directive('myEnter', function () {
		return function (scope, element, attrs) {
			element.bind("keydown keypress", function (event) {
				if (event.which === 13) {
					scope.$apply(function () {
						scope.$eval(attrs.myEnter);
					});

					event.preventDefault();
				}
			});
		};
	});

	app.directive('showMenu', function ($rootScope, $timeout) {
		return {
			restrict: 'A',
			link: function (scope, element, attrs, ngModel) {
				$timeout(function () {
					scope.$watchCollection(function () {
						scope.el = $(element);
						scope.datax = $rootScope.menuGlobal;
						if (scope.datax.indexOf(scope.el.attr('href').replace('#/', '')) == -1) {
							scope.el.addClass('hidden');
						} else {
							scope.el.removeClass('hidden');
						}

						return scope.datax;
					}, function (newVal, oldVal) { });
				}, 0);
			}
		}
	});

	app.directive('myFrame', [function () {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				$(element).on('load', function () {
					setTimeout(function () {
						var h = $(document.body).height();
						$(element).height(h / 1.4);
						scope.$apply();
					}, 0);
				});
			}
		}
	}
	]);

	app.directive('myTableSort', function ($filter) {
		return {
			restrict: 'A',
			scope: {
				data: '@',
				sortFields: '@'
			},
			link: function (scope, element, attrs) {
				setTimeout(function () {
					scope.el = $(element[0]);
					scope.el.find('th').each(function () {
						$(this).append('<span></span>');
						$(this).find('span').each(function () { $(this).addClass('glyphicon glyphicon-sort-by-attributes') });
						$(this).unbind();
						$(this).click(function () {

							var col = scope.$parent[scope.sortFields][$(this).index()];
							col.sort = !col.sort;

							$(this).find('span').each(function () { $(this).removeClass('glyphicon glyphicon-sort-by-attributes') });
							$(this).find('span').each(function () { $(this).removeClass('glyphicon glyphicon-sort-by-attributes-alt') });

							if (col.sort) {
								$(this).find('span').each(function () { $(this).addClass('glyphicon glyphicon-sort-by-attributes-alt') });
							} else {
								$(this).find('span').each(function () { $(this).addClass('glyphicon glyphicon-sort-by-attributes') });
							}

							var data = scope.$parent[scope.data];
							scope.$parent[scope.data] = $filter('orderBy')(data, col.name, col.sort);
							/*console.log('Col: ', $(this).text(), 'Index: ', $(this).index(), col.name, 'Sort: ', col.sort);*/
							setTimeout(function () {
								scope.$apply();
							}, 0);
						});
					});
				}, 0);
			}
		}
	});

	app.directive('ngConfirmMessage', [function () {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				element.on('click', function (e) {
					var message = attrs.ngConfirmMessage || "Esta seguro?";
					if (!confirm(message)) {
						e.stopImmediatePropagation();
					}
				});
			}
		}
	}
	]);

	app.filter('secondToDateString',
		function secondToDateString() {
			return function (seconds) {
				var hour = Math.floor(seconds / 3600);
				hour = (hour < 10) ? '0' + hour : hour;
				var minute = Math.floor((seconds / 60) % 60);
				minute = (minute < 10) ? '0' + minute : minute;
				var second = seconds % 60;
				second = (second < 10) ? '0' + second : second;
				return hour + ':' + minute + ':' + second;
			}
		}
	);

	app.filter('dateText',
		function dateText() {
			return function (dateValue) {
				try {
					var retVal;
					var momentObj = moment(dateValue.substring(0, 19).replace('T', ''), 'YYYY-MM-DDTHH:mm:ss.SSSSZ');
					if (momentObj.isValid() == true) {
						retVal = momentObj.format('DD/MM/YYYY HH:mm');
						return retVal;
					} else {
						momentObj = moment(dateValue.substring(0, 19), 'YYYY-MM-DD HH:mm:ss');
						if (momentObj.isValid()) {
							retVal = momentObj.format('DD/MM/YYYY HH:mm');
							return retVal;
						} else {
							return dateValue;
						}
					}
				} catch (e) {
					return dateValue;
				}
			}
		});

	app.filter('formatDateTime', function ($filter) {
		return function (date, format) {
			if (date) {
				return moment(date, 'YYYY-MM-DD HH:mm:ss').format(format || "DD/MMM/YYYY HH:mm");
			} else
				return "";
		};
	});

	app.filter('SiNo', function () {
		return function (input) {
			return input == 1 ? 'sí' : 'no';
		}
	});

	app.directive('ngEnter', function () {
		return function (scope, element, attrs) {
			element.bind("keydown, keypress", function (event) {
				console.log(event);
				if (event.which === 13) {
					scope.$apply(function () {
						scope.$eval(attrs.ngEnter);
					});
					event.preventDefault();
				}
			});
		};
	});

	app.directive('myNavBar', function () {
		return {
			restrict: 'E',
			transclude: {
				'title': '?boxTitle',
				'body': '?boxBody',
				'footer': '?boxFooter'
			},
			template: '<!-- general form elements -->' +
				'<div ng-class="[\'box\',\'box-{{boxType}}\']">' +
				'  <div class="box-header with-border">' +
				'    <h3 class="box-title" ng-transclude="title"></h3>' +
				'  </div>' +
				'  <!-- /.box-header -->' +
				'  <!-- form start -->' +
				'  <form role="form">' +
				'    <div class="box-body" ng-transclude="body">' +
				'    Body' +
				'    </div>' +
				'    <!-- /.box-body -->' +
				'    <div class="box-footer" ng-transclude="footer">' +
				'    ' +
				'    </div>' +
				'  </form>' +
				'</div>' +
				'<!-- /.box -->',
			scope: {
				boxType: '@'
			},
			replace: true,
			link: function (scope, element, attrs) { }
		};
	});

	app.directive('myTimepicker', function ($timeout, $log, $filter) {
		return {
			restrict: 'A',
			require: 'ngModel',
			template: '<input type="text" class="form-control input-sm"/>',
			link: function (scope, element, attrs, ngModel) {
				console.log('myTimepicker');
				$timeout(function () {
					var $targetSelects = $(element);
					$targetSelects.timepicker(/*{
						change: function(time) {
						// the input field
						var element = $(this),
						text;
						// get access to this Timepicker instance
						var timepicker = element.timepicker();
						text = 'Selected time is: ' + timepicker.format(time);
						element.siblings('span.help-line').text(text);
						var val = time;
						console.log(val);
						ngModel.$setViewValue(val);
						}
						}*/
					);

					scope.$watch(
						function () {
							return ngModel.$modelValue;
						},
						function (newValue) {
							if (newValue) { }
						});

					scope.$apply();
				}, 0);
			}
		}
	});

	app.directive('myDatepicker', function ($timeout, $log, $filter) {
		return {
			restrict: 'A',
			require: 'ngModel',
			template: '<input type="text" editable="false" value="{{dtpDate | date: \'dd/MM/yyyy HH:mm:ss\'}}" class="form-control input-sm"/>',
			scope: {
				dtpval: '=?',
				dtpEnabled: '=?'
			},
			link: function (scope, element, attrs, ngModel) {
				$timeout(function () {
					$.datetimepicker.setLocale('es');
					/*console.log($.datetimepicker);*/

					/*$.datetimepicker.regional.es = angular.copy($.datepicker.regional['en'], $.datepicker.regional['es']);
					$.datetimepicker.regional.es.closeText = 'Cerrar';
					$.datetimepicker.regional.es.currentText = 'Hoy';
					$.datetimepicker.regional.es.dayNames = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
					$.datetimepicker.regional.es.dayNamesMin = ['Do','Lu','Ma','Mi','Ju','Vi','Sa'];
					$.datetimepicker.regional.es.dayNamesShort = ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'];
					$.datetimepicker.regional.es.monthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre', 'Octubre','Noviembre','Diciembre'];
					$.datetimepicker.regional.es.monthNamesShort = ['Ener','Febr','Marz','Abri','Mayo','Juni','Juli','Agos','Sept', 'Octu','Novi','Dici'];

					$.datetimepicker.setDefaults($.datetimepicker.regional.es);*/
					var $targetSelects = $(element);
					scope.mypickerfn = function () {
						if (scope.dtpEnabled == true) {
							setTimeout(function () {
								$targetSelects.datetimepicker({
									format: 'Y/m/d H:i:s',
									inline: false,
									disable: !scope.dtpEnabled
								});
							});
						} else {
							setTimeout(function () {
								$targetSelects.datetimepicker('hide');
								$targetSelects.datetimepicker('destroy');
								scope.$apply();
							}, 0);
						}
					};

					if (!scope.dtpEnabled && scope.dtpEnabled != false) {
						scope.dtpEnabled = true;
					}

					/*console.log('Enabled DatePick');
					console.log(scope.dtpEnabled);
					scope.dtpEnabled = true;*/

					/*$.datetimepicker.setDefaults($.datepicker.regional['es']);*/
					$targetSelects.on('change', function (dtp) {
						if (scope.dtpEnabled != false) {
							var val = $(this).val();
							ngModel.$setViewValue(val);
						}
					});

					scope.$watch('dtpEnabled', function () {
						scope.mypickerfn();
					});

					/*$(element).on('click',function(event) {
					event.preventDefault();
					scope.mypickerfn();
					});*/

					$($targetSelects.find('input')).on('change', function () {
						var newValue = $($targetSelects.find('input')).val();
						var momentVal = moment(newValue, 'DD/MM/YYYY HH:mm:ss');

						if (momentVal.isValid() != false) {
							newValue = $filter('date')(momentVal._d, 'yyyy/MM/dd HH:mm:ss');
							$targetSelects.val(newValue);
							ngModel.$setViewValue(newValue);
						}
					});

					scope.$watch(
						function () {
							$targetSelects.find('input').attr('disabled', !scope.dtpenabled);
							return ngModel.$modelValue;
						},
						function (newValue) {
							$targetSelects.find('input').attr('disabled', !scope.dtpenabled);
							if (newValue) {
								scope.dtpval = newValue;
								scope.dtpDate = moment(newValue, 'YYYY-MM-DD HH:mm:ss')._d;
								/*$targetSelects.datetimepicker('refresh');*/
							}
						});

				}, 0);
			}
		}
	});

	app.filter('randomSrc', function () {
		return function (input) {
			if (input)
				return input + '?r=' + Math.round(Math.random() * 999999);
		}
	});

	app.directive('checkImage', function ($q, $rootScope) {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				attrs.$observe('ngSrc', function (ngSrc) {
					var deferred = $q.defer();
					var image = new Image();
					image.onerror = function () {
						deferred.resolve(true);
						element.attr('src', $rootScope.filepath + '../../uploads/noimage.png');
					};
					image.onload = function () {
						deferred.resolve(true);
					};
					image.src = ngSrc;
					return deferred.promise;
				});
			}
		};
	});

	app.directive('fancybox', function ($compile, $http) {
		return {
			restrict: 'A',

			controller: function ($scope, $rootScope) {
				$scope.openFancybox = function (url) {
					if (url) {
						url = $rootScope.filepath + url + '?t' + (new Date()).getTime();
						$scope.fancyboxurl = url;
						$http.get('./app/view/template.html').then(function (response) {
							if (response.status == 200) {

								var template = angular.element(response.data);
								var compiledTemplate = $compile(template);
								compiledTemplate($scope);

								$.fancybox.open({
									content: template,
									type: 'html'
								});
							}
						});
					}
				};
			}
		};
	});

	app.directive('itxBox', function () {
		return {
			restrict: 'E',
			transclude: {
				'title': '?boxTitle',
				'body': 'boxBody',
				'footer': '?boxFooter'
			},
			template: '<!-- general form elements -->' +
				'<div ng-class="[\'box\',\'box-{{boxType}}\']">' +
				'  <div class="box-header with-border">' +
				'    <h3 class="box-title" ng-transclude="title">Title</h3>' +
				'    <!--<h3 class="box-title">{{boxType}}</h3>-->' +
				'  </div>' +
				'  <!-- /.box-header -->' +
				'  <!-- form start -->' +
				'  <form role="form">' +
				'    <div class="box-body" ng-transclude="body">' +
				'    Body' +
				'    </div>' +
				'    <!-- /.box-body -->' +
				'    <div class="box-footer" ng-transclude="footer">' +
				'    ' +
				'    </div>' +
				'  </form>' +
				'</div>' +
				'<!-- /.box -->',
			scope: {
				boxType: '@'
			},
			replace: true,
			link: function (scope, element, attrs) { }
		};
	});

	app.directive('itxCheckbox', function () {
		return {
			restrict: 'E',
			template: '<div class="checkbox">' +
				'<label>' +
				'<input type="checkbox" ng-click="toggle();">{{textLabel}}' +
				'</label>' +
				'</div>',
			replace: true,
			require: 'ngModel',
			scope: {
				textLabel: '@',
				isDisabled: '=?'
			},
			link: function (scope, element, attrs, model) {
				scope.el = $(element).find('label input[type=checkbox]')[0];

				scope.setChecked = function () {
					(scope.isChecked ? scope.el.setAttribute('checked', 'checked') : scope.el.removeAttribute('checked'));
				};

				scope.setDisabled = function () {
					(scope.isDisabled ? scope.el.setAttribute('disabled', 'disabled') : scope.el.removeAttribute('disabled'));
				};

				model.$formatters.unshift(function (value) {
					scope.isChecked = value == true;
					scope.setChecked();
					return (scope.isChecked ? 1 : 0);
				});

				scope.toggle = function () {
					if (scope.isDisabled != true) {
						scope.isChecked = !scope.isChecked;
						scope.setChecked();
						model.$setViewValue((scope.isChecked ? 1 : 0));
					}
				}

				scope.$watch('isDisabled', function () {
					scope.setDisabled();
				});
			}
		};
	});

	app.directive('itxIcheck', function () {
		return {
			restrict: 'E',
			template: '<input type="radio" group="g1" value="{{value}}">',
			//template: '<input type="radio" group="{{group}}" class="flat-red" style="position: absolute; opacity: 0;">',
			replace: true,
			require: 'ngModel',
			scope: {
				value: '@'
			},
			link: function (scope, element, attrs, model) {
				/*$(element).iCheck({
				checkboxClass: 'icheckbox_flat-green',
				radioClass   : 'iradio_flat-green'
				});*/
			}
		}
	});

	app.directive('itxSelect', function ($timeout) {
		return {
			restrict: 'E',
			template: '<select class="form-control" style="width: 100%;">' +
				'</select>',
			replace: true,
			require: 'ngModel',
			scope: {
				isDisabled: '=?'
			},
			link: function (scope, element, attrs, model, $scope) {
				$timeout(function () {
					scope.optionsQry = attrs['ngOptions'].split(' in ');
					scope.options = scope.optionsQry[1].toString();
					scope.optionsArray = scope.options.substring(0, scope.options.indexOf(' '));

					scope.setDisabled = function () {
						(scope.isDisabled ? scope.el.setAttribute('disabled', 'disabled') : scope.el.removeAttribute('disabled'));
					};

					scope.el = $(element);
					scope.el.select2();
					scope.options = scope.el.select2('data');

					scope.$watchCollection('$parent.' + scope.optionsArray, function () {
						scope.el.select2('destroy');
						scope.el.select2();
					}, true);

					scope.$watch('isDisabled', function () {
						console.log('isDisabled...' + scope.isDisabled);
						scope.el.prop("disabled", scope.isDisabled);
						/*scope.el[0].disabled = scope.isDisabled;*/
					});

					scope.$watch(
						function () {
							setTimeout(function () {
								try {
									scope.el.select2('destroy');
								} catch (e) {
									console.log(e.message);
								}
								scope.el.select2();
							});
						});
				}, 0);
			}
		};
	});

	app.directive('mySearchFieldEasyTwo', function ($uibModal, $log, $filter) {
		return {
			restrict: 'E',
			template: '<div class="row">' +
				'	<div class="col-sm-12">' +
				'		<div class="input-group input-group-sm">' +
				'			<input type="text" class="form-control" value="{{val}}" ng-disabled="isDisabled">' +
				'			<span class="input-group-btn">' +
				'				<button class="btn btn-info btn-flat" type="button" ng-click="clear()" ng-disabled="isDisabled"><span class="glyphicon glyphicon-remove"></span></button>' +
				'				<button class="btn btn-info btn-flat" type="button" ng-click="fnClick()" ng-disabled="isDisabled"><span class="glyphicon glyphicon-search"></span></button>' +
				'			</span>' +
				'		</div>' +
				'	</div>' +
				'</div>'
			/*'<div class="row">' +
			'<div class="col-sm-12">' +
			'<div class="input-group">' +
			'<input type="text" class="form-control" value="{{val}}">' +
			'<div class="input-group-btn">' +
			'<button type="button" ng-click="clear()" class="btn btn-default" aria-label="Help">' +
			'<span class="glyphicon glyphicon-remove"></span>' +
			'</button> <button type="button" ng-click="fnClick()" class="btn btn-default">'+
			'<span class="glyphicon glyphicon-remove"></span>' +
			'</button>'+
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>'*/
			,
			replace: true,
			require: 'ngModel',
			scope: {
				fnClick: '=?',
				fnKeyPress: '&',
				arrSearch: '=?',
				arrFields: '=?',
				arrRenderFields: '=?',
				val: '=?',
				str: '=?',
				isDisabled: '=?'
			},
			link: function (scope, element, attrs, model) {
				console.log('This is field two...');
				if (!scope.isDisabled)
					scope.isDisabled = false;

				element.bind("keypress", function (event) {
					if (event.keyCode == 13) {

						var itm;
						itm = $filter('filter')(scope.arrSearch, scope.q, true);

						if (itm) {
							if (itm.length > 0) {
								scope.selectedrecord = itm[0];
								model.$setViewValue(scope.selectedrecord);
								scope.fnKeyPress();
							}
						}
						$(element).find('input')[0].select();
					}
				});

				scope.fnClick = function () {
					var modalInstance = $uibModal.open({
						/*animation: $scope.animationsEnabled,*/
						templateUrl: 'app/view/my-search-field/tpl/search.html?dt=' + (new Date()).getTime(),
						controller: 'mySearchFieldModalController',
						size: 'lg',
						resolve: {
							data: function () {
								return (scope.arrSearch);
							},
							fields: function () {
								return (scope.arrFields);
							}
						}
					});

					modalInstance.result.then(function (record) {
						scope.selectedrecord = record;
						scope.q = scope.selectedrecord[scope.arrRenderFields[0]];
						model.$setViewValue(scope.selectedrecord);
					}, function (err) { });
				};

				scope.clear = function () {
					model.$setViewValue(null);
				};

				scope.$watch(
					function () {
						return model.$modelValue;
					},
					function (newValue) {

						var str = '';

						angular.forEach(scope.arrRenderFields, function (itm) {
							if (model.$modelValue) {
								str = str + model.$modelValue[itm];
								str = str + ' ';
							} else {
								str = '';
							}
						});

						scope.val = str;
					});
			}
		}
	});

	app.directive('fancySelect', function ($timeout) {
		return {
			restrict: 'E',
			require: 'ngModel',
			replace: true,
			template: '<select class="form-control input-sm"></select>',
			link: function (scope, element, attrs, ngModel) {
				$timeout(function () {
					var $targetSelects = $(element),
						selectConfig = {
							theme: "bootstrap",
							downArrowIcon: "arrow",
							showFirstOption: true
						};

					function onOpen(event) {
						/*$(this).data('selectBoxSelectBoxIt').list.perfectScrollbar();
						$(this).data('selectBoxSelectBoxIt').dropdown.perfectScrollbar();
						$targetSelects.selectBoxIt('refresh');*/
					}

					function onClose(event) { }

					/*$targetSelects.selectBoxIt();*/
					$targetSelects.on({
						"open": onOpen,
						"close": onClose
					});

					scope.$watch(function () {
						return ngModel.$modelValue;
					}, function (newValue) {
						/*$targetSelects.selectBoxIt('refresh');*/
					});

				}, 0);
			}
		}
	});

	app.directive('jcUploadFileArray', function ($filter) {
		return {
			restrict: 'AE',
			scope: {
				data: '@',
				name: '=name',
				fieldName: '@',
				fieldSize: '@',
				fieldType: '@',
				fieldFile: '@',
				fieldUrl: '@',
				fieldId: '@',
				afterChangeFn: '&',
				options: '='
			},
			replace: true,
			template: '<div class="col-md-12" style="min-height:200px!important">' +
				'       <h1>{{name}}</h1>' +
				'       <div class="col-md-12">' +
				'           <input class="btn btn-lg btn-info" type="file" multiple>' +
				'       </div>' +
				'       <table class="table table-striped">' +
				'           <thead>' +
				'               <tr>' +
				'                   <th scope="col">Id</th>' +
				'                   <th scope="col">Name</th>' +
				'                   <th scope="col">Descargar</th>' +
				'                   <!--<th scope="col">Size</th>' +
				'                   <th scope="col">Type</th>-->' +
				'                   <th scope="col" class="fit">Delete</th>' +
				'                   <!--<th scope="col">Print</th>-->' +
				'               </tr>' +
				'           </thead>' +
				'           <tbody>' +
				'               <tr ng-repeat="o in data_pivot" ng-if="(o._del == null)">' +
				'                   <td scope="col">{{ o[(fieldId || \'id\')] }}</td>' +
				'                   <td scope="col">{{ o[(fieldName || \'name\')] }}</td>' +
				'                   <td scope="col" ><a  target="_blank" href="{{downloadPath(o[(fieldUrl || \'url\')])}}">{{ downloadPath(o[(fieldUrl || \'url\')]) }}</a></td>' +
				'                   <!--<td scope="col">{{ o.size }}</td>' +
				'                   <td scope="col">{{ o.type }}</td>-->' +
				'                   <td scope="col" class="fit">' +
				'                       <button type="button" class="btn btn-primary" ng-click="delete(o, $index)">Delete</button>' +
				'                   </td>' +
				'                   <!--<td scope="col">' +
				'                       <button type="button" class="btn btn-primary" ng-click="print(o, $index)">Print</button>' +
				'                   </td>-->' +
				'               </tr>' +
				'           </tbody>' +
				'       </table>' +
				'</div>',
			link: function (scope, elem, attrs) {
				scope.el = elem;

				/*scope.el.on('mouseover', function(e){
					scope.el[0].style.background = 'gray';
					scope.el[0].style.opacity = 0.5;
				});*/
				angular.extend(scope.options, {
					load: function () {
						scope.load();
					}
				});

				scope.load = function () {
					scope.data_pivot = scope.$parent[scope.data];
				};

				scope.downloadPath = function (path) {
					if (!typeof path == 'string') {
						return ('#');
					} else {
						return ('.' + path.replaceAll("\\", "/"));
					}
				};

				scope.addFiles = function (files) {
					if (files.length > 0) {
						angular.forEach(files, function (f) {
							console.log(f);
							var item = {};
							item[(scope.fieldName || 'name')] = f.name;
							item[(scope.fieldSize || 'size')] = f.size;
							item[(scope.fieldType || 'type')] = f.type;
							item[(scope.fieldUrl || 'url')] = f.url;
							item[(scope.fieldFile || 'file')] = f;
							scope.$parent[scope.data].push(item);
							scope.data_pivot = scope.$parent[scope.data];
						});
						setTimeout(function () {
							scope.$apply();
						});
					}
				};

				$(scope.el).find('input[type=file]').on('change', function () {
					console.log(this.files);
					scope.addFiles(this.files);
					this.value = null;
					setTimeout(function () {
						scope.$apply();
					});
				});

				scope.filesUploaded = function (event) {
					console.log(event);
					angular.forEach(files, function (f) {
						console.log(f);
						var item = {};
						item[(scope.fieldName || 'name')] = f.name;
						item[(scope.fieldSize || 'size')] = f.size;
						item[(scope.fieldType || 'type')] = f.type;
						item[(scope.fieldUrl || 'url')] = f.url;
						item[(scope.fieldFile || 'file')] = f;
						scope.$parent[scope.data].push(item);
						scope.data_pivot = scope.$parent[scope.data];
					});

					setTimeout(function () {
						scope.$apply();
					});
				};

				scope.el.on('mouseout', function (e) {
					scope.el[0].style.background = 'white';
					scope.el[0].style.opacity = 1;
				});

				scope.el.on('dragover', function (e) {
					e.preventDefault();
					e.stopPropagation();
				});
				scope.el.on('dragenter', function (e) {
					scope.el[0].style.background = 'gray';
					scope.el[0].style.opacity = 0.5;
					e.preventDefault();
					e.stopPropagation();
				});

				scope.el.on('drop', function (e) {
					scope.el[0].style.background = 'white';
					scope.el[0].style.opacity = 1;
					e.preventDefault();
					e.stopPropagation();
					if (e.originalEvent.dataTransfer) {
						if (e.originalEvent.dataTransfer.files.length > 0) {
							scope.addFiles(e.originalEvent.dataTransfer.files);

							setTimeout(function () {
								scope.$apply();
							});
							/*scope.afterChangeFn(e.originalEvent.dataTransfer.files);*/
						}
					}
					return false;
				});

				scope.delete = function (o, index) {
					if (o[(scope.fieldId || 'id')]) {
						var itm = $filter('filter')(scope.$parent[scope.data], function (x) {
							return (x[(scope.fieldId || 'id')]) == o[(scope.fieldId || 'id')]
						});

						console.log('itm: ', itm);
						if (itm.length > 0) {
							itm = itm[0];
							itm._del = true;
						}
						console.log('itmb: ', itm);

						o._del = true;
					} else {
						scope.$parent[scope.data].splice(index, 1);
					}
					scope.data_pivot = scope.$parent[scope.data];
					setTimeout(function () {
						scope.$apply();
					});
				};

				scope.print = function (o, index) {
					console.log(o, o.file);
				}

				console.log('jcUploadFileArray', scope.title);
			}
		}
	});
}());
