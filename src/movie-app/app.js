angular.module('movieApp', ['ui.bootstrap', 'ngRoute', 'omdb', 'movieCore', 'ngMockE2E'])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'movie-app/home.html',
				controller: 'HomeController'
			})
			.when('/results', {
				templateUrl: 'movie-app/results.html',
				controller: 'ResultsController'
			})
			.otherwise({
				redirectTo: '/'
			});
	})
	.config(function($logProvider) {
		$logProvider.debugEnabled(false);
	})
	.run(function ($httpBackend) {    
		var data = ['tt0076759', 'tt0080684', 'tt0086190'];
		var headers = {
		  headers: {'Content-Type': 'application/json'}
		};
  
		// return the Popular Movie Ids
		$httpBackend.whenGET(function(s) {
		  return (s.indexOf('popular') !== -1);
		}).respond(200, data, headers);
	
		// this is to bypass error message from unit test. 
		// for some reason $timeout & $interval clashes 
		// with router to throw this error.
		// $httpBackend.whenGET('movie-app/results.html').respond(200);
		// $httpBackend.whenGET('movie-app/home.html').respond(200);

		//allow all other requests to run
		$httpBackend.whenGET(/.*/).passThrough();
	});