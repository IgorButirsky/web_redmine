angular.module("redmineApp").directive("listView", function() {
    return {
        restrict : "E",
        scope : {
            source : "=",
            whenScrolled : "&"
        },
        replace : false,
        transclude : true,
        replace :true,
        template : "<div><div ng-transclude></div><p class='progress' ng-hide='source.total_count <= source.offset'>Loading...</p> </div>",
        link : function(scope, elm) {
            elm.bind('scroll', function() {
                console.log("total : " + scope.source.total_count + ", offset : " + scope.source.offset);
                if (elm[0].scrollTop + elm[0].offsetHeight >= elm[0].scrollHeight && scope.source.total_count > scope.source.offset) {
                    console.log("Loading shown");
                    scope.whenScrolled();
                }
            });
            elm.bind('touchmove', function() {
                console.log("total : " + scope.source.total_count + ", offset : " + scope.source.offset);
                if (elm[0].scrollTop + elm[0].offsetHeight >= elm[0].scrollHeight && scope.source.total_count > scope.source.offset) {
                    console.log("Loading shown");
                    scope.whenScrolled();
                }
            });
        }
    }
})