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

    $scope.dequeue = function(id) {
      CallRecord.one(id).get().then(
        function(rec) {
          rec.status = 'dq';
          rec.put({}, {"X-CSRFToken": csrf_token}).then(
            function (response) {
              doSearch($scope.searchString);
            }, function (response) {
              console.log("Error with status code", response.status);
            });
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