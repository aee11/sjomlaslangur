'use strict';

angular.module('sjomlaslangurApp')
    .controller('PhraseListController', function ($scope, $state, $modal, phrases, Phrase, PhraseSearch, ParseLinks, LocalStorageUtil, User, Principal) {
        $scope.phrases = phrases;

        $scope.markFavorites = function() {
            if (Principal.isAuthenticated()) {
                User.getFavorites(function(favorites) {
                    var favoriteIds = favorites.map(function (phrase) { return phrase.id });
                    for (var i = 0; i < $scope.phrases.length; i++) {
                        if (favoriteIds.indexOf($scope.phrases[i].id) !== -1) {
                            $scope.phrases[i].isFavorited = true;
                        }
                    };
                });
            }
        }

        $scope.markFavorites();

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
