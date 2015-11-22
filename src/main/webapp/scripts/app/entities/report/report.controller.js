'use strict';

angular.module('sjomlaslangurApp')
    .controller('ReportController', function ($scope, $state, $modal, Report, ReportSearch, ParseLinks) {
      
        $scope.reports = [];
        $scope.page = 0;
        $scope.loadAll = function() {
            Report.query({page: $scope.page, size: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                for (var i = 0; i < result.length; i++) {
                    $scope.reports.push(result[i]);
                }
            });
        };
        $scope.reset = function() {
            $scope.page = 0;
            $scope.reports = [];
            $scope.loadAll();
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();


        $scope.search = function () {
            ReportSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.reports = result;
            }, function(response) {
                if(response.status === 404) {
                    $scope.loadAll();
                }
            });
        };

        $scope.refresh = function () {
            $scope.reset();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.report = {
                createdAt: null,
                title: null,
                body: null,
                id: null
            };
        };
    });
