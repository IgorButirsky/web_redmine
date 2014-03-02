angular.module("redmineApp").controller("issuesCtrl", function($scope, Issues){
    $scope.token = localStorage.getItem("api_key");

    $scope.issuesData = Issues.query({key : $scope.token});
});