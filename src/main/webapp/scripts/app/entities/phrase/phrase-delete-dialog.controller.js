'use strict';

angular.module('sjomlaslangurApp')
	.controller('PhraseDeleteController', function($scope, $modalInstance, entity, Phrase) {

        $scope.phrase = entity;
        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Phrase.delete({id: id},
                function () {
                    $modalInstance.close(true);
                });
        };

    });