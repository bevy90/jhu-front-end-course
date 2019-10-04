/*global angular*/
(function() {
	"use strict";

	// Checks to see if there are any empty items in the menu entered
    function getEmptySpaces(my_arr) {
        var i,
            count = 0;
        for (i = 0; i < my_arr.length; i += 1) {
            if (my_arr[i] === "" || my_arr[i] === " ") {
                count += 1;
            }
        }
        
        return count;
   	}

   	// Changes the color of the text and the border surrounding it
   	function textColor(isGood) {
   		if (isGood) {
   			return { "color": "green", "border": "1px solid green"};
   		} else {
   			return { "color": "red", "border": "1px solid red"};
   		}
   	}

	function LunchCheckController($scope) {
        $scope.menu = "";
        $scope.message = "";
        $scope.textbox = {};
        $scope.checkMenu = function () {
            var menuItems = $scope.menu.split(','),
                emptyItems = getEmptySpaces(menuItems),
                finalCount = menuItems.length - emptyItems;
            
            if (finalCount === 0) {
                $scope.message = "Please enter data first";
                $scope.textbox = textColor(false);
            } else {
                $scope.textbox = textColor(true)
                if (finalCount <= 3) {
                    $scope.message = "Enjoy!";
                } else {
                    $scope.message = "Too much!";
                }
            }
        };
  }

  LunchCheckController.$inject = ['$scope'];
    
  angular.module('LunchCheck', []).controller('LunchController', LunchCheckController);

}());