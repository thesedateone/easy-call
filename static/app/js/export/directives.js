/* Directives */

var ecExportDirectives = angular.module('ecExportDirectives', []);


ecExportDirectives.directive('ecReportRow', function() {
  return {
    restrict: "A",
    scope: {
        'data': "=",
    },
    template: 
      '  <th>{{ data.display }}</th>' +
      '  <td>{{ data.completed }}</td>' +
      '  <td>{{ data.dequeued }}</td>'
  };
});
