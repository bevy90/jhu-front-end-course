/* global angular */

(function () {
    "use strict";
    
    
    /* Service to share data between the 2 controllers */
    function ShoppingListCheckOffService(costFilter, $filter) {
        var service = this,
            shoppingList = { isEmpty: false,
                items: [ {name: "Cookies", quantity: 5, pricePerItem: .5},
                        {name: "Crackers", quantity: 7, pricePerItem: 1.0},
                        {name: "Candies", quantity: 20, pricePerItem: .75},
                        {name: "Beverages", quantity: 10, pricePerItem: 1.50},
                        {name: "Bags of peanuts", quantity: 2, pricePerItem: 2.50}
                    ]
                    },
            bought = { items: [],
                      isEmpty: true
                     };
        
        service.addItem = function (itemName, quantity, itemPrice) {
            var item = {
                name: itemName,
                quantity: quantity,
                pricePerItem: itemPrice
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

        service.getItem = function(itemIndex, list) {
            var item;
            if (list === "shopping") {
                item = shoppingList.items[itemIndex];
            } else {
                item = bought.items[itemIndex];
            }
            return item;
        }

        service.getTotalCost = function (itemPrice, qty) {
            return $filter('currency')(costFilter(itemPrice, qty));
        };
        
        service.getItems = function () {
            return shoppingList;
        };
        
        service.getBoughtItems = function () {
            return bought;
        };
    }

    ShoppingListCheckOffService.$inject = ['costFilter', '$filter'];

    function CostFilterFactory() {
        return function (input, qty) {
            input = input || 0;
            qty = qty || 0;
            var totalCost = input * qty;
            return totalCost;
        };
    }
    
    /* To Buy List Controller */
    function ToBuyList(ShoppingListCheckOffService) {
        var toBuy = this;
        
        toBuy.list = ShoppingListCheckOffService.getItems();
        
        toBuy.moveItem = function (itemIndex) {
            var itemBought = ShoppingListCheckOffService.buyItem(itemIndex);
            ShoppingListCheckOffService.addItem(itemBought.name, itemBought.quantity, itemBought.pricePerItem);
        };
        
        toBuy.getTotalCost = function(itemIndex) {
            var itemBought = ShoppingListCheckOffService.getItem(itemIndex, "shopping");
            return ShoppingListCheckOffService.getTotalCost(itemBought.pricePerItem, itemBought.quantity);
        };
    }

    ToBuyList.$inject = ['ShoppingListCheckOffService', 'costFilter'];
    
    function BoughtList(ShoppingListCheckOffService) {
        var bought = this;
        
        bought.list = ShoppingListCheckOffService.getBoughtItems();

        bought.getTotalCost = function(itemIndex) {
            var itemBought = ShoppingListCheckOffService.getItem(itemIndex, "bought");
            return ShoppingListCheckOffService.getTotalCost(itemBought.pricePerItem, itemBought.quantity);
        };
    }

    BoughtList.$inject = ['ShoppingListCheckOffService'];
    
    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyList)
    .controller('AlreadyBoughtController', BoughtList)
    .filter('cost', CostFilterFactory)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
}());