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
      Restangular.one('call_records/' + $scope.demographics.id + '/notes/')
        .get().then(
          function(usernotes) {
            $scope.usernotes = usernotes;
      });
    };

    $scope.getSystemNotes = function() {
      Restangular.one('call_records/' + $scope.demographics.id + '/sysnotes/')
        .get().then(
          function(systemnotes) {
            $scope.systemnotes = systemnotes;
      });
    };

    $scope.getExtraInfo = function() {
      Restangular.one('call_records/' + $scope.demographics.id + '/extra/')
        .get().then(
          function(extra) {
            $scope.extra = extra;
      });
    };

    $scope.getCall = function() {
      Restangular.one('call/' + $scope.demographics.call + '/')
        .get().then(
          function(call) {
            $scope.call = call;
      });
    };

    $scope.createNote = function(text) {
      var recordId = $scope.demographics.id;
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

    $scope.updateSysNotes = function(data) {
      var id = data.call_record;
      var notes = Restangular.one('call_records/' + id + '/sysnotes/');
      notes.get().then(
        function(recnotes) {
          recnotes.note1 = data.note1;
          recnotes.note2 = data.note2;
          recnotes.note3 = data.note3;
          recnotes.put({}, {"X-CSRFToken": csrf_token}).then(
            function (response) {
              console.log("System Notes updated.");
              $scope.getSystemNotes();
            }, function (response) {
              console.log("Error with status code", response.status);
            });
        });
    };

    $scope.updateCall = function(data, button) {
      var id = data.pk;
      var call = Restangular.one('call/' + id + '/');
      call.get().then(
        function(callinfo) {
          callinfo.data1 = data.data1;
          callinfo.data2 = data.data2;
          callinfo.data3 = data.data3;
          callinfo.data4 = data.data4;
          callinfo.data5 = data.data5;
          callinfo.data6 = data.data6;
          callinfo.data7 = data.data7;
          callinfo.data8 = data.data8;
          callinfo.result = button;

          callinfo.put({}, {"X-CSRFToken": csrf_token}).then(
            function (response) {
              console.log("Call updated.");
              $scope.next();
            }, function (response) {
              console.log("Error with status code", response.status);
            });
        });
    };

    $scope.next = function() {
      $scope.getNextRecord()
        .then( function() {
          $scope.getUserNotes();
          $scope.getExtraInfo();
          $scope.getSystemNotes();
          $scope.getCall();
        });
    };
    $scope.next();

  }]);