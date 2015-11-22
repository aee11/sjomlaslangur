'use strict';

angular.module('sjomlaslangurApp')
    .factory('Phrase', function ($resource, DateUtils) {
        return $resource('api/phrases/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.createdAt = DateUtils.convertDateTimeFromServer(data.createdAt);
                    return data;
                }
            },
            'update': { method:'PUT' },
            'upvote': { method:'POST', url: 'api/phrases/:id/upvote', params: { id: '@id'} },
            'downvote': { method:'POST', url: 'api/phrases/:id/downvote', params: { id: '@id'} },
            'deupvote': { method:'POST', url: 'api/phrases/:id/deupvote', params: { id: '@id'} },
            'dedownvote': { method:'POST', url: 'api/phrases/:id/dedownvote', params: { id: '@id'} },
            'favorite': { method:'POST', url: 'api/phrases/:id/favorite', params: { id: '@id'} },
            'unfavorite': { method:'POST', url: 'api/phrases/:id/unfavorite', params: { id: '@id'} }
        });
    });
