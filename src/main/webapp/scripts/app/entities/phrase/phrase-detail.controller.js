'use strict';

angular.module('sjomlaslangurApp')
    .controller('PhraseDetailController', function ($scope, $rootScope, $stateParams, entity, Phrase, User) {
        $scope.phrase = entity;
        $scope.load = function (id) {
            Phrase.get({id: id}, function(result) {
                $scope.phrase = result;
            });
        };
        var unsubscribe = $rootScope.$on('sjomlaslangurApp:phraseUpdate', function(event, result) {
            $scope.phrase = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
