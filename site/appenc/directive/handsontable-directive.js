(function() {
  'use strict';
  var app = angular.module('itxwebApp');

  app.directive('handsontable', function($timeout, $filter) {
    return {
      restrict: 'A',
      scope: {
        data: '=',
        headers: '=',
        mergeCells: '=',
        onCellChangeFn: '&',
        onCellClickFn: '&',
        EventTrigger: '=eventTrigger',
        HandsonSize: '=handsonSize'
      },
      replace: true,
      template: "<div style=\"width:100%; height:{{HandsonSize + 'px'}}; overflow: hidden;\"></div>",
      link: function(scope, elem, attrs) {
        console.log('size handson '+scope.HandsonSize);
        if(!scope.HandsonSize) scope.HandsonSize = 150;
        scope.colWidths = [];
        scope.originalColWidths = [];
        scope.autoColWidths = [];

        scope.el = $(elem);

        /*scope.EventTrigger.listen(function(args) {
          scope.loadData(args);
        });*/

        scope.EventTrigger.listen(function(args) {
          if(args == 'render'){
            console.log('Render...');
            if(scope.el.render)
            scope.el.render();
          }else{
            scope.loadData(args);
          }
        });

        scope.hotrender = function(instance, td, row, col, prop, value, cellProperties) {
          if (td.className != 'formula') {
            Handsontable.renderers.TextRenderer.apply(scope.el, arguments);
            if (prop == 'Genero' && value == 'M') {
              td.className = 'hot-bg-blue';
            }
            if (prop == 'Genero' && value == 'F') {
              td.className = 'hot-bg-pink';
            }
          }
        };

        scope.hotrendereditable = function(instance, td, row, col, prop, value, cellProperties) {
          if (td.className != 'formula') {
            Handsontable.renderers.TextRenderer.apply(scope.el, arguments);
            td.className = 'hot-bg-gray';
          }
        };

        scope.hotrenderhidden = function(instance, td, row, col, prop, value, cellProperties) {
          if (td.className != 'formula' && scope.colWidths[col] != 0.1) {
            Handsontable.renderers.TextRenderer.apply(scope.el, arguments);
            scope.colWidths[col] = 0.1;
          }
        };

        scope.hotrenderstatic = function(instance, td, row, col, prop, value, cellProperties) {
          if (td.className != 'formula') {
            Handsontable.renderers.TextRenderer.apply(scope.el, arguments);
            td.className = 'hot-bg-green';
          }
        };

        scope.hotrendercustom = function(instance, td, row, col, prop, value, cellProperties) {
          Handsontable.cellTypes['formula'].renderer.apply(this, arguments);
        };

        scope.hotrenderbutton = function(instance, td, row, col, prop, value, cellProperties) {
          var $button = $('<button>');
          $button.html(value).css('width', '100%');
          $(td).empty().append($button);
        };

        scope.$on('hotupdateExport', function(event, args) {
          /*console.log('hotupdateExport');*/
          var tableData = scope.el.getData();
          console.log(tableData);
          var csv = scope.convert2dArrayToCsv(tableData);
          window.open('data:application/vnd.ms-excel,' + encodeURIComponent(csv));
        });

        Handsontable.helper.isArray = function(obj) {
          return Array.isArray ? Array.isArray(obj) : Object.prototype.toString.call(obj) == '[object Array]';
        };

        scope.SpecialDateEditor = Handsontable.editors.TextEditor.prototype.extend();
        scope.SpecialDateEditor.prototype.createElements = function () {
            Handsontable.editors.TextEditor.prototype.createElements.apply(this, arguments);

           // You need to require/import the "inputmask" library
            var im = new Inputmask('99/99/9999');

            // Create password input and update relevant properties
            this.TEXTAREA = document.createElement('input');
            this.TEXTAREA.setAttribute('type', 'text');
            this.TEXTAREA.className = 'handsontableInput';
            im.mask(this.TEXTAREA);
            this.textareaStyle = this.TEXTAREA.style;
            this.textareaStyle.width = 0;
            this.textareaStyle.height = 0;

            // Replace textarea with password input
            if(Handsontable.dom)
            Handsontable.dom.empty(this.TEXTAREA_PARENT);
            this.TEXTAREA_PARENT.appendChild(this.TEXTAREA);

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
            if(Handsontable.dom)
            Handsontable.dom.empty(this.TEXTAREA_PARENT);
            this.TEXTAREA_PARENT.appendChild(this.TEXTAREA);

        };

        scope.SelectEditor = Handsontable.editors.BaseEditor.prototype.extend();
        scope.SelectEditor.prototype.init = function() {
          this.select = document.createElement('SELECT');
          Handsontable.Dom.addClass(this.select, 'htSelectEditor');
          this.select.style.display = 'none';
          this.instance.rootElement.appendChild(this.select);
        };

        scope.SelectEditor.prototype.prepare = function() {

          Handsontable.editors.BaseEditor.prototype.prepare.apply(this, arguments);
          var selectOptions = this.cellProperties.selectOptions;
          var options;

          if (typeof selectOptions == 'function') {
            options = this.prepareOptions(selectOptions(this.row,
              this.col, this.prop))
          } else {
            options = this.prepareOptions(selectOptions);
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

        scope.SelectEditor.prototype.prepareOptions = function(optionsToPrepare) {

          var preparedOptions = {};

          if (Handsontable.helper.isArray(optionsToPrepare)) {
            for (var i = 0, len = optionsToPrepare.length; i < len; i++) {
              preparedOptions[optionsToPrepare[i].value] = optionsToPrepare[i].name;
            }
          } else if (typeof optionsToPrepare == 'object') {
            preparedOptions = optionsToPrepare;
          }

          return preparedOptions;
        };

        scope.SelectEditor.prototype.getValue = function() {
          return this.select.value;
        };

        scope.SelectEditor.prototype.setValue = function(value) {
          this.select.value = value;
        };

        scope.SelectEditor.prototype.open = function() {
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

          this.select.style.display = 'block';
        };

        scope.SelectEditor.prototype.close = function() {
          this.select.style.display = 'none';
        };

        scope.SelectEditor.prototype.focus = function() {
          this.select.focus();
        };

        scope.convert2dArrayToCsv = function(arr) {
          return arr.reduce(function(csvString, row) {
            csvString += row.join(',');
            csvString += ';';
            return csvString;
          }, '');
        };

        scope.coverRenderer = function(instance, td, row, col, prop, value, cellProperties) {
          var escaped = Handsontable.helper.stringify(value),
            img;

          if (escaped.indexOf('http') === 0) {
            img = document.createElement('IMG');
            img.src = value;

            Handsontable.Dom.addEvent(img, 'mousedown', function(e) {
              e.preventDefault(); // prevent selection quirk
            });

            Handsontable.Dom.empty(td);
            td.appendChild(img);
          } else {
            // render as text
            Handsontable.renderers.TextRenderer.apply(this, arguments);
          }

          return td;
        };

        scope.getColumnsWidth = function(hiddenCols, Cols) {
          /*console.log('getColumnsWidth');
          console.log(hiddenCols);*/
          var pdata = scope.el.getData();
          scope.autoColWidths = [];

          for (var f = 0; f < pdata.length; f++) {
            for (var c = 0; c < pdata[f].length; c++) {
              var header = scope.el.getColHeader(c);
              var cellValue = (!scope.el.getDataAtCell(f, c) ? '' : scope.el.getDataAtCell(f, c));
              var cellLength = cellValue.length;
              if (header.length > cellLength) {
                cellLength = header.length;
              }

              if (f == 0) {
                scope.autoColWidths[c] = parseFloat(!cellLength ? 50 : cellLength * 10);
              } else {
                if (scope.autoColWidths[c] < cellLength) {
                  scope.autoColWidths[c] = parseFloat(!cellLength ? 50 : cellLength * 10);
                }
              }
            }
          }


          if (pdata[0])
            angular.forEach(pdata[0], function(value, key){
              var isColHidden = false;
              try {
                for (var y = 0; y < hiddenCols.length; y++) {
                  if (key == hiddenCols[y]) {
                    isColHidden = true;
                    console.log('isColHidden');
                  }
                }
              } catch (e) {
                console.log(e.stack);
              }

              if (isColHidden == false) {

              } else {
                var i = 0;
                angular.forEach(Cols, function(itm){
                  if(itm.data == key){
                      scope.autoColWidths[i] = 0.1;
                  }
                  i++;
                })
              }
            });

          return scope.autoColWidths;
        };

        scope.loadData = function(args) {
          scope.colWidths = [];
          scope.originalColWidths = [];

          try {
            scope.el.destroy();
          } catch (e) {

          }

          scope.el = $(elem);
          scope.el = Handsontable(scope.el[0], {
            rowHeaders: true,
            contextMenu: false,
            data: args.data,
            colHeaders: args.headers,
            columns: args.columns,
            fixedColumnsLeft: 0,
            mergeCells: scope.mergeCells,
            afterChange: function(changes, source) {
              var cg = changes,
                sr = source;

              /*scope.el.selectCell(cg[0][0], cg[0][1]);*/
              scope.el = this;
              scope.el.render();

              if (cg)
                scope.onCellChangeFn({
                  changes: cg,
                  source: sr,
                  datarow: this.getDataAtRow(cg[0][0])
                });
              this.updateSettings({
                colWidths: scope.getColumnsWidth(args.hiddenCols, args.columns)
              });
              scope.el = this;
              scope.el.render();


            },
            afterOnCellMouseDown: function(event, cell) {
              try {
                var cg = cell;
                /*console.log(cg);
                scope.el = this;
                scope.el.render();*/

                if (cg){
                  scope.onCellClickFn({
                    datarow: this.getDataAtRow(cg.row),
                    colname: this.getColHeader(cg.col),
                    rowIndex: cg.row,
                    colIndex: cg.col
                  });
                  scope.el = this;
                  scope.el.render();
                }

              } catch (e) {
                console.log(e.message);
              }
            },
            formulas: true
          });

          scope.originalColWidths = scope.getColumnsWidth(args.hiddenCols, args.columns);
          scope.el.updateSettings({
            autoColumnSize: true,
            autoRowSize: true,
            manualColumnResize: true,
            manualRowResize: true,
            colWidths: scope.originalColWidths,
            cells: function(row, col, prop) {
              var cellProperties = {};
              if (!args.editors) {
                var options = {};
                options.activo = [];
                options.activo.push({
                  value: 1,
                  name: 'ACTIVO'
                });
                options.activo.push({
                  value: 0,
                  name: 'INACTIVO'
                });
                options.sexo = [];
                options.sexo.push({
                  value: 1,
                  name: 'M'
                });
                options.sexo.push({
                  value: 0,
                  name: 'F'
                });

                if (prop == 'resultado') {
                  var tipo = this.instance.getDataAtRowProp(row, 'tipo').toLowerCase();

                  if (tipo == 'texto') {
                    cellProperties.editor = 'text';
                    return cellProperties;
                  }

                  if (tipo == 'cualitativa') {
                    cellProperties.editor = scope.SelectEditor;
                    cellProperties.selectOptions = args.options;
                    return cellProperties;
                  }

                  if (tipo == 'cuantitativa') {
                    cellProperties.renderer = Handsontable.NumericRenderer,
                      cellProperties.editor = Handsontable.editors.TextEditor,
                      cellProperties.validator = Handsontable.NumericValidator
                    return cellProperties;
                  }

                }

                if (prop == 'rango') {
                  cellProperties.editor = 'text';
                  return cellProperties;
                }

                if (prop == 'eliminar' || prop == 'agregar') {
                  cellProperties.renderer = scope.hotrenderbutton;
                  return cellProperties;
                }

                if (prop == 'Id_referencia') {
                  cellProperties.renderer = Handsontable.NumericRenderer,
                    cellProperties.editor = Handsontable.editors.TextEditor,
                    cellProperties.validator = Handsontable.NumericValidator
                  return cellProperties;
                }

                if (prop == 'Id_prueba') {
                  cellProperties.renderer = scope.hotrenderhidden;
                  return cellProperties;
                }

                if (prop == 'Id_medida') {
                  cellProperties.editor = scope.SelectEditor;
                  cellProperties.selectOptions = args.options;
                  cellProperties.renderer = function(instance, td, row, col, prop, value, cellProperties) {
                    var rendererText = '';
                    for (var i = 0; i < args.options.length; i++) {
                      if (value == args.options[i].value) {
                        rendererText = args.options[i].name;
                      }
                    }
                    $(td).empty().append(rendererText);
                  };
                  return cellProperties;
                }

                if (prop == 'estado' || prop == 'muestra_rango' || prop == 'muestra_edad') {
                  cellProperties.editor = scope.SelectEditor;
                  cellProperties.selectOptions = options.activo;
                  cellProperties.renderer = function(instance, td, row, col, prop, value, cellProperties) {
                    var rendererText = '';
                    for (var i = 0; i < options.activo.length; i++) {
                      if (value == options.activo[i].value) {
                        rendererText = options.activo[i].name;
                      }
                    }
                    $(td).empty().append(rendererText);
                  };
                  return cellProperties;
                }

                if (prop == 'Id_sexo') {
                  cellProperties.editor = scope.SelectEditor;
                  cellProperties.selectOptions = options.sexo;
                  cellProperties.renderer = function(instance, td, row, col, prop, value, cellProperties) {
                    var rendererText = '';
                    for (var i = 0; i < options.sexo.length; i++) {
                      if (value == options.sexo[i].value) {
                        rendererText = options.sexo[i].name;
                      }
                    }
                    $(td).empty().append(rendererText);
                  };
                  return cellProperties;
                }

                if (prop == 'simbolo') {
                  cellProperties.editor = 'text';
                  return cellProperties;
                }

                if (prop == 'minimo' || prop == 'maximo' || prop == 'edad_minimo' || prop == 'edad_maximo') {
                  cellProperties.renderer = Handsontable.NumericRenderer,
                    cellProperties.editor = Handsontable.editors.TextEditor,
                    cellProperties.validator = Handsontable.NumericValidator
                  return cellProperties;
                }
              } else {
                var seditor = $filter('filter')(args.editors, function(itm) {
                  if (angular.isArray(itm.name)) {
                    return (itm.name.indexOf(prop) > -1);
                  } else {
                    return (itm.name == prop);
                  }
                });

                if (seditor) {
                  if (seditor.length > 0) {
                    if (seditor[0].type == 'select') {
                      /*cellProperties.editor = scope.SelectEditor;
                      cellProperties.selectOptions = seditor[0].options;
                      cellProperties.renderer = function(instance, td, row, col, prop, value, cellProperties) {
                        var rendererText = '';
                        for (var i = 0; i < seditor[0].options.length; i++) {
                          if (value == seditor[0].options[i].value) {
                            rendererText = seditor[0].options[i].name;
                          }
                        }
                        $(td).empty().append(rendererText);
                      };*/

                      for(var x = 0; x < seditor[0].options.length; x++){
                        seditor[0].options[x].id = seditor[0].options[x].value;
                        seditor[0].options[x].text = seditor[0].options[x].name;
                      }

                      /*console.log(seditor[0].name);
                      console.log(seditor[0].options);*/
                      cellProperties.data = seditor[0].name; // from datasource
                      cellProperties.editor = 'select2';
                      cellProperties.width = '200px';
                      cellProperties.select2Options = { // these options are the select2 initialization options
                              data: seditor[0].options,
                              dropdownAutoWidth: true,
                              allowClear: true,
                              width: 'resolve'
                      };
                      cellProperties.renderer = function(instance, td, row, col, prop, value, cellProperties)
                      {
                        var rendererText = '';
                        for (var i = 0; i < seditor[0].options.length; i++) {
                          if (value == seditor[0].options[i].value) {
                            rendererText = seditor[0].options[i].name;
                          }
                        }
                        $(td).empty().append(rendererText);
                      };
                      return cellProperties;
                    }
                    if (seditor[0].type == 'vencido') {
                      cellProperties.editor = false;
                      cellProperties.renderer = function(instance, td, row, col, prop, value, cellProperties) {
                        var escaped = value;
                        if(escaped == 'VENCIDO')
                        td.style.background = 'red';
                        return td;
                      };
                      return cellProperties;
                    }
                    if (seditor[0].type == 'text') {
                      cellProperties.editor = 'text';
                      return cellProperties;
                    }
                    if (seditor[0].type == 'number') {
                        cellProperties.renderer = seditor[0].renderer;
                        if(!seditor[0].renderer){
                          cellProperties.renderer = function(instance, td, row, col, prop, value, cellProperties) {
                            var escaped = parseFloat(value);
                            td.innerHTML = $filter('currency')(escaped,'',2);
                            return td;
                          };
                        }
                        if(seditor[0].enable != false){
                          cellProperties.editor = Handsontable.editors.TextEditor;
                          cellProperties.validator = Handsontable.NumericValidator;
                        }
                      return cellProperties;
                    }
                    if (seditor[0].type == 'date') {
                      /*cellProperties.editor = 'date',
                      cellProperties.dateFormat = 'YYYY-MM-DD';
                      cellProperties.renderer = function(instance, td, row, col, prop, value, cellProperties){
                        var rmoment = moment(value,'YYYY-MM-DD');
                        var rdate = rmoment.format('DD/MMM/YYYY');
                        Handsontable.Dom.empty(td);
                        td.innerHTML = rdate;
                        return td;
                      };*/
                      cellProperties.editor = scope.SpecialDateEditor;
                      return cellProperties;
                    }
                    if (seditor[0].type == 'time') {
                        cellProperties.editor = scope.SpecialTimeEditor;
                        return cellProperties;
                    }
                    if (seditor[0].type == 'image') {
                      cellProperties.renderer = scope.coverRenderer;
                      cellProperties.editor = false;
                      return cellProperties;
                    }
                  }
                }
              }

              cellProperties.editor = false;
              return cellProperties;

            },
            afterUpdateSettings: function() {
              console.log('after update settings.');
              scope.el.render();
            },
            afterLoadData: function() {
              this.instance.render();
            }
          });

          scope.el.render();

        };
      }
    }
  });

}());
