var ecApp = angular.module('ecApp', [
  'ngRoute',
  'restangular',
  'ecAppControllers',
  'ecAppDirectives',
  'ecAppFilters'
]);

ecApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/ready', {
        templateUrl: djangoStatic + 'partials/call/ready.html',
        controller: 'readyCtrl'
      }).
      when('/call/:callCat', {
        templateUrl: djangoStatic + 'partials/call/call.html',
        controller: 'callCtrl'
      }).
      when('/call/:callCat/empty', {
        templateUrl: djangoStatic + 'partials/call/call_empty.html',
        controller: 'callEmptyCtrl'
      }).
      otherwise({
        redirectTo: '/ready'
      });
  }]);
/* Controllers */

var ecAppControllers = angular.module('ecAppControllers', ['restangular']);


ecAppControllers.controller('readyCtrl', 
  ['$scope', 'Restangular',
  function($scope, Restangular) {
    Restangular.all('list_types/').getList().then(function(types) {
      $scope.types = types;
    });
  }]);


ecAppControllers.controller('callEmptyCtrl', 
  ['$scope', '$routeParams', 'Restangular',
  function($scope, $routeParams, Restangular) {
    Restangular.one('list_types/' + $routeParams.callCat + '/').get().then(
      function(callType) {
        $scope.callType = callType;
    });
  }]);


