(function () {
    "use strict";
    
    angular.module('Data').component('categoryComponent', {
        templateUrl: 'templates/categories.template.html',
        bindings: {
            categories: '<'
        }
    });
}());