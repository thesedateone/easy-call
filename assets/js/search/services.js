/* Services */

var ecSearchServices = angular.module('ecSearchServices', ['restangular']);


ecSearchServices.factory('CallRecord', 
  ['Restangular',
  function(Restangular) {
    return Restangular.service('call_records');
}]);

