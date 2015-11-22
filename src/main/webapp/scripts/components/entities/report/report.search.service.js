'use strict';

angular.module('sjomlaslangurApp')
    .factory('ReportSearch', function ($resource) {
        return $resource('api/_search/reports/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
