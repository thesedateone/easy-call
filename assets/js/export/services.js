/* Services and Factories */

var ecExportServices = angular.module('ecExportServices', ['restangular']);


ecExportServices.factory('ListType', 
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


ecExportServices.factory('ListTypeReport', 
  ['$q', 'Restangular',
  function($q, Restangular) {
    return {
      getData: function(slug) {
        var deferred = $q.defer();
        Restangular.all('list_types/').one(slug + '/report/').get().then(function(result) {
          deferred.resolve(result);
        });
        return deferred.promise;
      },
    };
}]);