/* Services */

var ecSearchServices = angular.module('ecSearchServices', ['restangular']);


ecSearchServices.factory('CallRecord', 
  ['$q', 'Restangular',
  function($q, Restangular) {
    return {
      getData: function(searchstring) {
        var deferred = $q.defer();
        Restangular.all('call_records/')
                   .getList({'search': searchstring})
                   .then(function(result) {
          deferred.resolve(result);
        });
        return deferred.promise;
      }
    };
}]);
