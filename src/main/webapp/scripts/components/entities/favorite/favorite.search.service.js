'use strict';

angular.module('sjomlaslangurApp')
    .factory('FavoriteSearch', function ($resource) {
        return $resource('api/_search/favorites/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
