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


ecExportServices.factory('ExportedFiles', 
  ['$q', 'Restangular',
  function($q, Restangular) {
    return {
      getData: function(slug) {
        var deferred = $q.defer();
        Restangular.all('call_records/').one('exported/').get().then(function(result) {
          deferred.resolve(result);
        });
        return deferred.promise;
      },

      doExport: function(slug) {
        var deferred = $q.defer();
        Restangular.all('call_records/').one('exported/')
                    .put({}, {"X-CSRFToken": csrf_token}).then(function(result) {
          deferred.resolve(result);
        });
        return deferred.promise;
      },
    };
}]);