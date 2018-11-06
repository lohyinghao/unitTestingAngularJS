angular.module('omdb', [])
        .factory('omdbApi', function($http) {
            var service = {};
            var baseUrl = 'http://www.omdbapi.com/?v=1&';
            var apiKey = '&apikey=d19563c3';
            
            function httpPromise (url) {
                return $http.get(url).then(
                                            function (response) { return response.data },
                                            function (error) { return "Error!"})
            }

            service.search = function(query) {
                return httpPromise(baseUrl += 's=' + encodeURIComponent(query) + apiKey);
            }

            service.find = function(id) {
                return httpPromise(baseUrl += 'i=' + id + apiKey);
            }

            return service;
        })