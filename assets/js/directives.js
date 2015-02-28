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
      '<ul>' +
      '  <li ng-repeat="button in buttons">' +
      '    <a ec-action-button data="submit(button)" label="{{button}}"></a>' +
      '  </li> ' +
      '</ul>',

    link: function (scope, element, attrs) {
      scope.submit = function(button) {
        scope.updatefunc({'button': button, 'data': scope.call});
      };
    }
  };
});


ecAppDirectives.directive('ecActionButton', function() {
  return {
    restrict: "A",
    scope: {
      data: "&",
      label: "@",
    },
    template: '<a ' +
      'class="btn btn-md btn-default" role="button" ng-click="data()">' +
      '{{label}}' +
      '</a>'
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


