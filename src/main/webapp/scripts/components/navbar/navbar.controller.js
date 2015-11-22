'use strict';

angular.module('sjomlaslangurApp')
    .controller('NavbarController', function ($scope, $location, $state, $timeout, Auth, Principal, ENV) {
        $scope.isAuthenticated = Principal.isAuthenticated;

        $scope.account = '';
        Principal.identity().then(function(account) {
            $scope.account = account;
        });

        $scope.$state = $state;
        $scope.inProduction = ENV === 'prod';

        $scope.logout = function () {
            Auth.logout();
            $state.go('home');
        };
        $timeout(function () {
          $('.ui.dropdown').dropdown();
        });
    });
