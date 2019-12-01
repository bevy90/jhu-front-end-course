(function () {
    "use strict";
    
    function InfoController(RegistrationService, ApiPath) {
        var info = this;
        
        info.user = RegistrationService.getUserInfo();
        info.basePath = ApiPath;
        
        info.userExist = function () {
            if (angular.equals(info.user, {})) {
                return false;
            } else {
                return true;
            }
        };
    }
    InfoController.$inject = ['RegistrationService', 'ApiPath'];
    
    angular.module('public').controller('InfoController', InfoController);
}());