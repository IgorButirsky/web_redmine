angular.module("redmineApp").controller("projectCtrl", ["$scope", "$routeParams", "$location", "Projects", "Issues",
											 function($scope, $routeParams, $location, Projects, Issues){
	$scope.projectId = $routeParams.projectId;

	$scope.loadIssues = function() {
        console.log("Start loading issues");
        $scope.issuesData = Issues.get({project_id:$scope.projectId, key:localStorage.getItem("api_key")});
	};

	$scope.onIssueSelected = function (index) {
		console.log("Issue " + index + " selected");
		$location.path("/main/projects/" + $scope.projectId + "/issues/" + $scope.issuesData.issues[index].id);
	};

    $scope.projectData = Projects.get({projectId:$scope.projectId, key:localStorage.getItem("api_key")}, function(){
        $scope.loadIssues();
    });

}]);