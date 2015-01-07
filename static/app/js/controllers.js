/* Controllers */

var ecAppControllers = angular.module('ecAppControllers', ['restangular']);

ecAppControllers.controller('readyCtrl', 
  ['$scope', 'Restangular',
  function($scope, Restangular) {
    'use strict';

    Restangular.all('list_types/').getList().then(function(types) {
      $scope.types = types;
    });
  }]);

ecAppControllers.controller('callCtrl', 
  ['$scope', '$routeParams', 'Restangular',
  function($scope, $routeParams, Restangular) {
    'use strict';

    Restangular.one('list_types/' + $routeParams.callCat + '/').get().then(
      function(callType) {
        $scope.callType = callType;
    });
  }]);