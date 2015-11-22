'use strict';

describe('Favorite Detail Controller', function() {
    var $scope, $rootScope;
    var MockEntity, MockFavorite, MockUser, MockPhrase;
    var createController;

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        MockEntity = jasmine.createSpy('MockEntity');
        MockFavorite = jasmine.createSpy('MockFavorite');
        MockUser = jasmine.createSpy('MockUser');
        MockPhrase = jasmine.createSpy('MockPhrase');
        

        var locals = {
            '$scope': $scope,
            '$rootScope': $rootScope,
            'entity': MockEntity ,
            'Favorite': MockFavorite,
            'User': MockUser,
            'Phrase': MockPhrase
        };
        createController = function() {
            $injector.get('$controller')("FavoriteDetailController", locals);
        };
    }));


    describe('Root Scope Listening', function() {
        it('Unregisters root scope listener upon scope destruction', function() {
            var eventType = 'sjomlaslangurApp:favoriteUpdate';

            createController();
            expect($rootScope.$$listenerCount[eventType]).toEqual(1);

            $scope.$destroy();
            expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
        });
    });
});
