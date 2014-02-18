var loginControllers = angular.module("loginControllers", []);

loginControllers.controller("loginCtrl", ["$scope", "$http", function($scope, $http){
	$scope.login = "user";
	$scope.password = "password";

	$scope.doLogin = function() {
		var encoded = window.btoa($scope.login + ":" + $scope.password);
		$http.defaults.headers.common.Authorization = 'Basic ' + encoded;
		$http.get("http://crm.mlsdev.com/users/current.json").success(function(data){
			$scope.user = data;
		});
	};
}]);