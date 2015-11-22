'use strict';

angular.module('sjomlaslangurApp')
    .controller('ReportDetailController', function ($scope, $rootScope, $stateParams, entity, Report, Phrase) {
        $scope.report = entity;
        $scope.load = function (id) {
            Report.get({id: id}, function(result) {
                $scope.report = result;
            });
        };
        var unsubscribe = $rootScope.$on('sjomlaslangurApp:reportUpdate', function(event, result) {
            $scope.report = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
