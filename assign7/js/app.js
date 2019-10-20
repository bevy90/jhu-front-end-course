/* global angular */

(function () {
    "use strict";
    
    
    /* Service to share data between the 2 controllers */
    function ShoppingListCheckOffService() {
        var service = this,
            shoppingList = { isEmpty: false,
                items: [ {name: "Cookies", quantity: 5},
                        {name: "Crackers", quantity: 7},
                        {name: "Candies", quantity: 20},
                        {name: "Beverages", quantity: 10},
                        {name: "Bags of peanuts", quantity: 2}
                    ]
                    },
            bought = { items: [],
                      isEmpty: true
                     };
        
        service.addItem = function (itemName, quantity) {
            var item = {
                name: itemName,
                quantity: quantity
            };
            bought.items.push(item);
            if (bought.items.length > 0) {
                bought.isEmpty = false;
            }
        };
        
        service.buyItem = function (itemIndex) {
            var item = shoppingList.items[itemIndex];
            shoppingList.items.splice(itemIndex, 1);
            if (shoppingList.items.length === 0) {
                shoppingList.isEmpty = true;
            }
            return item;
        };
        
        service.getItems = function () {
            return shoppingList;
        };
        
        service.getBoughtItems = function () {
            return bought;
        };
    }
    
    /* To Buy List Controller */
    function ToBuyList(ShoppingListCheckOffService) {
        var toBuy = this;
        
        toBuy.list = ShoppingListCheckOffService.getItems();
        
        toBuy.moveItem = function (itemIndex) {
            var itemBought = ShoppingListCheckOffService.buyItem(itemIndex);
            ShoppingListCheckOffService.addItem(itemBought.name, itemBought.quantity);
        };
        
    }

    ToBuyList.$inject = ['ShoppingListCheckOffService'];
    
    function BoughtList(ShoppingListCheckOffService) {
        var bought = this;
        
        bought.list = ShoppingListCheckOffService.getBoughtItems();
    }
    
    BoughtList.$inject = ['ShoppingListCheckOffService'];
    
    angular.module('ShoppingListCheckOff', []).controller('ToBuyController', ToBuyList).controller('AlreadyBoughtController', BoughtList).service('ShoppingListCheckOffService', ShoppingListCheckOffService);
}());