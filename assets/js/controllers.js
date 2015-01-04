/* Controllers */

var ecAppControllers = angular.module('ecAppControllers', []);

ecAppControllers.controller('readyCtrl', ['$scope',
  function($scope) {
    'use strict';
    $scope.types = [
      {'name': 'boo',
       'category': 'boo'},
      {'name': 'foo',
       'category': 'foo'},
      {'name': 'bar',
       'category': 'bar'}
    ];
  }]);

ecAppControllers.controller('callCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    'use strict';
    $scope.message = "Call some people!";
    $scope.calltype = $routeParams.callCat;
  }]);