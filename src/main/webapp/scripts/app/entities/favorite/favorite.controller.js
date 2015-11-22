'use strict';

angular.module('sjomlaslangurApp')
    .controller('FavoriteController', function ($scope, $state, $modal, Favorite, FavoriteSearch, ParseLinks) {
      
        $scope.favorites = [];
        $scope.page = 0;
        $scope.loadAll = function() {
            Favorite.query({page: $scope.page, size: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                for (var i = 0; i < result.length; i++) {
                    $scope.favorites.push(result[i]);
                }
            });
        };
        $scope.reset = function() {
            $scope.page = 0;
            $scope.favorites = [];
            $scope.loadAll();
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
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
