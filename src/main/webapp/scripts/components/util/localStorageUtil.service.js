'use strict';

angular.module('sjomlaslangurApp')
    .service('LocalStorageUtil', function () {
      this.isInLocalStorageArray = function(arrayName, item) {
            var array = localStorage.getItem(arrayName);
            if (array) {
                var idArray = array.split(",");
                if (idArray.indexOf(item+'') !== -1) {
                    return true;
                }
            }
            return false;
        };
      this.addToLocalStorageArray = function(arrayName, item) {
            var array = localStorage.getItem(arrayName);
            if (array) {
                var idArray = array.split(",");
                idArray.push(item);
                localStorage.setItem(arrayName, idArray);
            } else {
                localStorage.setItem(arrayName, item);
            }
        };
    });
            