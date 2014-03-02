angular.module("redmineApp").controller("issueCtrl", function($scope, $stateParams, Issues) {
    $scope.issueInfo = {
        issueId : $stateParams.issueId,
        title : "Issue #" + $stateParams.issueId,
        commentText : ""
    };

    $scope.issueData = Issues.get({issueId:$scope.issueInfo.issueId, key:localStorage.getItem("api_key")});

	$scope.onCommentClicked = function () {
		console.log("onCommentClicked");
		if ($scope.issueInfo.commentText == null || $scope.issueInfo.commentText.length == 0) {
			console.log("comment is empty");
			return;
		}
        console.log("send comment");

        $scope.issueData.issue.notes = $scope.issueInfo.commentText;
        Issues.comment({issueId:$scope.issueInfo.issueId, key:localStorage.getItem("api_key")}, $scope.issueData);

        $scope.issueInfo.commentText = null;
	}
});