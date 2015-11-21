 'use strict';

angular.module('sjomlaslangurApp')
    .factory('notificationInterceptor', function ($q, AlertService) {
        return {
            response: function(response) {
                var alertKey = response.headers('X-sjomlaslangurApp-alert');
                if (angular.isString(alertKey)) {
                    AlertService.success(alertKey, { param : response.headers('X-sjomlaslangurApp-params')});
                }
                return response;
            }
        };
    });
