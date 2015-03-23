/* Controllers */

var ecQueueControllers = angular.module('ecQueueControllers', []);


ecQueueControllers.controller('queueCtrl', 
  ['$scope', 'ListType', 'ListTypeReport',
  function($scope, ListType, ListTypeReport) {

    $scope.doqueue = function(slug) {
      console.log("slug: " + slug);
    };

    $scope.refresh = function() {
      ListType.getData().then(
        function(list_types) {
          $scope.listtypes = [];
          list_types.forEach(function(element) {
            ListTypeReport.getData(element.slug).then(function(result) {
              var typeInfo = {
                'slug': element.slug,
                'display': element.display_name,
                'completed': result.completed,
                'dequeued': result.dequeued,
                'inprogress': result.inprogress,
                'new': result.new,
                'queued': result.queued
              };
              $scope.listtypes.push(typeInfo);
            });
          });
        });
    };

    $scope.listtypes = [];
    $scope.refresh();

    // $scope.listtypes = [
    //   {
    //     'slug': 'littlepony',
    //     'display': 'My Little Pony',
    //     'completed': 50,
    //     'dequeued': 8,
    //     'inprogress': 34,
    //     'new': 45,
    //     'queued': 22
    //   },
    //   {
    //     'slug': 'allthings',
    //     'display': 'All The Things',
    //     'completed': 10,
    //     'dequeued': 0,
    //     'inprogress': 15,
    //     'new': 1000,
    //     'queued': 1000
    //   },
    //   {
    //     'slug': 'foo',
    //     'display': 'Foo Type',
    //     'completed': 50,
    //     'dequeued': 8,
    //     'inprogress': 34,
    //     'new': 45,
    //     'queued': 22
    //   },
    // ];

  }]);