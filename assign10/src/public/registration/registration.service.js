(function () {
   "use strict";
    
    function RegistrationService($http, ApiPath) {
        var service = this,
            user = {};
        
        service.setUserInfo = function (fname, lname, phone, email, dish) {
            user["fname"] = fname;
            user["lname"] = lname;
            user["phone"] = phone;
            user["email"] = email;
            user["favDish"] = dish;
        };
        
        service.getFavoriteDish = function (short_name) {
            if (short_name) {
                return $http.get(ApiPath + '/menu_items/' + short_name + '.json').then(function (response) {
                    user.dish = response.data;
                    return response.data;
                });
            }
        };
        
        service.getUserInfo = function () {
            return user;
        };
        
        service.getShortNames = function () {
            return $http.get(ApiPath + '/menu_items.json').then(function (response) {
                var i,
                    menuItems = response.data.menu_items,
                    short_names = [];
                for (i = 0; i < menuItems.length; i += 1) {
                    short_names.push(menuItems[i].short_name);
                }
                return short_names;
            });
        }
    }
    RegistrationService.$inject = ['$http', 'ApiPath'];
    
    angular.module('common')
    .service('RegistrationService', RegistrationService);
}());