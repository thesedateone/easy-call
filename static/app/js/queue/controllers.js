/* Controllers */

var ecQueueControllers = angular.module('ecQueueControllers', []);


ecQueueControllers.controller('queueCtrl', 
  ['$scope',
  function($scope) {

    $scope.doqueue = function(key) {
      console.log("key: " + key);
    };

    $scope.refresh = function() {
      console.log("refresh");
    };

    $scope.listtypes = [
      {
        'key': 'littlepony',
        'display': 'My Little Pony',
        'completed': 50,
        'dequeued': 8,
        'inprogress': 34,
        'new': 45,
        'queued': 22
      },
      {
        'key': 'allthings',
        'display': 'All The Things',
        'completed': 10,
        'dequeued': 0,
        'inprogress': 15,
        'new': 1000,
        'queued': 1000
      },
      {
        'key': 'foo',
        'display': 'Foo Type',
        'completed': 50,
        'dequeued': 8,
        'inprogress': 34,
        'new': 45,
        'queued': 22
      },
    ];

  }]);