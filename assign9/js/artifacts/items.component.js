(function () {
    "use strict";
    
    angular.module('Data').component('itemsComponent', {
        templateUrl: 'templates/items.template.html',
        bindings: {
            items: '<'
        }
    });
}());