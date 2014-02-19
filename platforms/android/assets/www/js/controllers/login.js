angular.module("redmineApp").controller("loginCtrl", ["$scope", "$http", "$location", function($scope, $http, $location){
	$scope.login = "butirsky";
	$scope.password = "kradenola";

	$scope.doLogin = function() {
		var encoded = window.btoa($scope.login + ":" + $scope.password);
		$http.defaults.headers.common.Authorization = 'Basic ' + encoded;
		$http.get("http://crm.mlsdev.com/users/current.json").success(function(data){
			localStorage.setItem("api_key", data.user.api_key);
			$location.path('/main');
		});
	};
}]);