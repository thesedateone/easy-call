/* Directives */

var ecQueueDirectives = angular.module('ecQueueDirectives', []);


ecQueueDirectives.directive('ecReportRow', function() {
  return {
    restrict: "A",
    scope: {
        'data': "=",
        'queuefunc': "&",
    },
    template: 
      '  <th>{{ data.display }}</th>' +
      '  <td>{{ data.completed }}</td>' +
      '  <td>{{ data.dequeued }}</td>' +
      '  <td>{{ data.inprogress }}</td>' +
      '  <td>{{ data.new }}</td>' +
      '  <td class="info">{{ data.queued }}</td>' +
      '  <td>' +
      '    <button class="btn btn-sm btn-primary pull-right" type="button"' +
      '            ng-click="queue()">Queue</button>' +
      '  </td>',

    link: function (scope, element, attrs) {
      scope.queue = function() {
        scope.queuefunc({'slug': scope.data.slug});
      };
    }
  };
});
