'use strict';

describe('Report Detail Controller', function() {
    var $scope, $rootScope;
    var MockEntity, MockReport, MockPhrase;
    var createController;

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        MockEntity = jasmine.createSpy('MockEntity');
        MockReport = jasmine.createSpy('MockReport');
        MockPhrase = jasmine.createSpy('MockPhrase');
        

        var locals = {
            '$scope': $scope,
            '$rootScope': $rootScope,
            'entity': MockEntity ,
            'Report': MockReport,
            'Phrase': MockPhrase
        };
        createController = function() {
            $injector.get('$controller')("ReportDetailController", locals);
        };
    }));


    describe('Root Scope Listening', function() {
        it('Unregisters root scope listener upon scope destruction', function() {
            var eventType = 'sjomlaslangurApp:reportUpdate';

            createController();
            expect($rootScope.$$listenerCount[eventType]).toEqual(1);

            $scope.$destroy();
            expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
        });
    });
});
