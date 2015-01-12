/* Directives */

var ecAppDirectives = angular.module('ecAppDirectives', []);

ecAppDirectives.directive('ecDemographics', function() {
  return {
    restrict: "A",
    scope: {
      data: "=",
    },
    template: '<p>' +
      '<span ng-if="data.name_prefix"> {{data.name_prefix}}</span>' +
      '<span ng-if="data.name_first"> {{data.name_first}}</span>' +
      '<span ng-if="data.name_middle"> {{data.name_middle}}</span>' +
      '<span ng-if="data.name_family"> {{data.name_family}}</span>' +
      '<span ng-if="data.name_suffix"> - {{data.name_suffix}}</span>' +
      '<span> ({{data.serial_number}})</span>' +
      '</p>' +
      '<p>' +
      '{{data.date_of_birth}} ({{data.age}}) ' +
      '</p>'
  };
});


ecAppDirectives.directive('ecTelephone', function() {
  return {
    restrict: "A",
    scope: {
      data: "=",
    },
    template: '<ul>' +
      '<li ng-if="data.tel_day"><span>Tel (day)</span> {{data.tel_day}}</li>' +
      '<li ng-if="data.tel_evening"><span>Tel (evening)</span> {{data.tel_evening}}</li>' +
      '<li ng-if="data.tel_work"><span>Tel (work)</span> {{data.tel_work}}</li>' +
      '<li ng-if="data.tel_mobile"><span>Tel (mobile)</span> {{data.tel_mobile}}</li>' +
      '</ul>'
  };
});


ecAppDirectives.directive('ecAddress', function() {
  return {
    restrict: "A",
    scope: {
      data: "=",
    },
    template: '<ul>' +
      '<li ng-if="data.address_1"><span>Address 1</span> {{data.address_1}}</li>' +
      '<li ng-if="data.address_2"><span>Address 1</span> {{data.address_2}}</li>' +
      '<li ng-if="data.address_3"><span>Address 1</span> {{data.address_3}}</li>' +
      '<li ng-if="data.suburb"><span>Suburb</span> {{data.suburb}}</li>' +
      '<li ng-if="data.city"><span>Town/City</span> {{data.city}}</li>' +
      '<li ng-if="data.postcode"><span>Postcode</span> {{data.postcode}}</li>' +
      '<li ng-if="data.do_not_mail_reason"><span>Do Not Mail Reason</span> {{data.do_not_mail_reason}}</li>' +
      '</ul>'
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
      'class="btn btn-lg btn-default" role="button" ng-click="data()">' +
      '{{label}}' +
      '</a>'
  };
});