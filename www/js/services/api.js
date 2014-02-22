var host = "http://crm.mlsdev.com";

angular.module("redmineApp").factory("Users", ["$resource", function($resource) {
    return $resource(host + "/users/current.json");
}]);

angular.module("redmineApp").factory("Projects", ["$resource", function($resource) {
    return $resource(host + "/:projects/:projectId:extension", {}, {
        get : {method : "GET", params : {projects : "projects", extension : ".json"}, isArray : false},
        query : {method : "GET", params : {projects : "projects.json"}, isArray : false}
    })
}]);

angular.module("redmineApp").factory("Issues", ["$resource", function($resource) {
    return $resource(host + "/:issues/:issueId:extension", {}, {
        get : {method : "GET", params : {issues : "issues", extension : ".json"}, isArray : false},
        query : {method : "GET", params : {issues : "issues.json"}, isArray : false},
        comment : {method : "PUT", params : {issues : "issues", extension : ".json"}, isArray : false}
    })
}]);
