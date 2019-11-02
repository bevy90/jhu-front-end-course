/* global angular */

(function () {
    "use strict";
    
    function MenuSearchService($http) {
        var service = this,
            found;
        
        service.getMatchedMenuItem = function (searchTerm) {
            var response = $http({
                method: "GET",
                url: "https://davids-restaurant.herokuapp.com/menu_items.json"
            });
            
            return response.then(function (result) {
                var i,
                    menuItems = result.data.menu_items;
                found = [];
                for (i = 0; i < menuItems.length; i += 1) {
                    if ((menuItems[i].description.indexOf(searchTerm) !== -1) && searchTerm !== "") {
                        found.push(menuItems[i]);
                    }
                }
                return found;
            });
        };
        
    }
    MenuSearchService.$inject = ['$http'];
    
    function NarrowItDownController(MenuSearchService) {
        var menu = this;
        menu.searchTerm = "";
        menu.findItems = function (searchTerm) {
            var promise = MenuSearchService.getMatchedMenuItem(searchTerm);
            
            promise.then(function (response) {
                menu.found = response;
            });
        };
        
        menu.removeItem = function (index) {
            menu.found.splice(index, 1);
        };
    }
    NarrowItDownController.$inject = ['MenuSearchService'];
    
    function FoundItemsDirectiveController() {
        var list = this;
        
        list.isListEmpty = function () {
            if (list.found === undefined) {
                return -1;
            } else if (list.found.length === 0) {
                return 0;
            } else {
                return 1;
            }
        };
    }
    
    function FoundItemsDirectiveLink(scope, element) {
        
        var notFoundElem = element.find("div.empty"),
            tableItems = element.find("table.items");
        
        function displayNothingFound() {
            notFoundElem.slideDown(200);
        }
        
        function removeNothingFound() {
            notFoundElem.slideUp(200);
        }
        
        function displayTableItems() {
            tableItems.css('display', 'block');
        }
        
        function removeTableItems() {
            tableItems.css('display', 'none');
        }
        
        scope.$watch('list.isListEmpty()', function (newStat) {
            if (newStat === 0) {
                displayNothingFound();
                removeTableItems();
            } else if(newStat === 1) {
                removeNothingFound();
                displayTableItems();
            }
        })
    }
    
    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'itemsloader.html',
            scope: {
                found: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true,
            link: FoundItemsDirectiveLink
        };
        
        return ddo;
    }
    
    angular.module('NarrowItDownApp', []).controller('NarrowItDownController', NarrowItDownController).service('MenuSearchService', MenuSearchService).directive('foundItems', FoundItemsDirective);
}());