var redmineApp = angular.module("redmineApp",["ngResource", "ngRoute", "shoppinpal.mobile-menu"]);

redmineApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/main', {
        templateUrl: 'partials/main.html',
        controller: 'mainCtrl'
      }).
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'loginCtrl'
      }).
      when('/main/projects/:projectId', {
        templateUrl: 'partials/project.html',
        controller: 'projectCtrl'
      }).
      when('/main/issues/:issueId', {
        templateUrl: 'partials/issue.html',
        controller: 'issueCtrl'
      }).
      when('/main/projects/:projectId/issues/:issueId', {
        templateUrl: 'partials/issue.html',
        controller: 'issueCtrl'
      }).
      otherwise({
        redirectTo: '/main'
      });
  }]);