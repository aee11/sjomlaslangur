'use strict';

angular.module('sjomlaslangurApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('phraseListView', {
                parent: 'site',
                url: '/list',
                data: {
                    authorities: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/phraseList/phraseList.html',
                        controller: 'PhraseListController'
                    }
                },
                resolve: {
                    
                }
            });
    });
