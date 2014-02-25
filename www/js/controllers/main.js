angular.module("redmineApp").controller("mainCtrl", ["$scope", "$spMenu", "$location", "Users", "Projects", "Issues",
    function ($scope, $spMenu, $location, Users, Projects, Issues) {
        var screens = null;

        function initScreens() {
            screens = [
                {
                    title: "Projects",
                    doAction: function () {
                        $scope.projectsData = Projects.query({key: $scope.token}, function () {
                            $scope.projectsData.offset = $scope.projectsData.limit;
                        });
                    }
                },
                {
                    title: "Tasks",
                    doAction: function () {
                        $scope.issuesData = Issues.query({offset: 0, key: $scope.token}, function () {
                            $scope.issuesData.offset = $scope.issuesData.limit;
                        });
                    }
                },
                {
                    title: "My Profile",
                    doAction: function () {
                        $scope.user = Users.get({key: $scope.token});
                    }
                }
            ];
            $scope.menuItems = new Array();
            for (var i = 0; i < screens.length; ++i) {
                $scope.menuItems[i] = screens[i].title;
            }
            ;
        }

        var setCurrentScreen = function (index) {
            $scope.currentScreen = screens[index];
            $scope.pageTitle = $scope.currentScreen.title;
            $scope.currentScreen.doAction();
            $spMenu.hide();
        };

        var showLoginScreen = function () {
            $location.path('/login');
            $location.replace();
        };

        var init = function () {
            if (localStorage.getItem("api_key") != null) {
                $scope.token = localStorage.getItem("api_key");
                initScreens();
                setCurrentScreen(0);
            } else {
                showLoginScreen();
            }
        };

        $scope.onMenuItemClick = function (index) {
            setCurrentScreen(index);
        };

        $scope.onLogout = function () {
            localStorage.removeItem("api_key");
            showLoginScreen();
        };

        $scope.onProjectSelected = function (index) {
            console.log("project " + $scope.projectsData.projects[index].id + " selected");
            $location.path('/main/projects/' + $scope.projectsData.projects[index].id);
        }

        $scope.onIssueSelected = function (index) {
            console.log("issue " + $scope.issuesData.issues[index].id + " selected");
            $location.path('/main/issues/' + $scope.issuesData.issues[index].id);
        }

        $scope.loadMoreIssues = function () {
            console.log("loadMoreIssues");
            Issues.query({offset: $scope.issuesData.offset, key: $scope.token}, function (issuesResult) {
                $scope.issuesData.issues = $scope.issuesData.issues.concat(issuesResult.issues);
                $scope.issuesData.offset = issuesResult.offset + issuesResult.limit;
            });
        };

        $scope.loadMoreProjects = function () {
            console.log("loadMoreProjects");
            Projects.query({offset: $scope.projectsData.offset, key: $scope.token}, function (projectsResult) {
                $scope.projectsData.issues = $scope.projectsData.issues.concat(projectsResult.issues);
                $scope.projectsData.offset = projectsResult.offset + projectsResult.limit;
            });
        };

        init();
    }]);

