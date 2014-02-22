var host = "http://crm.mlsdev.com";

angular.module("redmineApp").factory("Users", ["$resource", function($resource) {
    return $resource(host + "/users/current.json");
}]);

angular.module("redmineApp").factory("Projects", ["$resource", function($resource) {
    return $resource(host + "/projects.json")
}]);

angular.module("redmineApp").factory("Issues", ["$resource", function($resource) {
    return $resource(host + "/issues.json")
}]);
