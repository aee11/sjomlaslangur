'use strict';

angular.module('sjomlaslangurApp').controller('ReportDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Report', 'Phrase',
        function($scope, $stateParams, $modalInstance, entity, Report, Phrase) {

        $scope.report = entity;
        $scope.phrases = Phrase.query();
        $scope.load = function(id) {
            Report.get({id : id}, function(result) {
                $scope.report = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('sjomlaslangurApp:reportUpdate', result);
            $modalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.report.id != null) {
                Report.update($scope.report, onSaveSuccess, onSaveError);
            } else {
                Report.save($scope.report, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
