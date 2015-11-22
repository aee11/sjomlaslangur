'use strict';

angular.module('sjomlaslangurApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('report', {
                parent: 'entity',
                url: '/reports',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Reports'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/report/reports.html',
                        controller: 'ReportController'
                    }
                },
                resolve: {
                }
            })
            .state('report.detail', {
                parent: 'entity',
                url: '/report/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Report'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/report/report-detail.html',
                        controller: 'ReportDetailController'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'Report', function($stateParams, Report) {
                        return Report.get({id : $stateParams.id});
                    }]
                }
            })
            .state('report.new', {
                parent: 'report',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/report/report-dialog.html',
                        controller: 'ReportDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    createdAt: null,
                                    title: null,
                                    body: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('report', null, { reload: true });
                    }, function() {
                        $state.go('report');
                    })
                }]
            })
            .state('report.edit', {
                parent: 'report',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/report/report-dialog.html',
                        controller: 'ReportDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Report', function(Report) {
                                return Report.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('report', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('report.delete', {
                parent: 'report',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/report/report-delete-dialog.html',
                        controller: 'ReportDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Report', function(Report) {
                                return Report.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('report', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
