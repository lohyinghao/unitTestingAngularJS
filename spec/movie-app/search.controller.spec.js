describe('Search Controller', function() {
    var $scope;
    var $location;
    var $timeout;
    var $httpBackend;

    beforeEach(module('movieApp'));

    beforeEach(inject(function(_$controller_,_$location_,_$timeout_,_$httpBackend_) {
        $scope = {};
        $location = _$location_;
        $timeout = _$timeout_;
        $httpBackend = _$httpBackend_;
        _$controller_('SearchController', { $scope: $scope, $location: _$location_, $timeout: _$timeout_ });
    }));

    it('should redirect to the query results page for non-empty query', function() {
        $scope.query = 'star wars';
        $scope.search();
        expect($location.url()).toBe('/results?q=star%20wars');
    });

    it('should not redirect to query results for empty query', function() {
        $scope.query = '';
        $scope.search();
        expect($location.url()).toBe('');
    })

    it('should redirect after 1 seconds of keyboard inactivity', function() {
        $httpBackend.expectGET('movie-app/results.html').respond(200);
        $scope.query = 'star wars';
        $scope.keyup();
        $timeout.flush();
        expect($timeout.verifyNoPendingTasks).not.toThrow();
        expect($location.url()).toBe('/results?q=star%20wars');
    })

    it('should cancel timeout in keydown', function() {
        $scope.query = 'star wars';
        $scope.keyup();
        $scope.keydown();
        expect($timeout.verifyNoPendingTasks).not.toThrow();
    })

    it('should cancel timeout on search', function() {
        $scope.query = 'star wars';
        $scope.keyup();
        $scope.search();
        expect($timeout.verifyNoPendingTasks).not.toThrow();
    })
});