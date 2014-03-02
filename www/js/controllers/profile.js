angular.module("redmineApp").controller("profileCtrl", function($scope, $state, Users){
    $scope.token = localStorage.getItem("api_key");

    $scope.user = Users.get({key: $scope.token});

    $scope.onLogout = function () {
        localStorage.removeItem("api_key");
        showLoginScreen();
    };

    var showLoginScreen = function () {
        $state.go("login");
    };
});