angular.module("redmineApp").controller("projectCtrl", function ($scope, $stateParams, Projects, Issues) {
        $scope.projectId = $stateParams.projectId;

        $scope.loadIssues = function () {
            console.log("Start loading issues");
            $scope.issuesData = Issues.query({project_id: $scope.projectId, key: localStorage.getItem("api_key")}, function() {
                $scope.issuesData.offset = $scope.issuesData.limit;
            });
        };

        $scope.loadMoreIssues = function () {
            console.log("loadMoreIssues");
            Issues.query({offset: $scope.issuesData.offset, project_id: $scope.projectId, key: localStorage.getItem("api_key")}, function (issuesResult) {
                $scope.issuesData.issues = $scope.issuesData.issues.concat(issuesResult.issues);
                $scope.issuesData.offset = issuesResult.offset + issuesResult.limit;
            });
        }

        $scope.projectData = Projects.get({projectId: $scope.projectId, key: localStorage.getItem("api_key")}, function () {
            $scope.loadIssues();
        });

    });