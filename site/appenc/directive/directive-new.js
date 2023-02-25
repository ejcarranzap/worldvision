(function () {
    'use strict';
    var app = angular.module('itxwebApp');

    app.directive('myTreePrint', function ($filter) {
		return {
			restrict: 'E',
			template: '<div class="col-md-12">' +
				'   <ul class="list-group">' +
				'   </ul>' +
				'</div>',
			replace: true,
			scope: {
				data: '@',
				fieldId: '@',
				fieldParent: '@',
				fieldText: '@',
				fieldChilds: '@',
				treeOptions: '='
			},
			link: function (scope, element, attrs, model) {
				console.log('This is Data...', scope.treeOptions);
				scope.el = $(element);
				scope.ul = $(scope.el.find('.list-group')[0]);
				angular.extend(scope.treeOptions, {
					render: function () {
						/*scope.ul.html(scope.getTree());*/
						return scope.getTree();
					},
					getTreeJson: function(){
						return scope.getTreeJson();
					},
					getTreeNodeById: function (id) {
						var node = scope.getTreeNodeById(id);
						/*scope.el.append('<h1>Node Found: ' + $filter('json')(node) + '</h1>');*/
						return node;
					},
					getNodeParentById: function (id) {
						var parent = scope.getNodeParentById(id);
						/*scope.el.append('<h1>Parent Found: ' + $filter('json')(parent) + '</h1>');*/
						return parent;
					},
					getAllNodeParentById: function (id) {
						var arr = scope.getAllNodeParentById(id);
						arr = arr.reverse();
						arr = scope.arrToTree(arr);						
						/*scope.el.append('<h1>Data: ' + $filter('json')(arr) + '</h1>');*/
						return arr;
					}
				});

				scope.arrToTree = function (arr) {
					var data = [];
					var aux = null;
					for (var i = 0; i < arr.length; i++) {
						var item = Object.assign({}, arr[i]);
						if (aux == null) {
							data.push(item);
							aux = data[0];
							aux.childs = [];
						} else {
							aux.childs.push(item);
							aux = aux.childs[0];
							aux.childs = [];
						}
					}
					return data;
				};

				scope.getAllNodeParentById = function (id) {
					var arr = [];
					var node = Object.assign({}, scope.getTreeNodeById(id));
					if (node) {
						node = Object.assign({}, node);
						delete node[scope.fieldChilds];
						arr.push(node);
					}
					/*delete node[scope.fieldChilds];*/
					while (node) {
						console.log('node', node);
						node = scope.getNodeParentById(node[scope.fieldId]);
						if (node) {
							node = Object.assign({}, node);
							delete node[scope.fieldChilds];
						}

						if (node) arr.push(node);
					}
					return arr;
				};

				scope.getNodeParentById = function (id) {
					var node = scope.getTreeNodeById(id);
					var parent = scope.getTreeNodeById(node[scope.fieldParent]);
					return parent;
				};

				scope.getTreeNodeById = function (id, data, parent) {
					if (!data) data = scope.$parent[scope.data];
					var childs = (parent == null ? data : parent[scope.fieldChilds])

					for (var i = 0; i < childs.length; i++) {
						var o = childs[i];
						if (o[scope.fieldId] == id) {
							return o;
						} else {
							if (o[scope.fieldChilds] && o[scope.fieldChilds].length > 0) {
								var ox = scope.getTreeNodeById(id, o[scope.fieldChilds]);
								if (ox) return ox;
							}
						}
					}

					return null;
				}

				scope.getTree = function (data, parent) {
					/*scope.el.html($filter('json')(scope.$parent[scope.data]));*/
					var html = '';
					if (!data) data = scope.$parent[scope.data];
					var childs = (parent == null ? data : parent[scope.fieldChilds]);
					angular.forEach(childs, function (o) {
						html = html + '<li class="list-group-item">';
						html = html + o[scope.fieldText];
						if (o.childs && o.childs.length > 0) {
							html = html + '<ul class="list-group">';
							html = html + scope.getTree(o.childs, o);
							html = html + '</ul>';
						}
						html = html + '</li>';
					});
					return html;
				};

				scope.getTreeJson = function (data, parent) {
					/*scope.el.html($filter('json')(scope.$parent[scope.data]));*/
					if (!data) data = scope.$parent[scope.data];
					return data;
				};
			}
		}
	});



    app.directive('myTimeLine', function () {
        return {
            restrict: 'A',
            scope: {
                title: '=',
                data: '@',
                titleField: '@',
                commentField: '@',
                dateField: '@',
            },
            replace: true,
            template: '<div class="col-md-12">' +
                '   <h4>{{title}}</h4>' +
                '   <ul class="timeline">' +
                '       <li ng-repeat="item in _data">' +
                /*'         <a>{{item | json}}</a>' +*/
                '           <a>{{item[fieldTitle]}}</a>' +
                '           <a class="float-right">{{item[dateField] | dateText}}</a>' +
                '           <p class="float-right">{{item[commentField]}}</p>' +
                '       </li>' +
                '   </ul>' +
                '</div>',
            link: function (scope, elem, attrs) {
                console.log('myTimeLine: ', scope.title);
                scope._data = [];
                scope._dataaux = [];

                scope.loadData = function () {
                    scope._data = scope.$parent[scope.data];
                    scope._dataaux = angular.copy(scope._data, scope._dataaux);
                };

                scope.$watchCollection(function () {
                    if (JSON.stringify(scope._data) === JSON.stringify(scope._dataaux)) {
                        /*console.log('MyTreeView items watch collection NO CHANGE');*/
                    } else {
                        /*console.log('MyTreeView items watch collection HAS CHANGE');*/
                        scope.loadData();
                    }

                    return scope._data;
                }, function () {

                });

                scope.loadData();
            }
        }
    });
}());