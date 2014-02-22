var host = "http://crm.mlsdev.com";

angular.module("redmineApp").factory("Users", ["$resource", function($resource) {
    return $resource(host + "/users/current.json");
}]);
