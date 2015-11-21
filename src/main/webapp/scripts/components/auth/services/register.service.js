'use strict';

angular.module('sjomlaslangurApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


