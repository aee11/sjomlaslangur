'use strict';

angular.module('sjomlaslangurApp')
    .controller('FavoriteController', function ($scope, $state, $modal, Favorite, FavoriteSearch, ParseLinks, User) {
        $scope.phrases = [];
        $scope.loadAll = function() {    
            User.getFavorites(function(favorites) {
                for (var i = 0; i < favorites.length; i++) {
                    favorites[i].isFavorited = true;
                    $scope.phrases.push(favorites[i]);
                };
            });
        };

        $scope.loadAll();


        $scope.search = function () {
            FavoriteSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.favorites = result;
            }, function(response) {
                if(response.status === 404) {
                    $scope.loadAll();
                }
            });
        };

        $scope.refresh = function () {
            $scope.reset();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.favorite = {
                userid: null,
                phraseid: null,
                id: null
            };
        };
    });
