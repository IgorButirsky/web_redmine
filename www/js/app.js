var redmineApp = angular.module("redmineApp",["ngRoute"]);

redmineApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'loginCtrl'
      }).
      when('/main', {
        templateUrl: 'partials/main.html',
        controller: 'mainCtrl'
      }).
      otherwise({
        redirectTo: '/login'
      });
  }]);