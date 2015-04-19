/* Controllers */

var ecExportControllers = angular.module('ecExportControllers', []);


ecExportControllers.controller('exportCtrl', 
  ['$scope', 'ListType', 'ListTypeReport', 'ExportedFiles',
  function($scope, ListType, ListTypeReport, ExportedFiles) {

    $scope.refresh = function() {
      $scope.getExportableReport();
      $scope.getExportedFiles();
    };

    $scope.getExportableReport = function() {
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

    $scope.getExportedFiles = function() {
      ExportedFiles.getData().then(
        function(files) {
          $scope.updateFilesToDownload(files);
        });
    };

    $scope.doExport = function() {
      ExportedFiles.doExport().then(
        function(files) {
          $scope.updateFilesToDownload(files);
          $scope.getExportableReport();
        });
    };

    $scope.updateFilesToDownload = function(files) {
      $scope.filesToDownload = {};
      files.forEach(
        function(element) {
          var thefile = {
            'filename': element.filename,
            'URL': element.URL
          };
          $scope.filesToDownload[element.filename] = thefile;
        });
    };

    $scope.listtypes = {};
    $scope.filesToDownload = {};
    $scope.refresh();

  }]);