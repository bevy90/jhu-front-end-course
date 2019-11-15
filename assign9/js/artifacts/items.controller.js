(function () {
    "use strict";
    
    function ListItemsController(MenuDataService, items) {
        var menuItems = this;
        menuItems.items = items;
    }
    
    ListItemsController.$inject = ['MenuDataService', 'items'];
    angular.module('Data').controller('ListItemsController', ListItemsController);
}());