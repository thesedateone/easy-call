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

ecAppDirectives.directive('ecExtras', function() {
  return {
    restrict: "A",
    scope: {
      data: "=",
    },
    template: '<ul>' +
      '<li ng-if="data.extra_01"><em>Extra 01</em> {{data.extra_01}}</li>' +
      '<li ng-if="data.extra_02"><em>Extra 02</em> {{data.extra_02}}</li>' +
      '<li ng-if="data.extra_03"><em>Extra 03</em> {{data.extra_03}}</li>' +
      '<li ng-if="data.extra_04"><em>Extra 04</em> {{data.extra_04}}</li>' +
      '<li ng-if="data.extra_05"><em>Extra 05</em> {{data.extra_05}}</li>' +
      '<li ng-if="data.extra_06"><em>Extra 06</em> {{data.extra_06}}</li>' +
      '<li ng-if="data.extra_07"><em>Extra 07</em> {{data.extra_07}}</li>' +
      '<li ng-if="data.extra_08"><em>Extra 08</em> {{data.extra_08}}</li>' +
      '<li ng-if="data.extra_09"><em>Extra 09</em> {{data.extra_09}}</li>' +
      '<li ng-if="data.extra_10"><em>Extra 10</em> {{data.extra_10}}</li>' +
      '<li ng-if="data.extra_11"><em>Extra 11</em> {{data.extra_11}}</li>' +
      '<li ng-if="data.extra_12"><em>Extra 12</em> {{data.extra_12}}</li>' +
      '<li ng-if="data.extra_13"><em>Extra 13</em> {{data.extra_13}}</li>' +
      '<li ng-if="data.extra_14"><em>Extra 14</em> {{data.extra_14}}</li>' +
      '<li ng-if="data.extra_15"><em>Extra 15</em> {{data.extra_15}}</li>' +
      '<li ng-if="data.extra_16"><em>Extra 16</em> {{data.extra_16}}</li>' +
      '<li ng-if="data.extra_17"><em>Extra 17</em> {{data.extra_17}}</li>' +
      '<li ng-if="data.extra_18"><em>Extra 18</em> {{data.extra_18}}</li>' +
      '<li ng-if="data.extra_19"><em>Extra 19</em> {{data.extra_19}}</li>' +
      '<li ng-if="data.extra_20"><em>Extra 20</em> {{data.extra_20}}</li>' +
      '</ul>'
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