'use strict';

angular.module('sjomlaslangurApp')
    .controller('PhraseController', function ($scope, $state, $modal, Phrase, PhraseSearch, ParseLinks) {
      
        $scope.phrases = [];
        $scope.page = 0;
        $scope.loadAll = function() {
            Phrase.query({page: $scope.page, size: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                for (var i = 0; i < result.length; i++) {
                    $scope.phrases.push(result[i]);
                }
            });
        };
        $scope.reset = function() {
            $scope.page = 0;
            $scope.phrases = [];
            $scope.loadAll();
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();


        $scope.search = function () {
            PhraseSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.phrases = result;
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
            $scope.phrase = {
                title: null,
                description: null,
                example: null,
                createdAt: null,
                upvotes: null,
                downvotes: null,
                hotness: null,
                id: null
            };
        };
    });
