'use strict';

angular.module('sjomlaslangurApp')
    .controller('SearchbarController', function ($scope, PhraseSearch) {
      $scope.searchQuery = '';
      $scope.searchFor = function(searchQuery) {
        console.log(searchQuery);
      }
    });
