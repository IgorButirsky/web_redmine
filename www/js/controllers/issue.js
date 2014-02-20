angular.module("redmineApp").controller("issueCtrl", ["$scope", "$routeParams", "$http", "$log", function($scope, $routeParams, $http, $log) {
	$scope.issueId = $routeParams.issueId;
	$scope.commentText = null;

	$http.get("http://crm.mlsdev.com/issues/" + $scope.issueId + ".json", {params:{key:localStorage.getItem("api_key")}})
				.success(function(data) {
					$scope.issue = data.issue;
				});

	$scope.onCommentClicked = function () {
		$log.log("onCommentClicked");
		if ($scope.commentText == null || $scope.commentText.length == 0) {
			$log.log("comment is empty");
			return;
		}
		$log.log("send comment");
		var data = {issue:{notes:$scope.commentText}};
		$http.put("http://crm.mlsdev.com/issues/17408.json", data, {params:{key:localStorage.getItem("api_key")}});
	}
}]);