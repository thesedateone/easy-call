/* Controllers */

var ecAppControllers = angular.module('ecAppControllers', ['restangular']);


ecAppControllers.controller('readyCtrl', 
  ['$scope', 'Restangular', '$q',
  function($scope, Restangular, $q) {
    'use strict';

    Restangular.all('list_types/').getList().then(function(types) {
      $scope.types = types;
    });
  }]);


ecAppControllers.controller('callCtrl', 
  ['$scope', '$routeParams', 'Restangular', '$q',
  function($scope, $routeParams, Restangular, $q) {
    'use strict';

    Restangular.one('list_types/' + $routeParams.callCat + '/').get().then(
      function(callType) {
        $scope.callType = callType;
    });

    $scope.getNextRecord = function() {
      var deferred = $q.defer();

      var record = Restangular.one('call_records/' + $routeParams.callCat + '/next/');
      record.get().then(
        function(demographics) {
          $scope.demographics = demographics;
          deferred.resolve();
        }, function (response) {
          console.log("Error with status code", response.status);
          deferred.reject();
        });

      return deferred.promise;
    };

    $scope.getUserNotes = function() {
      Restangular.one('call_records/' + $scope.demographics.pk + '/notes/')
        .get().then(
          function(usernotes) {
            $scope.usernotes = usernotes;
      });
    };

    $scope.createNote = function(text) {
      var recordId = $scope.demographics.pk;
      var notes = Restangular.one('call_records', recordId).all('notes/');
      
      var newNote = {text: text};
      notes.post(newNote, {}, {"X-CSRFToken": csrf_token}).then(
        function (response) {
          console.log("Note created.");
          $scope.getUserNotes();
        }, function (response) {
          console.log("Error with status code", response.status);
        });
    };

    $scope.deleteNote = function(id) {
      var note = Restangular.one('user_notes/' + id + '/');
      
      note.remove({}, {"X-CSRFToken": csrf_token}).then(
        function (response) {
          console.log("Note deleted.");
          $scope.getUserNotes();
        }, function (response) {
          console.log("Error with status code", response.status);
        });
    };

    $scope.updateNote = function(id, text) {
      var note = Restangular.one('user_notes/' + id + '/');
      note.get().then(
        function(data) {
          data.text = text;
          data.put({}, {"X-CSRFToken": csrf_token}).then(
            function (response) {
              console.log("Note updated.");
              $scope.getUserNotes();
            }, function (response) {
              console.log("Error with status code", response.status);
            });
        });
    };


    $scope.extra = {
      "extra_01": "Consequatur tenetur eaque rem sed in ad consequatur.",
      "extra_02": "Consequatur tenetur eaque rem sed in ad consequatur.",
      "extra_03": "Consequatur tenetur eaque rem sed in ad consequatur.",
      "extra_04": "Consequatur tenetur eaque rem sed in ad consequatur.",
      "extra_05": "Consequatur tenetur eaque rem sed in ad consequatur.",
      "extra_06": "Consequatur tenetur eaque rem sed in ad consequatur.",
      "extra_07": "Consequatur tenetur eaque rem sed in ad consequatur.",
      "extra_08": "Consequatur tenetur eaque rem sed in ad consequatur.",
      "extra_09": "Consequatur tenetur eaque rem sed in ad consequatur.",
      "extra_10": "Consequatur tenetur eaque rem sed in ad consequatur.",
      "extra_11": "Consequatur tenetur eaque rem sed in ad consequatur.",
      "extra_12": "Consequatur tenetur eaque rem sed in ad consequatur.",
      "extra_13": "Consequatur tenetur eaque rem sed in ad consequatur.",
      "extra_14": "Consequatur tenetur eaque rem sed in ad consequatur.",
      "extra_15": "Consequatur tenetur eaque rem sed in ad consequatur.",
      "extra_16": "Consequatur tenetur eaque rem sed in ad consequatur.",
      "extra_17": "Consequatur tenetur eaque rem sed in ad consequatur.",
      "extra_18": "Consequatur tenetur eaque rem sed in ad consequatur.",
      "extra_19": "Consequatur tenetur eaque rem sed in ad consequatur.",
      "extra_20": "Consequatur tenetur eaque rem sed in ad consequatur.",
    };

    $scope.next = function() {
      $scope.getNextRecord()
        .then( function() {
          $scope.getUserNotes();
        });
    };
    $scope.next();

  }]);