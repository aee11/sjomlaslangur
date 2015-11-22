'use strict';

angular.module('sjomlaslangurApp')
    .factory('PhraseSearch', function ($resource) {
        return $resource('api/_search2/phrases/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
