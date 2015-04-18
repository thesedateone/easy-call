/* Controllers */

var ecExportControllers = angular.module('ecExportControllers', []);


ecExportControllers.controller('exportCtrl', 
  ['$scope', 'ListType', 'ListTypeReport',
  function($scope, ListType, ListTypeReport) {

    $scope.refresh = function() {
      ListType.getData().then(
        function(list_types) {
          $scope.listtypes = {};
          list_types.forEach(function(element) {
            ListTypeReport.getData(element.slug).then(function(result) {
              var typeInfo = {
                'slug': element.slug,
                'display': element.display_name,
                'completed': result.completed,
                'dequeued': result.dequeued,
              };
              $scope.listtypes[typeInfo.slug] = typeInfo;
            });
          });
        });
    };

    $scope.listtypes = {};
    $scope.refresh();

  }]);