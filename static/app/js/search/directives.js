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
