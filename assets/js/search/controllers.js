/* Controllers */

var ecSearchControllers = angular.module('ecSearchControllers', ['restangular']);


ecSearchControllers.controller('searchCtrl', 
  ['$scope', 'Restangular', '$q',
  function($scope, Restangular, $q) {
    $scope.foo = 'foo';
  }]);