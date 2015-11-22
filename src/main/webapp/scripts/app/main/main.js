'use strict';

angular.module('sjomlaslangurApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('home', {
                parent: 'site',
                url: '/',
                data: {
                    authorities: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/phrase/phrases.html',
                        controller: 'PhraseController'
                    }
                },
                resolve: {
                    
                }
            });
    });
