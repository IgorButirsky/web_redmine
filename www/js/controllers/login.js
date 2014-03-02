angular.module("redmineApp").controller("loginCtrl", function($scope, $http, $state, Users){
    $scope.user = {username : "", password : ""};

	$scope.doLogin = function() {
		var encoded = window.btoa($scope.user.username + ":" + $scope.user.password);
		$http.defaults.headers.common.Authorization = 'Basic ' + encoded;
        var user = Users.get(function(){
            localStorage.setItem("api_key", user.user.api_key);
            $state.go("main.projects");
        });
        $http.defaults.headers.common.Authorization = 'Basic ';
	};
});