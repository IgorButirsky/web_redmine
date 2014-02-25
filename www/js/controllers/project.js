angular.module("redmineApp").controller("projectCtrl", ["$scope", "$routeParams", "$location", "Projects", "Issues",
    function ($scope, $routeParams, $location, Projects, Issues) {
        $scope.projectId = $routeParams.projectId;

        $scope.loadIssues = function () {
            console.log("Start loading issues");
            $scope.issuesData = Issues.query({project_id: $scope.projectId, key: localStorage.getItem("api_key")}, function() {
                $scope.issuesData.offset = $scope.issuesData.limit;
            });
        };

        $scope.onIssueSelected = function (index) {
            console.log("Issue " + index + " selected");
            $location.path("/main/projects/" + $scope.projectId + "/issues/" + $scope.issuesData.issues[index].id);
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

    }]);