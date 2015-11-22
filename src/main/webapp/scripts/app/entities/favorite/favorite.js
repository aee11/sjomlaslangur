'use strict';

angular.module('sjomlaslangurApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('favorite', {
                parent: 'entity',
                url: '/favorites',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Favorites'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/phrase/phrases.html',
                        controller: 'FavoriteController'
                    }
                },
                resolve: {
                }
            })
            .state('favorite.detail', {
                parent: 'entity',
                url: '/favorite/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Favorite'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/favorite/favorite-detail.html',
                        controller: 'FavoriteDetailController'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'Favorite', function($stateParams, Favorite) {
                        return Favorite.get({id : $stateParams.id});
                    }]
                }
            })
            .state('favorite.new', {
                parent: 'favorite',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/favorite/favorite-dialog.html',
                        controller: 'FavoriteDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    userid: null,
                                    phraseid: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('favorite', null, { reload: true });
                    }, function() {
                        $state.go('favorite');
                    })
                }]
            })
            .state('favorite.edit', {
                parent: 'favorite',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/favorite/favorite-dialog.html',
                        controller: 'FavoriteDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Favorite', function(Favorite) {
                                return Favorite.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('favorite', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('favorite.delete', {
                parent: 'favorite',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/favorite/favorite-delete-dialog.html',
                        controller: 'FavoriteDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Favorite', function(Favorite) {
                                return Favorite.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('favorite', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
