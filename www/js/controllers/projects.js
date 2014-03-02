angular.module("redmineApp").controller("projectsCtrl", function($scope, $state, Projects){
    $scope.token = localStorage.getItem("api_key");

    $scope.projectsData = Projects.query({key: $scope.token}, function () {
        $scope.projectsData.offset = $scope.projectsData.limit;
    });

    $scope.onProjectSelected = function(index){
        $state.go('/main/project/' + $scope.projectsData.projects[index].id);
    }
});
