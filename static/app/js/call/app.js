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