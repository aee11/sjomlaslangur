'use strict';

angular.module('sjomlaslangurApp')
    .controller('PhraseController', function ($scope, $state, $modal, Phrase, PhraseSearch, ParseLinks, LocalStorageUtil, User) {
        var sortedBy = $state.current.data.sortedBy || 'createdAt';
        $scope.phrases = [];
        $scope.page = 0;
        $scope.loadAll = function() {
            Phrase.query({page: $scope.page, size: 20, sort: sortedBy+',desc'}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                for (var i = 0; i < result.length; i++) {
                    $scope.phrases.push(result[i]);
                }
                User.getFavorites(function(favorites) {
                    var favoriteIds = favorites.map(function (phrase) { return phrase.id });
                    for (var i = 0; i < $scope.phrases.length; i++) {
                        if (favoriteIds.indexOf($scope.phrases[i].id) !== -1) {
                            $scope.phrases[i].isFavorited = true;
                        }
                    };
                });
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

        $scope.isVoted = function(type, phraseId) {
            return LocalStorageUtil.isInLocalStorageArray(type, phraseId)
        }

        $scope.upvote = function (phrase) {
            if (LocalStorageUtil.isInLocalStorageArray('upvotes', phrase.id)) {
                return;
            } else if (LocalStorageUtil.isInLocalStorageArray('downvotes', phrase.id)) {
                Phrase.dedownvote({ id: phrase.id });
                LocalStorageUtil.removeFromLocalStorageArray('downvotes', phrase.id);
                phrase.downvotes--;
            }
            Phrase.upvote({ id: phrase.id }, function() {
                // Success
                phrase.upvotes++;
                LocalStorageUtil.addToLocalStorageArray('upvotes', phrase.id);
            });
        };

        $scope.downvote = function (phrase) {
            if (LocalStorageUtil.isInLocalStorageArray('downvotes', phrase.id)) {
                return;
            } else if (LocalStorageUtil.isInLocalStorageArray('upvotes', phrase.id)) {
                Phrase.deupvote({ id: phrase.id });
                LocalStorageUtil.removeFromLocalStorageArray('upvotes', phrase.id);
                phrase.upvotes--;
            }
            Phrase.downvote({ id: phrase.id }, function() {
                // Success
                phrase.downvotes++;
                LocalStorageUtil.addToLocalStorageArray('downvotes', phrase.id);
            });
        };

        $scope.favorite = function (phrase) {
            if (phrase.isFavorited) {
                $scope.unfavorite(phrase);
                return;
            }
            Phrase.favorite({ id: phrase.id }, function() {
                // Success
                phrase.isFavorited = true;
            });
        };

        $scope.unfavorite = function (phrase) {
            if (!phrase.isFavorited) {
                $scope.favorite(phrase);
                return;
            }
            Phrase.unfavorite({ id: phrase.id }, function() {
                // Success
                phrase.isFavorited = false;
            });
        };
    });
