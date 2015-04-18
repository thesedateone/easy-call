/* Services and Factories */

var ecExportServices = angular.module('ecExportServices', ['restangular']);


// ecExportServices.factory('ListType', 
//   ['$q', 'Restangular',
//   function($q, Restangular) {
//     return {
//       getData: function() {
//         var deferred = $q.defer();
//         Restangular.all('list_types/').getList().then(function(result) {
//           deferred.resolve(result);
//         });
//         return deferred.promise;
//       }
//     };
// }]);