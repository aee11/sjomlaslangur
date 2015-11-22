'use strict';

angular.module('sjomlaslangurApp')
    .controller('FavoriteDetailController', function ($scope, $rootScope, $stateParams, entity, Favorite, User, Phrase) {
        $scope.favorite = entity;
        $scope.load = function (id) {
            Favorite.get({id: id}, function(result) {
                $scope.favorite = result;
            });
        };
        var unsubscribe = $rootScope.$on('sjomlaslangurApp:favoriteUpdate', function(event, result) {
            $scope.favorite = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
