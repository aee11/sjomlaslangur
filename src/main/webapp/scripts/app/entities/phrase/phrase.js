'use strict';

angular.module('sjomlaslangurApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('phrase', {
                parent: 'entity',
                url: '/phrases',
                data: {
                    authorities: [],
                    pageTitle: 'Phrases'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/phrase/phrases.html',
                        controller: 'PhraseController'
                    }
                },
                resolve: {
                }
            })
            .state('phrase.newest', {
                parent: 'entity',
                url: '/phrases/newest',
                data: {
                    authorities: [],
                    pageTitle: 'Nýjasta slangrið',
                    sortedBy: 'createdAt'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/phrase/phrases.html',
                        controller: 'PhraseController'
                    }
                },
                resolve: {
                }
            })
            .state('phrase.hottest', {
                parent: 'entity',
                url: '/phrases/hottest',
                data: {
                    authorities: [],
                    pageTitle: 'Heitasta slangrið',
                    sortedBy: 'hotness'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/phrase/phrases.html',
                        controller: 'PhraseController'
                    }
                },
                resolve: {
                }
            })
            .state('phrase.detail', {
                parent: 'entity',
                url: '/phrase/{id}',
                data: {
                    authorities: [],
                    pageTitle: 'Phrase'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/phrase/phrase-detail.html',
                        controller: 'PhraseDetailController'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'Phrase', function($stateParams, Phrase) {
                        return Phrase.get({id : $stateParams.id});
                    }]
                }
            })
            .state('phrase.byuser', {
                parent: 'entity',
                url: '/users/{id}/phrases',
                data: {
                    authorities: [],
                    pageTitle: 'Slangur hjá sjomla'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/phrase/phrases.html',
                        controller: 'PhraseListController'
                    }
                },
                resolve: {
                    phrases: ['$stateParams', 'User', function($stateParams, User) {
                        console.log($stateParams);
                        return User.getPhrases({id : $stateParams.id});
                    }]
                }
            })
            .state('phrase.new', {
                parent: 'phrase',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/phrase/phrase-dialog.html',
                        controller: 'PhraseDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    title: null,
                                    description: null,
                                    example: null,
                                    createdAt: null,
                                    upvotes: null,
                                    downvotes: null,
                                    hotness: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('phrase', null, { reload: true });
                    }, function() {
                        $state.go('phrase');
                    })
                }]
            })
            .state('phrase.edit', {
                parent: 'phrase',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/phrase/phrase-dialog.html',
                        controller: 'PhraseDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Phrase', function(Phrase) {
                                return Phrase.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('phrase', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('phrase.delete', {
                parent: 'phrase',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/phrase/phrase-delete-dialog.html',
                        controller: 'PhraseDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Phrase', function(Phrase) {
                                return Phrase.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('phrase', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
