'use strict';

angular.module('sjomlaslangurApp')
    .controller('PhraseListController', function ($scope, Principal) {
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;
        });
    });
