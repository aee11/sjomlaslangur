'use strict';

angular.module('sjomlaslangurApp')
    .controller('PhraseListController', function ($scope, $state, $modal, phrases, Phrase, PhraseSearch, ParseLinks, LocalStorageUtil, User) {
        $scope.phrases = phrases;

        $scope.isVoted = function(type, phraseId) {
            return LocalStorageUtil.isInLocalStorageArray(type, phraseId)
        }

        $scope.upvote = function (phrase) {
            if (LocalStorageUtil.isInLocalStorageArray('upvotes', phrase.id)
                || LocalStorageUtil.isInLocalStorageArray('downvotes', phrase.id)) {
                return;
            } else {
                Phrase.upvote({ id: phrase.id }, function() {
                    // Success
                    phrase.upvotes++;
                    LocalStorageUtil.addToLocalStorageArray('upvotes', phrase.id);
                });
            }
        };

        $scope.downvote = function (phrase) {
            if (LocalStorageUtil.isInLocalStorageArray('upvotes', phrase.id)
                || LocalStorageUtil.isInLocalStorageArray('downvotes', phrase.id)) {
                return;
            } else {
                Phrase.downvote({ id: phrase.id }, function() {
                    // Success
                    phrase.downvotes++;
                    LocalStorageUtil.addToLocalStorageArray('downvotes', phrase.id);
                });
            }
        };

        $scope.favorite = function (phrase) {
            console.log(phrase);
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
