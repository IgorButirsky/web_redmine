angular.module("redmineApp").controller("loginCtrl", function($scope, $http, $state, Users){
	$scope.login = "butirsky";
	$scope.password = "kradenola";

	$scope.doLogin = function() {
		var encoded = window.btoa($scope.login + ":" + $scope.password);
		$http.defaults.headers.common.Authorization = 'Basic ' + encoded;
        var user = Users.get(function(){
            localStorage.setItem("api_key", user.user.api_key);
            $state.go("main");
//            $location.path('/main');
//            $location.replace();
        });
        $http.defaults.headers.common.Authorization = 'Basic ';
	};
});