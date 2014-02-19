var authSrevices = angular.module("authSrevices", []);

authSrevices.service("loginCtrl", ["$http", function($http){
	return {
        setCredentials: function (username, password) {
            var encoded = window.btoa(username + ":" + password);
            $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
        },
        clearCredentials: function () {
            document.execCommand("ClearAuthenticationCache");
            $http.defaults.headers.common.Authorization = 'Basic ';
        }
    };
}]);