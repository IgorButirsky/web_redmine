angular.module("redmineApp").controller("loginCtrl", ["$scope", "$location", "$http", "Users", function($scope, $location, $http, Users){
	$scope.login = "butirsky";
	$scope.password = "kradenola";

	$scope.doLogin = function() {
		var encoded = window.btoa($scope.login + ":" + $scope.password);
		$http.defaults.headers.common.Authorization = 'Basic ' + encoded;
        var user = Users.get(function(){
            localStorage.setItem("api_key", user.user.api_key);
            $location.path('/main');
            $location.replace();
        });
        $http.defaults.headers.common.Authorization = 'Basic ';
	};
}]);