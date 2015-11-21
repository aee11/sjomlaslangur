'use strict';

angular.module('sjomlaslangurApp')
    .factory('PhraseSearch', function ($resource) {
        return $resource('api/_search/phrases/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
