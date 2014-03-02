var redmineApp = angular.module("redmineApp",["ngResource", "ionic"]);

redmineApp.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state("main", {
            url : "/main",
            abstract: true,
            templateUrl : "main.html"
        })
        .state("login", {
            url : "/login",
            templateUrl : "login.html",
            controller : "loginCtrl"
        })
        .state("main.projects", {
            url : "/projects",
            views: {
                'menuContent' :{
                    templateUrl: "projects.html",
                    controller: "projectsCtrl"
                }
            }
        })
        .state("main.issues", {
            url : "/issues",
            views: {
                'menuContent' :{
                    templateUrl: "issues.html",
                    controller: "issuesCtrl"
                }
            }
        })
        .state("main.profile", {
            url : "/profile",
            views: {
                'menuContent' :{
                    templateUrl: "profile.html",
                    controller: "profileCtrl"
                }
            }
        })
        .state("main.project-detail", {
            url : "/project/:projectId",
            views: {
                'menuContent' :{
                    templateUrl: "project.html",
                    controller: "projectCtrl"
                }
            }
        })
        .state("main.project-issue-detail", {
            url : "/project/:projectId/issue/:issueId",
            views: {
                'menuContent' :{
                    templateUrl: "issue.html",
                    controller: "issueCtrl"
                }
            }
        })
        .state("main.issue-detail", {
            url : "/issue/:issueId",
            views: {
                'menuContent' :{
                    templateUrl: "issue.html",
                    controller: "issueCtrl"
                }
            }
        });

    $urlRouterProvider.otherwise('/main/projects');
});
