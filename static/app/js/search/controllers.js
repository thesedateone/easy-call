/* Controllers */

var ecSearchControllers = angular.module('ecSearchControllers', ['restangular']);


ecSearchControllers.controller('searchCtrl', 
  ['$scope', 'CallRecord',
  function($scope, CallRecord) {

    var doSearch = function(searchstring) {
      CallRecord.getList({'search': searchstring}).then(
        function(call_records) {
          $scope.data = call_records;
        });
    };

    $scope.onChange = function() {
      if ($scope.searchString.length > 2) {
        doSearch($scope.searchString);
      } else {
        $scope.data = {};
      };
    };

    $scope.noresults = true;

    $scope.$watch('data', function(newVal, oldVal){
      if (jQuery.isEmptyObject(newVal)) {
        $scope.noresults = true;
      } else {
        $scope.noresults = false;
      };
    });

  }]);