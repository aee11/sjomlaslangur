'use strict';

angular.module('sjomlaslangurApp').controller('FavoriteDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Favorite', 'User', 'Phrase',
        function($scope, $stateParams, $modalInstance, entity, Favorite, User, Phrase) {

        $scope.favorite = entity;
        $scope.users = User.query();
        $scope.phrases = Phrase.query();
        $scope.load = function(id) {
            Favorite.get({id : id}, function(result) {
                $scope.favorite = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('sjomlaslangurApp:favoriteUpdate', result);
            $modalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.favorite.id != null) {
                Favorite.update($scope.favorite, onSaveSuccess, onSaveError);
            } else {
                Favorite.save($scope.favorite, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
