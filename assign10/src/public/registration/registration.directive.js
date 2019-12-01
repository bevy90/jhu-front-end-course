(function () {
    "use strict";
    
    function RegistrationDirectiveLink(scope, element, attrs, controller) {
        var shortnames = scope.reg.shortNames;
        
        controller.$validators.shortname = function (modelValue) {
            if (shortnames.indexOf(modelValue) !== -1) {
                return true;
            } else {
                return false;
            }
        };
    }
    
    function RegistrationDirective() {
        var ddo = {
            require: 'ngModel',
            link: RegistrationDirectiveLink
        };
        return ddo;
    }
    
    angular.module('public').directive('shortname', RegistrationDirective);
    
}());