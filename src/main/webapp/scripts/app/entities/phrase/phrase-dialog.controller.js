'use strict';

angular.module('sjomlaslangurApp').controller('PhraseDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Phrase', 'User',
        function($scope, $stateParams, $modalInstance, entity, Phrase, User) {

        $scope.phrase = entity;
        $scope.users = User.query();
        $scope.load = function(id) {
            Phrase.get({id : id}, function(result) {
                $scope.phrase = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('sjomlaslangurApp:phraseUpdate', result);
            $modalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            $scope.phrase.createdAt = new Date();
            if ($scope.phrase.id != null) {
                Phrase.update($scope.phrase, onSaveSuccess, onSaveError);
            } else {
                Phrase.save($scope.phrase, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
