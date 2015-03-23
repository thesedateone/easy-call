/* Services and Factories */

var ecQueueServices = angular.module('ecQueueServices', ['restangular']);


ecQueueServices.factory('ListType', 
  ['$q', 'Restangular',
  function($q, Restangular) {
    return {
      getData: function() {
        var deferred = $q.defer();
        Restangular.all('list_types/').getList().then(function(result) {
          deferred.resolve(result);
        });
        return deferred.promise;
      }
    };
}]);


ecQueueServices.factory('ListTypeReport', 
  ['$q', 'Restangular',
  function($q, Restangular) {
    return {
      getData: function(slug) {
        var deferred = $q.defer();
        Restangular.all('list_types/').one(slug, 'report').get().then(function(result) {
          deferred.resolve(result);
        });
        return deferred.promise;
      }
    };
}]);