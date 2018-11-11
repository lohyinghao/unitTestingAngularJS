angular.module('movieApp', ['ui.bootstrap', 'ngRoute', 'omdb', 'movieCore'])
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
	});

// angular.module('movieApp')
// 	.config(['$qProvider', function ($qProvider) {
// 		$qProvider.errorOnUnhandledRejections(false);
// 	}]);