(function () {
    "use strict";
    
    function RegistrationController(RegistrationService, shortNames) {
        var reg = this;
        
        reg.shortNames = shortNames;
        
        reg.submit = function () {
            RegistrationService.setUserInfo(reg.user.fname, reg.user.lname, reg.user.phone, reg.user.email, reg.user.favDish);
            RegistrationService.getFavoriteDish(reg.user.favDish);
            reg.completed = true;
        };
    }
    RegistrationController.$inject =['RegistrationService', 'shortNames'];
    
    angular.module('public')
    .controller('RegistrationController', RegistrationController);
}());