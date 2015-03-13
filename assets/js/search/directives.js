/* Directives */

var ecSearchDirectives = angular.module('ecSearchDirectives', []);


ecSearchDirectives.directive('ecSearchResult', function() {
  return {
    restrict: "E",
    scope: {
      data: "=",
    },
    template: 
      '<div class="row">' +
      '  <h2 class="list-group-item-heading col-xs-8 col-md-7">SN: {{ data.serial_number }}</h2>' +
      '  <h4 class="list-group-item-sub-heading pull-right">' +
      '    {{ data.call_type }} <span ng-class="label_class()">{{ data.status }}</span>' +
      '  </h4>' +
      '</div>' +
      '<h4>{{ full_name }}</h4>' +
      '<ec-tel-compressed data="data.tel"></ec-tel-compressed>' +
      '<ec-address-compressed data="data.address"></ec-address-compressed>' +
      '<button type="button" class="btn btn-default btn-md pull-right">' +
      '  <span class="glyphicon glyphicon-eject" aria-hidden="true"></span> Dequeue' +
      '</button>',

      link: function (scope, element, attrs) {

        scope.label_class = function() {
          if (scope.data.status === "New") {
            return "label label-success";
          } else if (scope.data.status === "In Progress") {
            return "label label-info";
          } else if (scope.data.status === "Completed") {
            return "label label-primary";
          } else {
            return "label label-default";
          };
        };

        function calcname() {
          var name  = '';
          if (scope.data.nameprefix) name = name + scope.data.nameprefix + ' ';
          if (scope.data.firstname) name = name + scope.data.firstname + ' ';
          if (scope.data.middlename) name = name + scope.data.middlename + ' ';
          if (scope.data.lastname) name = name + scope.data.lastname + ' ';
          if (scope.data.suffix) name = name + scope.data.suffix;
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
        'data': "=",
    },
    template: 
      '<p class="list-group-item-text phone-numbers row">' +
      '  <span ng-class="spanclass" ng-if="data.tel_mobile"><em>(MOB)</em>{{ data.tel_mobile }}</span>' +
      '  <span ng-class="spanclass" ng-if="data.tel_home"><em>(HOME)</em>{{ data.tel_home }}</span>' +
      '  <span ng-class="spanclass" ng-if="data.tel_evening"><em>(EVE)</em>{{ data.tel_evening }}</span>' +
      '  <span ng-class="spanclass" ng-if="data.tel_work"><em>(WORK)</em>{{ data.tel_work }}</span>' +
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
      'data': "=",
    },
    template: 
      '<div class="row">' +
      '  <ul class="list-unstyled col-xs-10 col-sm-6 address">' +
      '    <li ng-if="data.addr1">{{ data.addr1 }}</li>' +
      '    <li ng-if="data.addr2">{{ data.addr2 }}</li>' +
      '    <li ng-if="data.addr3">{{ data.addr3 }}</li>' +
      '    <li ng-if="data.suburb">{{ data.suburb }}</li>' +
      '    <li>' +
      '      <span ng-if="data.city">{{ data.city }}</span>' +
      '      <span ng-if="data.postcode">, {{ data.postcode }}</span>' +
      '    </li>' +
      '  </ul>' +
      '</div>'
  };
});
