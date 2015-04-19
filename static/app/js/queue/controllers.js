/* Controllers */

var ecQueueControllers = angular.module('ecQueueControllers', []);


ecQueueControllers.controller('queueCtrl', 
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
                'inprogress': result.inprogress,
                'new': result.new,
                'queued': result.queued
              };
              $scope.listtypes[typeInfo.slug] = typeInfo;
            });
          });
        });
    };

    $scope.doqueue = function(data) {
      var slug = data.slug;
      ListTypeReport.doQueue(slug).then(
        function(result) {
          data.completed = result.completed;
          data.dequeued = result.dequeued;
          data.inprogress = result.inprogress;
          data.new = result.new;
          data.queued = result.queued;
          
          $scope.listtypes[slug] = data;
        });
    };

    $scope.listtypes = [];
    $scope.refresh();

  }]);