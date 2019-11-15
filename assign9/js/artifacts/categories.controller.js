(function () {
    "use strict";
    
    function CategoriesController(MenuDataService, categories) {
        var menuCategories = this;
        menuCategories.categories = categories;
    }
    
    CategoriesController.$inject = ['MenuDataService', 'categories'];
    angular.module('Data').controller('CategoriesController', CategoriesController);
}());