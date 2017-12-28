angular.module('web-editor', ['ui.tree'])
	.directive('webEditor', function () {
		return {
			templateUrl: "web-editor.html",
			scope: {
				ngModel: '='
			},
			link: function (scope) {
				scope.$webEditor = scope;
			}
		}
	});
