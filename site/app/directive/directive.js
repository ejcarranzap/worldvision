(function () {
	'use strict';
	var app = angular.module('itxwebApp');

	app.directive('ngHandsonTableDirective', function () {
		return {
			restrict: 'A',
			scope: {
				data: '@',
				size: '=size',
				headers: '=headers',
				cols: '=cols',
				options: '=options',
				afterChangeFn: '&',
				afterOnCellMouseDownFn: '&',
				afterSelectionFn: '&',
				beforeRemoveRowFn: '&',
				afterCreateRowFn: '&'
			},
			replace: true,
			template: "<div class='handsontable' style=\"width:100%; height:{{size + 'px'}}; overflow: hidden;\"></div>",
			link: function (scope, elem, attrs) {
				/*console.log('ngHandsonTableDirective');*/
				setTimeout(function () {
					/*console.log(Handsontable.cellTypes);*/
					scope.selectedRowIndex = null;

					/*date*/
					scope.Date2Editor = Handsontable.editors.BaseEditor.prototype.extend();

					scope.Date2Editor.prototype.init = function () {
						var im = new Inputmask('99/99/9999 99:99:99');

						this.select = document.createElement('input');
						this.select.setAttribute('type', 'text');
						this.select.setAttribute('readonly', true);
						Handsontable.Dom.addClass(this.select, 'htSelect2Editor');
						this.select.style.display = 'none';
						this.instance.rootElement.appendChild(this.select);
						this.hiddenfield = document.createElement('input');
						this.hiddenfield.setAttribute("type", "text");
						this.hiddenfield.style.display = 'none';
						im.mask(this.hiddenfield);

						Handsontable.Dom.addClass(this.hiddenfield, 'htSelect2Editor');
						this.instance.rootElement.appendChild(this.hiddenfield);
					};

					scope.Date2Editor.prototype.prepare = function () {
						console.log('prepare');
						Handsontable.editors.BaseEditor.prototype.prepare.apply(this, arguments);
						if (Handsontable.dom) {
							Handsontable.dom.empty(this.select);
							Handsontable.dom.empty(this.hiddenfield);
						}

						var datetimepickerOptions = {
							lang: 'es',
							format: 'd/m/Y H:i:s',
							step: 10,
							/*minTime: '0:00',
							maxTime: '23:59',
							minDate: '+1970/01/02',
							maxDate: '+1970/05/01',*/
							dayOfWeekStart: 1, //week begins with monday
							onSelectDate: function (current) {
								/*initDaytimePicker(current);*/
							}
						};
						this.myPlugin = $(this.hiddenfield).datetimepicker(datetimepickerOptions);
					};

					scope.Date2Editor.prototype.getValue = function () {
						return this.select.value;
					};

					scope.Date2Editor.prototype.setValue = function (value) {
						/*$(this.select).datetimepicker('val',value);*/
						/*var formatValue = moment(value, 'YYYY/MM/DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss');*/
						this.select.value = value;
					};

					scope.Date2Editor.prototype.open = function () {
						console.log('open');
						var me = this;

						var newdata = moment(me.select.value, 'YYYY/MM/DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss');
						me.hiddenfield.value = newdata;
						me.hiddenfield.setAttribute("readonly", true);
						me.hiddenfield.select();
						me.hiddenfield.setSelectionRange(0, 0);

						var width = Handsontable.Dom.outerWidth(this.TD);
						var height = Handsontable.Dom.outerHeight(this.TD);
						var rootOffset = Handsontable.Dom.offset(this.instance.rootElement);
						var tdOffset = Handsontable.Dom.offset(this.TD);

						this.hiddenfield.style.height = height + 'px';
						this.hiddenfield.style.minWidth = width + 'px';

						this.hiddenfield.style.top = tdOffset.top - rootOffset.top + 'px';
						this.hiddenfield.style.left = tdOffset.left - rootOffset.left + 'px';
						this.hiddenfield.style.margin = '0px';
						this.hiddenfield.style.zIndex = '9999';

						this.hiddenfield.style.display = 'block';


						/*this.myPlugin[0].nextElementSibling.style.height = height + 'px';
						this.myPlugin[0].nextElementSibling.style.minWidth = width + 'px';
	
						this.myPlugin[0].nextElementSibling.style.top = tdOffset.top - rootOffset.top + 'px';
						this.myPlugin[0].nextElementSibling.style.left = tdOffset.left - rootOffset.left + 'px';
						this.myPlugin[0].nextElementSibling.style.margin = '0px';
						this.myPlugin[0].nextElementSibling.style.zIndex = '999';
						this.myPlugin[0].nextElementSibling.style.position = 'absolute';
						this.myPlugin[0].nextElementSibling.style.display = 'block';*/

						$(this.hiddenfield).on("change", function (e) {
							console.log('change');
							e.preventDefault();
							var newdata = moment(me.hiddenfield.value, 'DD/MM/YYYY HH:mm:ss').format('YYYY/MM/DD HH:mm:ss');
							me.select.value = newdata;
							scope.el.selectCell(scope.selectedRowIndex.row, scope.selectedRowIndex.col, scope.selectedRowIndex.row, scope.selectedRowIndex.col, true);
							$(this.hiddenfield).datetimepicker('close');
						});

						$(this.hiddenfield).datetimepicker('open');

						console.log(this.select.value);
						var formatValue = moment(this.select.value, 'YYYY/MM/DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss');
						console.log(formatValue);
						$(this.hiddenfield).datetimepicker('val', formatValue);
					};

					scope.Date2Editor.prototype.close = function () {
						$(this.hiddenfield).datetimepicker('destroy');
						this.hiddenfield.style.display = 'none';
					};

					scope.Date2Editor.prototype.focus = function () {
						this.hiddenfield.focus();
					};
					/*end date*/

					scope.Select2Editor = Handsontable.editors.BaseEditor.prototype.extend();

					scope.Select2Editor.prototype.init = function () {
						this.select = document.createElement('SELECT');
						Handsontable.Dom.addClass(this.select, 'htSelect2Editor');
						this.select.style.display = 'none';
						this.instance.rootElement.appendChild(this.select);
					};

					scope.Select2Editor.prototype.prepare = function () {
						console.log('prepare');
						Handsontable.editors.BaseEditor.prototype.prepare.apply(this, arguments);
						if (Handsontable.dom)
							Handsontable.dom.empty(this.select);

						var options = [];
						for (var i = 0; i < this.cellProperties.selectOptions.length; i++) {
							/*options.push({id: this.cellProperties.selectOptions[i].value, text: this.cellProperties.selectOptions[i].name});*/
							options.push(this.cellProperties.selectOptions[i]);
						}

						try {
							$(this.select).empty();
						} catch (e) {
							console.log('select2 destroy', e);
						}


						this.myPlugin = $(this.select).select2({
							data: options
						});
					};

					scope.Select2Editor.prototype.getValue = function () {
						return this.select.value;
					};

					scope.Select2Editor.prototype.setValue = function (value) {
						$(this.select).select2('val', value);
						this.select.value = value;
					};

					scope.Select2Editor.prototype.open = function () {
						var me = this;
						var width = Handsontable.Dom.outerWidth(this.TD);
						var height = Handsontable.Dom.outerHeight(this.TD);
						var rootOffset = Handsontable.Dom.offset(this.instance.rootElement);
						var tdOffset = Handsontable.Dom.offset(this.TD);

						/*this.select.style.height = height + 'px';
						this.select.style.minWidth = width + 'px';
	
						this.select.style.top = tdOffset.top - rootOffset.top + 'px';
						this.select.style.left = tdOffset.left - rootOffset.left + 'px';
						this.select.style.margin = '0px';
						this.select.style.zIndex = '999';

						this.select.style.display = 'block';*/


						this.myPlugin[0].nextElementSibling.style.height = height + 'px';
						this.myPlugin[0].nextElementSibling.style.minWidth = width + 'px';

						this.myPlugin[0].nextElementSibling.style.top = tdOffset.top - rootOffset.top + 'px';
						this.myPlugin[0].nextElementSibling.style.left = tdOffset.left - rootOffset.left + 'px';
						this.myPlugin[0].nextElementSibling.style.margin = '0px';
						this.myPlugin[0].nextElementSibling.style.zIndex = '999';
						this.myPlugin[0].nextElementSibling.style.position = 'absolute';
						this.myPlugin[0].nextElementSibling.style.display = 'block';

						$(this.select).on("select2.select", function (e) {
							e.preventDefault();
							me.myPlugin[0].nextElementSibling.style.display = 'none';
							scope.el.selectCell(scope.selectedRowIndex.row, scope.selectedRowIndex.col, scope.selectedRowIndex.row, scope.selectedRowIndex.col, true);
						});

						$(this.select).select2('open');
					};

					scope.Select2Editor.prototype.close = function () {
						$(this.select).select2('destroy');
						this.select.style.display = 'none';
					};

					scope.Select2Editor.prototype.focus = function () {
						this.select.focus();
					};

					scope.SpecialDateEditor = Handsontable.editors.TextEditor.prototype.extend();
					scope.SpecialDateEditor.prototype.createElements = function () {
						Handsontable.editors.TextEditor.prototype.createElements.apply(this, arguments);

						// You need to require/import the "inputmask" library
						var im = new Inputmask('9999/99/99');

						// Create password input and update relevant properties
						this.TEXTAREA = document.createElement('input');
						this.TEXTAREA.setAttribute('type', 'text');
						this.TEXTAREA.className = 'handsontableInput';
						im.mask(this.TEXTAREA);
						this.textareaStyle = this.TEXTAREA.style;
						this.textareaStyle.width = 0;
						this.textareaStyle.height = 0;

						// Replace textarea with password input
						if (Handsontable.dom)
							Handsontable.dom.empty(this.TEXTAREA_PARENT);
						this.TEXTAREA_PARENT.appendChild(this.TEXTAREA);

					};

					scope.SpecialDateEditor.prototype.getValue = function () {
						return this.TEXTAREA.value;
					};

					scope.SpecialDateEditor.prototype.setValue = function (newValue) {
						this.TEXTAREA.value = newValue;
					};

					scope.SpecialTimeEditor = Handsontable.editors.TextEditor.prototype.extend();
					scope.SpecialTimeEditor.prototype.createElements = function () {
						Handsontable.editors.TextEditor.prototype.createElements.apply(this, arguments);

						// You need to require/import the "inputmask" library
						var im = new Inputmask('99:99');

						// Create password input and update relevant properties
						this.TEXTAREA = document.createElement('input');
						this.TEXTAREA.setAttribute('type', 'text');
						this.TEXTAREA.className = 'handsontableInput';
						im.mask(this.TEXTAREA);
						this.textareaStyle = this.TEXTAREA.style;
						this.textareaStyle.width = 0;
						this.textareaStyle.height = 0;

						// Replace textarea with password input
						if (Handsontable.dom)
							Handsontable.dom.empty(this.TEXTAREA_PARENT);
						this.TEXTAREA_PARENT.appendChild(this.TEXTAREA);

					};


					scope.SelectEditor = Handsontable.editors.BaseEditor.prototype.extend();
					scope.SelectEditor.prototype.init = function () {
						this.select = document.createElement('SELECT');
						this.textareaStyle = this.select.style;
						this.textareaStyle.width = 0;
						this.textareaStyle.height = 0;
						Handsontable.Dom.addClass(this.select, 'htSelect2Editor');
						this.select.style.display = 'none';
						this.instance.rootElement.appendChild(this.select);
					};

					scope.SelectEditor.prototype.prepare = function () {

						Handsontable.editors.BaseEditor.prototype.prepare.apply(this, arguments);
						var selectOptions = this.cellProperties.selectOptions;
						var filterByProp = this.cellProperties.filterByProp;
						var options;

						if (filterByProp) {
							if (typeof selectOptions == 'function') {
								options = this.prepareOptions(selectOptions(this.row, this.col, this.prop))
							} else {
								options = this.prepareOptions(selectOptions, this.instance, filterByProp, this.row, this.col, this.prop);
							}
						} else {
							if (typeof selectOptions == 'function') {
								options = this.prepareOptions(selectOptions(this.row,
									this.col, this.prop))
							} else {
								options = this.prepareOptions(selectOptions);
							}
						}

						Handsontable.Dom.empty(this.select);

						for (var option in options) {
							if (options.hasOwnProperty(option)) {
								var optionElement = document.createElement('OPTION');
								optionElement.value = option;
								Handsontable.Dom.fastInnerHTML(optionElement, options[option]);
								this.select.appendChild(optionElement);
							}
						}
					};

					scope.SelectEditor.prototype.prepareOptions = function (optionsToPrepare, instance, filterByProp, row, col, prop) {

						var preparedOptions = {};
						/*console.log(optionsToPrepare);*/
						if (angular.isArray(optionsToPrepare)) {
							for (var i = 0, len = optionsToPrepare.length; i < len; i++) {
								if (!filterByProp) {
									preparedOptions[optionsToPrepare[i].id] = optionsToPrepare[i].text;
								} else {
									var propvalue = instance.getDataAtRowProp(row, filterByProp);
									if (optionsToPrepare[i][filterByProp] == propvalue) {
										preparedOptions[optionsToPrepare[i].id] = optionsToPrepare[i].text;
									}
								}
							}
						} else if (typeof optionsToPrepare == 'object') {
							preparedOptions = optionsToPrepare;
						}

						return preparedOptions;
					};

					scope.SelectEditor.prototype.getValue = function () {
						return this.select.value;
					};

					scope.SelectEditor.prototype.setValue = function (value) {
						this.select.value = value;
					};

					scope.SelectEditor.prototype.open = function () {
						var width = Handsontable.Dom.outerWidth(this.TD);
						var height = Handsontable.Dom.outerHeight(this.TD);
						var rootOffset = Handsontable.Dom.offset(this.instance.rootElement);
						var tdOffset = Handsontable.Dom.offset(this.TD);

						this.select.style.height = height + 'px';
						this.select.style.minWidth = width + 'px';

						this.select.style.top = tdOffset.top - rootOffset.top + 'px';
						this.select.style.left = tdOffset.left - rootOffset.left + 'px';
						this.select.style.margin = '0px';
						this.select.style.zIndex = '999';
						this.select.style.display = '';
					};

					scope.SelectEditor.prototype.close = function () {
						this.select.style.display = 'none';
					};

					scope.SelectEditor.prototype.focus = function () {
						this.select.focus();
					};

					scope.convert2dArrayToCsv = function (header, data) {
						console.log(header);
						console.log(data);

						// This is to avoid accidentally splitting the actual contents
						var tmpColDelim = String.fromCharCode(11), // vertical tab character
							tmpRowDelim = String.fromCharCode(0), // null character

							// actual delimiter characters for CSV format
							colDelim = ',',
							rowDelim = '\r\n';

						var csv1;
						csv1 = $.map(header, function (itm, index) {
							return itm;
						}).join(colDelim) + rowDelim;

						var csv2 = $.map(data, function (rval, index) {
							return $.map(rval, function (cval, jndex) {
								// escape double quotes
								var out = "";
								if (!!cval) {
									out = cval.toString();
								}
								return out;
							}).join(tmpColDelim);
						}).join(tmpRowDelim)
							.split(tmpRowDelim).join(rowDelim)
							.split(tmpColDelim).join(colDelim);

						/*console.log("CSV");
						console.log(csv1 + csv2);*/

						// Data URI
						//var uri = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);
						//window.open(uri);
						var uri = 'data:text/csv,' + encodeURIComponent(csv1 + csv2);
						var downloadLink = document.createElement("a");
						downloadLink.href = uri;
						downloadLink.download = "invcierreshist.csv";

						document.body.appendChild(downloadLink);
						downloadLink.click();
						document.body.removeChild(downloadLink);

					};

					angular.extend(scope.options, {
						exportToCsv: function () {
							var header = scope.el.getColHeader();
							var data = scope.el.getData();
							console.log(data);
							console.log(header);
							scope.convert2dArrayToCsv(header, data);
						}
					});

					angular.extend(scope.options, {
						render: function () {
							try {
								scope.el.destroy();
							} catch (e) {

							}

							scope.el = null;
							scope.loadItems();
							console.log('loadItems');
						}
					});

					angular.extend(scope.options, {
						selectCell: function () {
							if (scope.selectedRowIndex) {
								scope.el.selectCell(scope.selectedRowIndex.row, scope.selectedRowIndex.col, scope.selectedRowIndex.row, scope.selectedRowIndex.col, true);
							}
						}
					});

					scope.number = {
						editor: Handsontable.editors.NumericEditor,
						renderer: Handsontable.NumericRenderer,
						validator: Handsontable.NumericValidator
					};

					scope.time = {
						editor: scope.SpecialTimeEditor,
						renderer: Handsontable.renderers.TextRenderer
					};

					scope.fdate = {
						editor: scope.SpecialDateEditor,
						renderer: function (instance, td, row, col, prop, value, cellProperties) {
							var rendererText = '';
							/*console.log(value);*/
							rendererText = moment(value, 'YYYY/MM/DD').format(cellProperties.editformat);
							$(td).empty().append(rendererText);
						}
					};

					scope.select = {
						editor: scope.SelectEditor,
						renderer: function (instance, td, row, col, prop, value, cellProperties) {
							var rendererText = '';
							for (var i = 0; i < cellProperties.selectOptions.length; i++) {
								if (value == cellProperties.selectOptions[i].id) {
									rendererText = value + ' - ' + cellProperties.selectOptions[i].text;
								}
							}
							$(td).empty().append(rendererText);
						}
					};

					scope.select2 = {
						editor: scope.Select2Editor,
						renderer: function (instance, td, row, col, prop, value, cellProperties) {
							var rendererText = '';
							for (var i = 0; i < cellProperties.selectOptions.length; i++) {
								if (value == cellProperties.selectOptions[i].id) {
									rendererText = value + ' - ' + cellProperties.selectOptions[i].text;
								}
							}
							$(td).empty().append(rendererText);
						}
					};

					scope.date2 = {
						editor: scope.Date2Editor,
						renderer: function (instance, td, row, col, prop, value, cellProperties) {
							/*console.log(value);*/
							var rendererText = moment(value, 'YYYY/MM/DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss');
							$(td).empty().append(rendererText);
						}
					};

					scope.status = {
						editor: 'text',
						renderer: function (instance, td, row, col, prop, value, cellProperties) {
							/*console.log(value);*/
							if (parseInt(value) == 1) {
								$(td).css('background', '#6fd3cd');
								value = 'SI';
							} else {
								value = 'NO';
							}

							$(td).empty().append(value);
						}
					};

					if (!Handsontable.cellTypes['number'])
						Handsontable.cellTypes['number'] = scope.number;

					if (!Handsontable.cellTypes['time'])
						Handsontable.cellTypes['time'] = scope.time;

					if (!Handsontable.cellTypes['fdate'])
						Handsontable.cellTypes['fdate'] = scope.fdate;

					if (!Handsontable.cellTypes['select'])
						Handsontable.cellTypes['select'] = scope.select;

					if (!Handsontable.cellTypes['select2'])
						Handsontable.cellTypes['select2'] = scope.select2;

					if (!Handsontable.cellTypes['date2'])
						Handsontable.cellTypes['date2'] = scope.date2;

					if (!Handsontable.cellTypes['status'])
						Handsontable.cellTypes['status'] = scope.status;

					scope.loadItems = function () {
						if (!scope.el) {
							if (scope.el) {
								scope.el.destroy();
							}

							scope.items = scope.$parent[scope.data];
							console.log('directive items : ', scope.items);
							scope.el = $(elem);

							/*console.log('Not Handsontable');*/
							scope.el = Handsontable(scope.el[0], {
								/*data: Handsontable.helper.createSpreadsheetData(25, 3),*/
								data: scope.items,
								autoColumnSize: true,
								autoRowSize: true,
								manualColumnResize: true,
								manualRowResize: true,
								rowHeaders: true,
								colHeaders: scope.headers,
								columns: scope.cols,
								contextMenu: true,
								columnSorting: true,
								fixedColumnsLeft: 0,
								currentRowClassName: '',
								currentColClassName: '',
								mergeCells: scope.mergeCells,
								formulas: true,
								contextMenu: {
									items: {
										'row_above': {
											name: 'Agregar (Arriba)'
										},
										'row_below': {
											name: 'Agregar (Abajo)'
										},
										'remove_row': {
											name: 'Eliminar'
										}
									}
								},
								afterColumnResize: function () {
									/*console.log('afterColumnResize');*/
								},
								afterChange: function (changes, source) {
									var cg = changes,
										sr = source;

									scope.el = this;
									scope.el.render();

									if (cg)
										scope.afterChangeFn({
											changes: cg,
											source: sr,
											datarow: this.getDataAtRow(cg[0][0])
										});
								},
								afterOnCellMouseDown: function (event, cell) {
									try {
										var cg = cell;

										if (cg) {
											scope.afterOnCellMouseDownFn({
												datarow: this.getDataAtRow(cg.row),
												colname: this.getColHeader(cg.col),
												rowIndex: cg.row,
												colIndex: cg.col
											});
										}

									} catch (e) {
										console.log(e.message);
									}
								},
								afterSelection: function (row, col) {
									scope.afterSelectionFn({
										row: row,
										col: col
									});
									scope.selectedRowIndex = {
										row: row,
										col: col
									};
								},
								cells: function (row, col, prop) {

								},
								beforeRemoveRow: function (row, col) {
									var data = this.getDataAtRow(row)
									if (scope.beforeRemoveRowFn) {
										scope.beforeRemoveRowFn({
											row: row,
											col: col,
											datarow: data
										});
									}
								},
								afterCreateRow: function (row) {
									console.log(this);
									scope.afterCreateRowFn({
										row: row
									});
								}
							});
							/*console.log(typeof scope.el);*/
						} else {
							scope.el.updateSettings({
								data: scope.items,
								afterUpdateSettings: function () {
									scope.selectedRowIndex = (!scope.selectedRowIndex ? {} : scope.selectedRowIndex);
									if (scope.selectedRowIndex)
										scope.el.selectCell(scope.selectedRowIndex.row, scope.selectedRowIndex.col, scope.selectedRowIndex.row, scope.selectedRowIndex.col, true);
									scope.el.render();
								},
								afterLoadData: function () {
									scope.el.render();
								}
							});
						}
					};
					scope.loadItems();

					scope.$watchCollection(function () {
						return scope.items;
					}, function (newVal, oldVal) {
						if (newVal != oldVal) {
							scope.loadItems();
						}
					});
				}, 0);
			}
		}
	});

	app.filter('total', function () {
		return function (input, property, multiplier) {
			var i = input.length;
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
						},
						load: function () {
							scope.items = [];
							scope.loadTreeItems();
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
						scope.itemsAux = angular.copy(scope.$parent[scope.data], scope.itemsAux);

						scope.items = [];
						scope.items = angular.copy(scope.itemsAux, scope.items);
						console.log('tree new ', scope.items);
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

						scope.el.unbind("click").click(function () {
							/*alert('click');*/
							$('.skin-yellow .sidebar-menu .treeview-menu>li>a').each((idx, elem) => {
								if (elem != this) {
									elem.style = 'color: #b8c7ce!important';
								} else {
									elem.style = 'color: #f39c12!important';
								}

							});
						});

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
			template: '<input type="text" editable="false" ng-readonly="true" value="{{dtpDate | date: \'dd/MM/yyyy HH:mm:ss\'}}" class="form-control input-sm"/>',
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
							/*$targetSelects.find('input').attr('disabled', !scope.dtpenabled);*/
							return ngModel.$modelValue;
						},
						function (newValue) {
							/*$targetSelects.find('input').attr('disabled', !scope.dtpenabled);*/
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

	app.service('fileUpload', ['$http', '$window', function ($http, $window) {
		this.uploadFileToUrl = function (file, uploadUrl, img, src, model) {
			var fd = new FormData();
			fd.append('file', file);

			/*$('main').preloader();*/
			$http.post(uploadUrl, fd, {
				transformRequest: angular.identity,
				headers: {
					'Authorization': 'Bearer' + (!$window.localStorage['jwt'] ? '' : $window.localStorage['jwt']),
					'Content-Type': undefined
				},
				uploadEventHandlers: {
					progress: function (e) {
						if (e.lengthComputable) {
							/*console.log(e);*/
						}
					}
				}
			}).then(function (data) {
				/*$('main').preloader('remove');*/
				console.log('data upload: ', data);
				alert('Archivo subido exitosamente.');
				if (img && src) {
					console.log('Entro...', src);
					$(img).attr("src", src);
				}
			}).catch(function (error) {
				/*$('main').preloader('remove');*/
				alert('Error al subir el archivo.', error.msg);
			});
		}
	}]);

	app.directive('myUploadFileField', function (fileUpload) {
		return {
			restrict: 'AE',
			template: '<div class="col-md-12">' +
				'<div class="col-md-12"><img width="100px" height="100px" class="img-thumbnail" src="/uploads/{{value}}"></img></div>' +
				'<div class="col-md-12"><label for="">File:{{value}}</label></div>' +
				'<div class="col-md-12">' +
				'<input type="file" class="form-control-file" style="display:none;">' +
				'<button class="btn btn-primary" type="submit" style="margin-right:10px;">Buscar</button>' +
				'<button class="btn btn-primary hidden" type="submit" style="margin-right:10px;"><i class="fas fa-cloud-upload-alt"></i></button>' +
				'<button class="btn btn-primary" type="submit">Eliminar</button>' +
				'</div>' +
				'</div>',
			replace: true,
			require: 'ngModel',
			scope: {

			},
			link: function (scope, elem, attr, model) {
				scope.el = $(elem);
				scope.value = null;
				scope.file = null;
				scope.input = $(scope.el.find('input[type=file]')[0]);
				scope.btn1 = $(scope.el.find('button')[0]);
				scope.btn2 = $(scope.el.find('button')[1]);
				scope.btn3 = $(scope.el.find('button')[2]);
				scope.img = scope.el.find('img')[0];
				/*console.log(scope.img);*/

				$(scope.img).on('error', function () {
					/*console.log('imgonerror');*/
					$(this).attr("src", "/uploads/ic_broken.png");
				});

				$(scope.img).click(function (evt) {
					console.log('imageclick:', $(this).attr('src'));
					$.fancybox.open('<div class="message"><img src="/uploads/' + scope.value + '"></img></div>');
				});

				scope.btn1.click(function (evt) {
					scope.input.click();
				});
				scope.btn2.click(function (evt) {
					if (scope.file) {
						var src = "/uploads/" + scope.value + "?t=" + (new Date()).getTime();
						fileUpload.uploadFileToUrl(scope.file, '/upload', scope.img, src, model);
					}
				});
				scope.btn3.click(function (evt) {
					scope.clear();
				});

				scope.input.change(function (e) {
					scope.file = e.target.files[0];
					/*console.log('inputonchange:',scope.file);*/
					model.$setViewValue(scope.file.name.toLowerCase());
					var src = "/uploads/" + scope.value + "?t=" + (new Date()).getTime();
					fileUpload.uploadFileToUrl(scope.file, '/upload', scope.img, src);
				});

				scope.clear = function () {
					scope.file = null;
					scope.value = null;
					model.$setViewValue(null);
				};

				scope.$watch(function () { return model.$modelValue; }, function (newValue) {
					scope.value = model.$modelValue;
					if (!scope.value) {
						model.$setViewValue('ic_broken.png');
						scope.value = model.$modelValue;
					}
					console.log('modelvalue:', scope.value)
				});
			}
		}
	});

}());
