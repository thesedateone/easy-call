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


ecExportDirectives.directive('ecFileDownloadItem', function() {
  return {
    restrict: "A",
    scope: {
        'data': "=",
    },
    template: 
      '  {{ data.filename }}' +
      '  <a class="btn btn-default btn-xs pull-right" href="{{ data.URL }}" role="button">' +
      '    <i class="fa fa-cloud-download"></i> download' +
      '  </a>'
  };
});

