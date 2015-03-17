/* Directives */

var ecQueueDirectives = angular.module('ecQueueDirectives', []);


ecQueueDirectives.directive('ecFoo', function() {
  return {
    restrict: "E",
    scope: {
        'data': "=",
    },
    template: 
      '<p>{{ data }}</p>',

    link: function (scope, element, attrs) {
    }
  };
});