ecAppControllers.controller('callCtrl', 
  ['$scope', '$routeParams', 'Restangular', '$q', '$window',
  function($scope, $routeParams, Restangular, $q, $window) {
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
          $window.location.href = '#/call/' + $routeParams.callCat + '/empty';
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

    $scope.updateRecord = function(data) {

      var record = Restangular.one('call_records');
      record.id = data.id;
      record.get().then(
        function(recordinfo) {
          recordinfo.name_prefix = data.name_prefix
          recordinfo.name_middle = data.name_middle
          recordinfo.name_family = data.name_family
          recordinfo.name_suffix = data.name_suffix
          recordinfo.tel_day = data.tel_day
          recordinfo.tel_evening = data.tel_evening
          recordinfo.tel_work = data.tel_work
          recordinfo.tel_mobile = data.tel_mobile
          recordinfo.address_1 = data.address_1
          recordinfo.address_2 = data.address_2
          recordinfo.address_3 = data.address_3
          recordinfo.suburb = data.suburb
          recordinfo.city = data.city
          recordinfo.postcode = data.postcode
          recordinfo.do_not_mail_reason = data.do_not_mail_reason
          recordinfo.date_of_birth = data.date_of_birth
          recordinfo.age = data.age
          recordinfo.put({}, {"X-CSRFToken": csrf_token}).then(
            function (response) {
              console.log("Note updated.");
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
/* Directives */

var ecAppDirectives = angular.module('ecAppDirectives', []);


ecAppDirectives.directive('ecExtraList', function() {
  return {
    restrict: "A",
    scope: {
      data: "=",
    },
    template: '<div ng-if="data.field1_display" ec-extra heading="data.field1_display" text="data.field1" class="row"></div>' +
      '<div ng-if="data.field2_display" ec-extra heading="data.field2_display" text="data.field2" class="row"></div>' +
      '<div ng-if="data.field3_display" ec-extra heading="data.field3_display" text="data.field3" class="row"></div>' +
      '<div ng-if="data.field4_display" ec-extra heading="data.field4_display" text="data.field4" class="row"></div>' +
      '<div ng-if="data.field5_display" ec-extra heading="data.field5_display" text="data.field5" class="row"></div>' +
      '<div ng-if="data.field6_display" ec-extra heading="data.field6_display" text="data.field6" class="row"></div>' +
      '<div ng-if="data.field7_display" ec-extra heading="data.field7_display" text="data.field7" class="row"></div>' +
      '<div ng-if="data.field8_display" ec-extra heading="data.field8_display" text="data.field8" class="row"></div>' +
      '<div ng-if="data.field9_display" ec-extra heading="data.field9_display" text="data.field9" class="row"></div>' +
      '<div ng-if="data.field10_display" ec-extra heading="data.field10_display" text="data.field10" class="row"></div>' +
      '<div ng-if="data.field11_display" ec-extra heading="data.field11_display" text="data.field11" class="row"></div>' +
      '<div ng-if="data.field12_display" ec-extra heading="data.field12_display" text="data.field12" class="row"></div>' +
      '<div ng-if="data.field13_display" ec-extra heading="data.field13_display" text="data.field13" class="row"></div>' +
      '<div ng-if="data.field14_display" ec-extra heading="data.field14_display" text="data.field14" class="row"></div>' +
      '<div ng-if="data.field15_display" ec-extra heading="data.field15_display" text="data.field15" class="row"></div>' +
      '<div ng-if="data.field16_display" ec-extra heading="data.field16_display" text="data.field16" class="row"></div>' +
      '<div ng-if="data.field17_display" ec-extra heading="data.field17_display" text="data.field17" class="row"></div>' +
      '<div ng-if="data.field18_display" ec-extra heading="data.field18_display" text="data.field18" class="row"></div>' +
      '<div ng-if="data.field19_display" ec-extra heading="data.field19_display" text="data.field19" class="row"></div>' +
      '<div ng-if="data.field20_display" ec-extra heading="data.field20_display" text="data.field20" class="row"></div>'
  };
});


ecAppDirectives.directive('ecExtra', function() {
  return {
    restrict: "A",
    scope: {
      heading: "=",
      text: "=",
    },
    template: '<em class="col-xs-3 item-heading">{{heading}}</em><span class="col-xs-9">{{text}}</span>'
  };
});



ecAppDirectives.directive('ecAddNote', function () {
    return {
        restrict: "A",
        scope: {
            savefunc: "&",
        },

        template: '<form class="form-horizontal">' +
          ' <div class="form-group" ng-hide="viewing">' +
          '   <div class="col-xs-12">' +
          '     <textarea class="form-control" rows="4"  id="note" ' +
          '               placeholder="Note Text here" ng-model="noteText">' +
          '     </textarea>' +
          '   </div>' +
          ' </div>' +
          ' <div class="form-group">' +
          '   <div class="col-xs-12">' +
          '     <button class="btn btn-md btn-default" ng-click="edit(noteText)">' +
          '     New Note</button>' +
          '   </div>' +
          ' </div>',

        link: function (scope, element, attrs) {

          scope.noteText = '';
          scope.viewing = true;

          scope.edit = function(text) {
            var button = angular.element(element.find('button'));
            if (scope.viewing) {
              scope.viewing = false;
              button.prop("innerText", "Add");
            } else {
              scope.viewing = true;
              scope.savefunc({'text': text});
              scope.noteText = '';
              button.prop("innerText", "New Note");
            }
          };

      }
    };
});



ecAppDirectives.directive('ecUserNote', function() {
  return {
    restrict: "A",
    scope: {
      data: "=",
      deletefunc: "&",
      updatefunc: "&"
    },
    
    template: 
      '<span class="badge">{{data.creator_name}}</span>' +
      '<h4 class="list-group-item-heading">{{data.pretty_date}}</h4>' +
      '<div class=".container-fluid">' +
      '  <div class="row" ng-hide="editing">' +
      '    <p class="list-group-item-text col-xs-9">{{data.text}}</p>' +
      '    <div class="col-xs-3 button-group">' +
      '      <button class="btn btn-md btn-default" ng-click="edit()">' +
      '        <span class="glyphicon glyphicon-pencil"></button>' +
      '      <button class="btn btn-md btn-default" ng-click="deletefunc({id: data.pk})">' +
      '        <span class="glyphicon glyphicon-trash"></button>' +
      '    </div>' +
      '  </div>' +
      '  <div class="row" ng-hide="viewing">' +
      '    <div class="col-xs-12">' +
      '      <textarea class="form-control" rows="4"  id="note" ' +
      '                placeholder="Note Text here" ng-model="data.text">' +
      '      </textarea>' +
      '    </div>' +
      '  </div>' +
      '  <div class="row" ng-hide="viewing">' +
      '    <div class="col-xs-12">' +
      '    <button class="btn btn-md btn-default" ng-click="edit()">' +
      '    Save</button>' +
      '    </div>' +
      '  </div>' +
      '</div>',

      link: function (scope, element, attrs) {

          scope.viewing = true;
          scope.editing = false;

          scope.edit = function() {
            if (scope.viewing) {
              scope.viewing = false;
              scope.editing = true;
            } else {
              scope.viewing = true;
              scope.editing = false;
              scope.updatefunc({'text': scope.data.text, 'id': scope.data.pk});
              // scope.noteText = '';
            }
          };
      }
  };
});


ecAppDirectives.directive('sysnotes', function () {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            updatefunc: '&'
        },
        template: '<div class="panel panel-default">' +
            '  <!-- Default panel contents -->' +
            '  <div class="panel-heading">' +
            '    <button type="button" class="btn btn-default"' +
            '            ng-click="edit()">Edit</button>' +
            '    <h4>System Notes</h4>' +
            '    <div style="clear: both;"></div>' +
            '  </div>' +
            '  <!-- List group -->' +
            '  <div class="list-group">' +
            '    <sysnote class="list-group-item" editing="editing"' +
            '             header="data.note1_display" text="data.note1"'+
            '             badge="CRM" ng-if="data.note1_display"></sysnote>' +
            '    <sysnote class="list-group-item" editing="editing"' +
            '             header="data.note2_display" text="data.note2"'+
            '             badge="CRM" ng-if="data.note2_display"></sysnote>' +
            '    <sysnote class="list-group-item" editing="editing"' +
            '             header="data.note3_display" text="data.note3"'+
            '             badge="CRM" ng-if="data.note3_display"></sysnote>' +
            '  </div>' +    
            '</div>',
        link: function (scope, element, attrs) {
            scope.editing = false;
            var button = angular.element(element.find('button'));
            scope.edit = function () {
                if (scope.editing) {
                    scope.editing = false;
                    button.prop("innerText", "Edit");
                    scope.updatefunc({'data': scope.data});
                } else {
                    scope.editing = true;
                    button.prop("innerText", "Save");
                }
            };
        }
    };
});


ecAppDirectives.directive('sysnote', function () {
    return {
        restrict: 'E',
        scope: {
            editing: '=',
            header: '=',
            text: '=',
            badge: '@'
        },
        template: '  <span class="badge">{{badge}}</span>' +
            '  <h4 class="list-group-item-heading">{{header}}</h4>' +
            '  <span class="note-text" ng-hide="editing">{{text}}</span>' +
            '  <textarea ng-show="editing" rows="4" ng-model="text"' +
            '            class="form-control" ></textarea>',
            
    };
});


/**************************************
 *  Results Input Fields and Buttons
 **************************************/


ecAppDirectives.directive('ecResultSection', function() {
  return {
    restrict: "E",
    scope: {
      call: "=",
      buttons: "=",
      updatefunc: "&"
    },
    template:
      '<ec-result-input-list call="call"></ec-result-input-list>' +
      '<div class="row buttons">' +
      '  <div class="col-xs-4" ng-repeat="button in buttons">' +
      '    <a ec-action-button linkfunc="submit(button)" data="button"></a>' +
      '  </div> ' +
      '</div>' +
      '<div class="row buttons">' +
      '  <div class="col-xs-6">' +
      '    <a class="btn btn-block btn-primary" ng-click="next()" role="button">Next</a>' +
      '  </div>' +
      '  <div class="col-xs-6">' +
      '    <a class="btn btn-block btn-primary" href="#/ready" role="button">Break</a>' +
      '  </div>' +
      '</div>',

    link: function (scope, element, attrs) {
      scope.submit = function(button) {
        scope.updatefunc({'button': button.display_name, 'data': scope.call});
      };
      scope.next = function() {
        scope.updatefunc({'button': 'Next', 'data': scope.call});
      };
    }
  };
});


ecAppDirectives.directive('ecActionButton', function() {
  return {
    restrict: "A",
    scope: {
      linkfunc: "&",
      data: "=",
    },
    template: '<a ' +
      'ng-class="btnclass(data.category)" role="button" ng-click="linkfunc()">' +
      '{{data.display_name}}' +
      '</a>',

    link: function (scope) {
      scope.btnclass = function(cat) {
        var base = "btn btn-block btn-md ";
        if (cat === "gd") {
          var result = base.concat("btn-success");
        } else if (cat === "bd") {
          var result = base.concat("btn-danger");
        } else if (cat === "nt") {
          var result = base.concat("btn-default");
        } else if (cat === "ic") {
          var result = base.concat("btn-primary");
        } else {
          var result = base;
        };
        return result;
      };
    }
  };
});


ecAppDirectives.directive('ecResultInputList', function() {
  return {
    restrict: "E",
    scope: {
      call: "="
    },
    template: 
      '<ec-result-input ng-if="call.data1_display"' +
      '    addon="call.data1_addon" ' +
      '    value="call.data1"' +
      '    text="call.data1_display">' +
      '</ec-result-input>' +
      '<ec-result-input ng-if="call.data2_display"' +
      '    addon="call.data2_addon" ' +
      '    value="call.data2"' +
      '    text="call.data2_display">' +
      '</ec-result-input>' +
      '<ec-result-input ng-if="call.data3_display"' +
      '    addon="call.data3_addon" ' +
      '    value="call.data3"' +
      '    text="call.data3_display">' +
      '</ec-result-input>' +
      '<ec-result-input ng-if="call.data4_display"' +
      '    addon="call.data4_addon" ' +
      '    value="call.data4"' +
      '    text="call.data4_display">' +
      '</ec-result-input>' +
      '<ec-result-input ng-if="call.data5_display"' +
      '    addon="call.data5_addon" ' +
      '    value="call.data5"' +
      '    text="call.data5_display">' +
      '</ec-result-input>' +
      '<ec-result-input ng-if="call.data6_display"' +
      '    addon="call.data6_addon" ' +
      '    value="call.data6"' +
      '    text="call.data6_display">' +
      '</ec-result-input>' +
      '<ec-result-input ng-if="call.data7_display"' +
      '    addon="call.data7_addon" ' +
      '    value="call.data7"' +
      '    text="call.data7_display">' +
      '</ec-result-input>' +
      '<ec-result-input ng-if="call.data8_display"' +
      '    addon="call.data8_addon" ' +
      '    value="call.data8"' +
      '    text="call.data8_display">' +
      '</ec-result-input>'
  };
});


ecAppDirectives.directive('ecResultInput', function() {
  return {
    restrict: "E",
    scope: {
      addon: "=",
      value: "=",
      text: "="
    },
    template: 
    '<div class="input-group">' +
    '  <span class="input-group-addon" id="basic-addon1">{{addon}}</span>' +
    '  <input type="text" class="form-control" placeholder="{{text}}"' +
    '         aria-describedby="basic-addon1" ng-model="value">' +
    '  </input>' +
    '</div>'
  };
});


/**************************************
 *  Results Demographics Section
 **************************************/


ecAppDirectives.directive('ecDemographicsSection', function() {
  return {
    restrict: "E",
    scope: {
      data: "=",
      updatefunc: "&",
    },
    template:
      '<div class=row>' +
      '  <div class="name col-xs-10">' +
      '    <span>{{data.name_prefix}}</span>' +
      '    <span>{{data.name_first}}</span>' +
      '    <span>{{data.name_middle}}</span>' +
      '    <span>{{data.name_family}}</span>' +
      '    <span>{{data.name_suffix}}</span>' +
      '  </div>' +
      '  <button type="button" ng-click="edit()"' +
      '          class="btn btn-default btn-sm pull-right edit">' +
      '    <span ng-class="glyphclass"></span>' +
      '  </button>' +
      '</div>' +
      '<div class="edit-mode" ng-show="editing">' +
      ' <ec-name-edit data="data"></ec-name-edit>' +
      ' <ec-demo-edit data="data"></ec-demo-edit>' +
      '</div>' +
      '<div class="view-mode" ng-hide="editing">' +
      ' <ec-demo-view data="data"></ec-demo-edit>' +
      '</div>',
    link: function (scope, element, attrs) {
      scope.editing = false;
      scope.glyphclass = 'glyphicon glyphicon-edit';
      scope.edit = function () {
        if (scope.editing) {
          scope.editing = false;
          scope.glyphclass = 'glyphicon glyphicon-edit';
          scope.updatefunc({'data': scope.data});
        } else {
          scope.editing = true;
          scope.glyphclass = 'glyphicon glyphicon-save';
        }
      };
    }
  };
});


ecAppDirectives.directive('ecDemoView', function() {
  return {
    restrict: "E",
    scope: {
      data: "=",
    },
    template: 
      '<div class="demo-set">' +
      '  <ec-pair label="Serial Number"' +
      '           data="data.serial_number"></ec-pair>' +
      '  <ec-pair label="DOB"' +
      '           data="data.date_of_birth"></ec-pair>' +
      '  <ec-pair label="Age"' +
      '           data="data.age"></ec-pair>' +
      '</div>' +
      '<div class="demo-set">' +
      '  <ec-tel-pair label="Tel (day)" ng-if="data.tel_day"' +
      '               data="data.tel_day"></ec-tel-pair>' +
      '  <ec-tel-pair label="Tel (evening)" ng-if="data.tel_evening"' +
      '               data="data.tel_evening"></ec-tel-pair>' +
      '  <ec-tel-pair label="Tel (work)" ng-if="data.tel_work"' +
      '               data="data.tel_work"></ec-tel-pair>' +
      '  <ec-tel-pair label="Tel (mob)" ng-if="data.tel_mobile"' +
      '               data="data.tel_mobile"></ec-tel-pair>' +
      '</div>' +
      '<div class="demo-set">' +
      '  <ec-pair label="Address" ng-if="data.address_1"' +
      '           data="data.address_1"></ec-pair>' +
      '  <ec-pair label="Address(2)" ng-if="data.address_2"' +
      '           data="data.address_2"></ec-pair>' +
      '  <ec-pair label="Address(3)" ng-if="data.address_3"' +
      '           data="data.address_3"></ec-pair>' +
      '  <ec-pair label="Suburb" ng-if="data.suburb"' +
      '           data="data.suburb"></ec-pair>' +
      '  <ec-pair label="City" ng-if="data.city"' +
      '           data="data.city"></ec-pair>' +
      '  <ec-pair label="Postcode" ng-if="data.postcode"' +
      '           data="data.postcode"></ec-pair>' +
      '  <ec-pair label="Do Not Mail Reason" ng-if="data.do_not_mail_reason"' +
      '           data="data.do_not_mail_reason"></ec-pair>' +
      '</div>'
  };
});


ecAppDirectives.directive('ecDemoEdit', function() {
  return {
    restrict: "E",
    scope: {
      data: "=",
    },
    template: 
      '<ec-textfield id="id_serial_number" label="Serial Number"' +
      '              data="data.serial_number" readonly="true">' +
      '</ec-textfield>' +
      '<ec-textfield id="id_date_of_birth" label="DOB"' +
      '              data="data.date_of_birth"></ec-textfield>' +
      '<ec-textfield id="id_age" label="Age"' +
      '              data="data.age"></ec-textfield>' +
      '<ec-textfield id="id_tel_day" label="Tel (day)"' +
      '              data="data.tel_day"></ec-textfield>' +
      '<ec-textfield id="id_tel_evening" label="Tel (evening)"' +
      '              data="data.tel_evening"></ec-textfield>' +
      '<ec-textfield id="id_tel_work" label="Tel (work)"' +
      '              data="data.tel_work"></ec-textfield>' +
      '<ec-textfield id="id_tel_mobile" label="Tel (mob)"' +
      '              data="data.tel_mobile"></ec-textfield>' +

      '<ec-textfield id="id_address_1" label="Address"' +
      '              data="data.address_1"></ec-textfield>' +
      '<ec-textfield id="id_address_2" label="Address(2)"' +
      '              data="data.address_2"></ec-textfield>' +
      '<ec-textfield id="id_address_3" label="Address(3)"' +
      '              data="data.address_3"></ec-textfield>' +
      '<ec-textfield id="id_suburb" label="Suburb"' +
      '              data="data.suburb"></ec-textfield>' +
      '<ec-textfield id="id_city" label="City"' +
      '              data="data.city"></ec-textfield>' +
      '<ec-textfield id="id_postcode" label="Postcode"' +
      '              data="data.postcode"></ec-textfield>' +
      '<ec-textarea id="id_do_not_mail_reason" label="Do Not Mail Reason"' +
      '             data="data.do_not_mail_reason"></ec-textarea>'
  };
});


ecAppDirectives.directive('ecNameEdit', function() {
  return {
    restrict: "E",
    scope: {
      data: "=",
    },
    template: 
      '<ec-textfield id="id_name_prefix" label="Name Prefix"' +
      '           data="data.name_prefix"></ec-textfield>' +
      '<ec-textfield id="id_name_first" label="First Name"' +
      '           data="data.name_first"></ec-textfield>' +
      '<ec-textfield id="id_name_middle" label="Middle Name or Initials"' +
      '           data="data.name_middle"></ec-textfield>' +
      '<ec-textfield id="id_name_family" label="Family Name"' +
      '           data="data.name_family"></ec-textfield>' +
      '<ec-textfield id="id_name_suffix" label="Name Suffix"' +
      '           data="data.name_suffix"></ec-textfield>'
  };
});


ecAppDirectives.directive('ecPair', function() {
  return {
    restrict: "E",
    scope: {
      label: "@",
      data: "=",
    },
    template: 
      '<div class="row pair">' +
      '  <span class="col-xs-4 title">{{label}}</span>' +
      '  <span class="col-xs-8 data">{{data}}</span>' +
      '</div>'
  };
});


ecAppDirectives.directive('ecTelPair', function() {
  return {
    restrict: "E",
    scope: {
      label: "@",
      data: "=",
    },
    template: 
      '<div class="row pair">' +
      '  <span class="col-xs-4 title">{{label}}</span>' +
      '  <a href="callto:{{data}}" class="col-xs-8 data">{{data}}</a>' +
      '</div>'
  };
});


ecAppDirectives.directive('ecTextfield', function() {
  return {
    restrict: "E",
    scope: {
      id: "@",
      label: "@",
      data: "=",
      readonly: "@"
    },
    template: 
      '<div class="form-group">' +
      '  <label for="{{id}}" class="title">{{label}}</label>' +
      '  <input type="text" class="form-control" id="{{id}}"' +
      '         ng-model="data">' +
      '</div>',
    link: function (scope, element, attrs) {
      var input = angular.element(element.find('input'));
      if (scope.readonly === 'true') {
        input.attr('readonly', 'readonly');
      };
    }
  };
});


ecAppDirectives.directive('ecTextarea', function() {
  return {
    restrict: "E",
    scope: {
      id: "@",
      label: "@",
      data: "=",
      readonly: "@"
    },
    template: 
      '<div class="form-group">' +
      '  <label for="{{id}}" class="title">{{label}}</label>' +
      '  <textarea rows="3" class="form-control" id="{{id}}"' +
      '         ng-model="data"></textarea>' +
      '</div>',
    link: function (scope, element, attrs) {
      var input = angular.element(element.find('input'));
      if (scope.readonly === 'true') {
        input.attr('readonly', 'readonly');
      };
    }
  };
});



/* Filters */

var ecAppFilters = angular.module('ecAppFilters', []);
var ecQueue = angular.module('ecExport', [
  'restangular',
  'ecExportControllers',
  'ecExportDirectives',
  'ecExportServices',
]);
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


/* Services and Factories */

var ecExportServices = angular.module('ecExportServices', ['restangular']);


ecExportServices.factory('ListType', 
  ['$q', 'Restangular',
  function($q, Restangular) {
    return {
      getData: function() {
        var deferred = $q.defer();
        Restangular.all('list_types/').getList().then(function(result) {
          deferred.resolve(result);
        });
        return deferred.promise;
      }
    };
}]);


ecExportServices.factory('ListTypeReport', 
  ['$q', 'Restangular',
  function($q, Restangular) {
    return {
      getData: function(slug) {
        var deferred = $q.defer();
        Restangular.all('list_types/').one(slug + '/report/').get().then(function(result) {
          deferred.resolve(result);
        });
        return deferred.promise;
      },
    };
}]);


ecExportServices.factory('ExportedFiles', 
  ['$q', 'Restangular',
  function($q, Restangular) {
    return {
      getData: function(slug) {
        var deferred = $q.defer();
        Restangular.all('call_records/').one('exported/').get().then(function(result) {
          deferred.resolve(result);
        });
        return deferred.promise;
      },

      doExport: function(slug) {
        var deferred = $q.defer();
        Restangular.all('call_records/').one('exported/')
                    .put({}, {"X-CSRFToken": csrf_token}).then(function(result) {
          deferred.resolve(result);
        });
        return deferred.promise;
      },
    };
}]);
var ecQueue = angular.module('ecQueue', [
  'restangular',
  'ecQueueControllers',
  'ecQueueDirectives',
  'ecQueueServices',
]);
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
      '  <td>{{ data.new }}</td>' +
      '  <td>{{ data.inprogress }}</td>' +
      '  <td class="info">{{ data.queued }}</td>' +
      '  <td>' +
      '    <button class="btn btn-sm btn-primary pull-right" type="button"' +
      '            ng-click="queue()">Queue</button>' +
      '  </td>',

    link: function (scope, element, attrs) {
      scope.queue = function() {
        scope.queuefunc({'list': scope.data});
      };
    }
  };
});

/* Services and Factories */

var ecQueueServices = angular.module('ecQueueServices', ['restangular']);


ecQueueServices.factory('ListType', 
  ['$q', 'Restangular',
  function($q, Restangular) {
    return {
      getData: function() {
        var deferred = $q.defer();
        Restangular.all('list_types/').getList().then(function(result) {
          deferred.resolve(result);
        });
        return deferred.promise;
      }
    };
}]);


ecQueueServices.factory('ListTypeReport', 
  ['$q', 'Restangular',
  function($q, Restangular) {
    return {
      getData: function(slug) {
        var deferred = $q.defer();
        Restangular.all('list_types/').one(slug + '/report/').get().then(function(result) {
          deferred.resolve(result);
        });
        return deferred.promise;
      },

      doQueue: function(slug) {
        var deferred = $q.defer();
        Restangular.all('list_types/').one(slug + '/report/')
                   .put({}, {"X-CSRFToken": csrf_token}).then(function(result) {
          deferred.resolve(result);
        });
        return deferred.promise;
      }
    };
}]);
var ecSearch = angular.module('ecSearch', [
  'restangular',
  'ecSearchControllers',
  'ecSearchDirectives',
  'ecSearchServices',
]);
/* Controllers */

var ecSearchControllers = angular.module('ecSearchControllers', []);


ecSearchControllers.controller('searchCtrl', 
  ['$scope', 'CallRecord',
  function($scope, CallRecord) {

    var doSearch = function(searchstring) {
      CallRecord.getList({'search': searchstring}).then(
        function(call_records) {
          $scope.data = call_records;
        });
    };

    $scope.dequeue = function(id) {
      CallRecord.one(id).get().then(
        function(rec) {
          rec.status = 'dq';
          rec.put({}, {"X-CSRFToken": csrf_token}).then(
            function (response) {
              doSearch($scope.searchString);
            }, function (response) {
              console.log("Error with status code", response.status);
            });
        });
    };

    $scope.onChange = function() {
      if ($scope.searchString.length > 2) {
        doSearch($scope.searchString);
      };
    };

    $scope.$watch('data', function(newVal, oldVal){
      if (newVal) {
        if (newVal.length < 1) {
          $scope.noresults = true;
        } else {
          $scope.noresults = false;
        };
      } else {
        // First page load
        $scope.noresults = true;
      };
    });

  }]);
/* Directives */

var ecSearchDirectives = angular.module('ecSearchDirectives', []);


ecSearchDirectives.directive('ecSearchResult', function() {
  return {
    restrict: "E",
    scope: {
      data: "=",
      dequeue: "&",
    },
    template: 
      '<div class="row">' +
      '  <h2 class="list-group-item-heading col-xs-8 col-md-7">SN: {{ data.serial_number }}</h2>' +
      '  <h4 class="list-group-item-sub-heading pull-right">' +
      '    {{ data.list_type_display }} <span ng-class="labelClass()">{{ data.status_display }}</span>' +
      '  </h4>' +
      '</div>' +
      '<h4>{{ full_name }}</h4>' +
      '<ec-tel-compressed day="data.tel_day" evening="data.tel_evening" work="data.tel_work"' +
      '                   mobile="data.tel_mobile">' +
      '</ec-tel-compressed>' +
      '<ec-address-compressed addr1="data.address_1" addr2="data.address_3" addr3="data.address_3"' +
      '                       suburb="data.suburb" city="data.city" postcode="data.postcode">' +
      '</ec-address-compressed>' +
      '<button type="button" class="btn btn-default btn-md pull-right"' +
      '        ng-click="handleclick()">' +
      '  <span class="glyphicon glyphicon-eject" aria-hidden="true">' +
      '  </span> Dequeue' +
      '</button>',

      link: function (scope, element, attrs) {

        var button = angular.element(element.find('button'));
        if (scope.data.status !== "nw" && scope.data.status !== "ip") {
          button.attr( "disabled", "disabled" );
        };

        scope.handleclick = function() {
          scope.dequeue({'id': scope.data.id});
        };

        scope.labelClass = function() {
          if (scope.data.status === "nw") {
            return "label label-success";
          } else if (scope.data.status === "ip") {
            return "label label-info";
          } else if (scope.data.status === "cp") {
            return "label label-primary";
          } else {
            return "label label-default";
          };
        };

        function calcname() {
          var name  = '';
          if (scope.data.name_prefix) name = name + scope.data.name_prefix + ' ';
          if (scope.data.name_first) name = name + scope.data.name_first + ' ';
          if (scope.data.name_middle) name = name + scope.data.name_middle + ' ';
          if (scope.data.name_family) name = name + scope.data.name_family + ' ';
          if (scope.data.name_suffix) name = name + scope.data.name_suffix;
          return name;
        };

        scope.full_name = calcname();
      }
  };
});


ecSearchDirectives.directive('ecTelCompressed', function() {
  return {
    restrict: "E",
    scope: {
        'day': "=",
        'evening': "=",
        'work': "=",
        'mobile': "=",
    },
    template: 
      '<p class="list-group-item-text phone-numbers row">' +
      '  <span ng-class="spanclass" ng-if="day"><em>(DAY)</em>{{ day }}</span>' +
      '  <span ng-class="spanclass" ng-if="evening"><em>(EVE)</em>{{ evening }}</span>' +
      '  <span ng-class="spanclass" ng-if="work"><em>(WORK)</em>{{ work }}</span>' +
      '  <span ng-class="spanclass" ng-if="mobile"><em>(MOB)</em>{{ mobile }}</span>' +
      '</p>',

    link: function (scope, element, attrs) {
      scope.spanclass = 'col-xs-10 col-sm-6 col-lg-4';
    }
  };
});


ecSearchDirectives.directive('ecAddressCompressed', function() {
  return {
    restrict: "E",
    scope: {
      'addr1': "=",
      'addr2': "=",
      'addr3': "=",
      'suburb': "=",
      'city': "=",
      'postcode': "=",
    },
    template: 
      '<div class="row">' +
      '  <ul class="list-unstyled col-xs-10 col-sm-6 address">' +
      '    <li ng-if="addr1">{{ addr1 }}</li>' +
      '    <li ng-if="addr2">{{ addr2 }}</li>' +
      '    <li ng-if="addr3">{{ addr3 }}</li>' +
      '    <li ng-if="suburb">{{ suburb }}</li>' +
      '    <li>' +
      '      <span ng-if="city">{{ city }}</span>' +
      '      <span ng-if="postcode">, {{ postcode }}</span>' +
      '    </li>' +
      '  </ul>' +
      '</div>'
  };
});

/* Services */

var ecSearchServices = angular.module('ecSearchServices', ['restangular']);


ecSearchServices.factory('CallRecord', 
  ['Restangular',
  function(Restangular) {
    return Restangular.service('call_records');
}]);

