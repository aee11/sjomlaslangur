'use strict';

angular.module('sjomlaslangurApp')
	.controller('FavoriteDeleteController', function($scope, $modalInstance, entity, Favorite) {

        $scope.favorite = entity;
        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Favorite.delete({id: id},
                function () {
                    $modalInstance.close(true);
                });
        };

    });