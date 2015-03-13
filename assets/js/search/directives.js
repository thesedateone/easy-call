/* Directives */

var ecSearchDirectives = angular.module('ecSearchDirectives', []);


ecSearchDirectives.directive('ecFoo', function() {
  return {
    restrict: "E",
    scope: {
    },
    template: '<p>foo</p>'
  };
});