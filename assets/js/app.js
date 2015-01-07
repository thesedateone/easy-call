var ecApp = angular.module('ecApp', [
  'ngRoute',
  'restangular',
  'ecAppControllers'
]);

ecApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/ready', {
        templateUrl: djangoStatic + 'partials/ready.html',
        controller: 'readyCtrl'
      }).
      when('/call/:callCat', {
        templateUrl: djangoStatic + 'partials/call.html',
        controller: 'callCtrl'
      }).
      otherwise({
        redirectTo: '/ready'
      });
  }]);