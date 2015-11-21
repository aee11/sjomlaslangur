'use strict';

angular.module('sjomlaslangurApp')
    .controller('NavbarController', function ($scope, $location, $state, $timeout, Auth, Principal, ENV) {
        $scope.isAuthenticated = Principal.isAuthenticated;
        // $scope.account = '';
        // Principal.identity().then(function(account) {
        //   console.log(account);
        //   $scope.account = account;
        //   $scope.isAuthenticated = Principal.isAuthenticated;
        // // $scope.account = '';
        // }
        $scope.account = '';
        Principal.identity().then(function(account) {
            console.log(account);
            $scope.account = account;
        });

        // $scope.getUser = function() {
        //   Principal.identity().then(function(account) {
        //       console.log(account);
        //       $scope.account = account;
        //   });
        //   return $scope.account;
        // }
        $scope.$state = $state;
        $scope.inProduction = ENV === 'prod';

        $scope.logout = function () {
            Auth.logout();
            $state.go('home');
        };
        // console.log($scope.getUserInfo())
        $timeout(function () {
          $('.ui.dropdown').dropdown();
        });
    });
