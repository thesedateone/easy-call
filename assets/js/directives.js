/* Directives */

var ecAppDirectives = angular.module('ecAppDirectives', []);

ecAppDirectives.directive('ecDemographics', function() {
  return {
    restrict: "A",
    scope: {
      data: "=",
    },
    template: '<ul>' +
      '<li>' +
      '<span ng-if="data.name_prefix"> {{data.name_prefix}}</span>' +
      '<span ng-if="data.name_first"> {{data.name_first}}</span>' +
      '<span ng-if="data.name_middle"> {{data.name_middle}}</span>' +
      '<span ng-if="data.name_family"> {{data.name_family}}</span>' +
      '<span ng-if="data.name_suffix"> - {{data.name_suffix}}</span>' +
      '<span> ({{data.serial_number}})</span>' +
      '</li>' +
      '<li>' +
      '{{data.date_of_birth}} ({{data.age}}) ' +
      '</li>' +
      '</ul>'
  };
});


ecAppDirectives.directive('ecTelephone', function() {
  return {
    restrict: "A",
    scope: {
      data: "=",
    },
    template: '<div class="row" ng-if="data.tel_day">' +
      '<em class="col-xs-3 item-heading">Tel (day)</em><span class="col-xs-9">{{data.tel_day}}</span>' +
      '</div>' +
      '<div class="row" ng-if="data.tel_evening">' +
      '<em class="col-xs-3 item-heading">Tel (evening)</em><span class="col-xs-9">{{data.tel_evening}}</span>' +
      '</div>' +
      '<div class="row" ng-if="data.tel_work">' +
      '<em class="col-xs-3 item-heading">Tel (work)</em><span class="col-xs-9">{{data.tel_work}}</span>' +
      '</div>' +
      '<div class="row" ng-if="data.tel_mobile">' +
      '<em class="col-xs-3 item-heading">Tel (mobile)</em><span class="col-xs-9">{{data.tel_mobile}}</span>' +
      '</div>'
  };
});


ecAppDirectives.directive('ecAddress', function() {
  return {
    restrict: "A",
    scope: {
      data: "=",
    },
    template: '<div class="row" ng-if="data.address_1">' +
      '<em class="col-xs-3 item-heading">Address 1</em><span class="col-xs-9">{{data.address_1}}</span>' +
      '</div>' +
      '<div class="row" ng-if="data.address_2">' +
      '<em class="col-xs-3 item-heading">Address 2</em><span class="col-xs-9">{{data.address_2}}</span>' +
      '</div>' +
      '<div class="row" ng-if="data.address_3">' +
      '<em class="col-xs-3 item-heading">Address 3</em><span class="col-xs-9">{{data.address_3}}</span>' +
      '</div>' +
      '<div class="row" ng-if="data.suburb">' +
      '<em class="col-xs-3 item-heading">Suburb</em><span class="col-xs-9">{{data.suburb}}</span>' +
      '</div>' +
      '<div class="row" ng-if="data.city">' +
      '<em class="col-xs-3 item-heading">Town/City</em><span class="col-xs-9">{{data.city}}</span>' +
      '</div>' +
      '<div class="row" ng-if="data.postcode">' +
      '<em class="col-xs-3 item-heading">Postcode</em><span class="col-xs-9">{{data.postcode}}</span>' +
      '</div>' +
      '<div class="row" ng-if="data.do_not_mail_reason">' +
      '<em class="col-xs-3 item-heading">Do Not Mail Reason</em><span class="col-xs-9">{{data.do_not_mail_reason}}</span>' +
      '</div>'
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