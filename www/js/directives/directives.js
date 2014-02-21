angular.module("redmineApp").directive("whenScrolled", function() {
	return function(scope, elm, attr) {
		elm.bind('scroll', function() {
			console.log("Scroll, " + elm[0].scrollTop + "  " + elm[0].offsetHeight + "  " + elm[0].scrollHeight);
            if (elm[0].scrollTop + elm[0].offsetHeight >= elm[0].scrollHeight) {
            	console.log("Loading shown");
                scope.$apply(attr.whenScrolled);
            }
        });
	}
})