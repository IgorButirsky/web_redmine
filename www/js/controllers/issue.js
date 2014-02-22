angular.module("redmineApp").controller("issueCtrl", ["$scope", "$routeParams", "Issues", function($scope, $routeParams, Issue) {
	$scope.issueId = $routeParams.issueId;
	$scope.commentText = null;

    $scope.issueData = Issue.get({issueId:$scope.issueId, key:localStorage.getItem("api_key")});

	$scope.onCommentClicked = function () {
		console.log("onCommentClicked");
		if ($scope.commentText == null || $scope.commentText.length == 0) {
			console.log("comment is empty");
			return;
		}
        console.log("send comment");

        $scope.issueData.issue.notes = $scope.commentText;
        Issue.comment({issueId:$scope.issueId, key:localStorage.getItem("api_key")}, $scope.issueData);

        $scope.commentText = null;
	}
}]);