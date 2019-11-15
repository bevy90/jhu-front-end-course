(function () {
    'use strict';
    
    function MenuDataService($http) {
        var service = this;
        
        service.getAllCategories = function () {
            var result = $http({
                method: "GET",
                url: "https://davids-restaurant.herokuapp.com/categories.json"
            });
            
            return result.then(function (response) {
                return response.data;
            });
        };
        
        service.getItemsForCategory = function (categoryShortName) {
            var searchUrl = "https://davids-restaurant.herokuapp.com/menu_items.json?category=" + categoryShortName,
                result = $http({
                    method: "GET",
                    url: searchUrl
                });
            
            return result.then(function (response) {
                return response.data.menu_items;
            });
        };
    }
    MenuDataService.$inject = ['$http'];
    
    angular.module('Data').service('MenuDataService', MenuDataService);
}());