describe('omdb service', function () {
    var movieData = { "Search": { "Title": "Margin Call", "Year": "2011", "Rated": "R", "Released": "29 Sep 2011", "Runtime": "107 min", "Genre": "Drama, Thriller", "Director": "J.C. Chandor", "Writer": "J.C. Chandor", "Actors": "Kevin Spacey, Paul Bettany, Jeremy Irons, Zachary Quinto", "Plot": "Follows the key people at an investment bank, over a 24-hour period, during the early stages of the 2008 financial crisis.", "Language": "English", "Country": "USA", "Awards": "Nominated for 1 Oscar. Another 8 wins & 23 nominations.", "Poster": "https://m.media-amazon.com/images/M/MV5BMjE5NzkyNDI2Nl5BMl5BanBnXkFtZTcwMTYzNDc2Ng@@._V1_SX300.jpg", "Ratings": [{ "Source": "Internet Movie Database", "Value": "7.1/10" }, { "Source": "Rotten Tomatoes", "Value": "89%" }, { "Source": "Metacritic", "Value": "76/100" }], "Metascore": "76", "imdbRating": "7.1", "imdbVotes": "103,871", "imdbID": "tt1615147", "Type": "movie", "DVD": "20 Dec 2011", "BoxOffice": "$600,000", "Production": "Roadside Attractions", "Website": "http://www.margincallmovie.com/", "Response": "True" } };
    var movideDataById = { "Title": "Star Wars: Episode IV - A New Hope", "Year": "1977", "Rated": "PG", "Released": "25 May 1977", "Runtime": "121 min", "Genre": "Action, Adventure, Fantasy, Sci-Fi", "Director": "George Lucas", "Writer": "George Lucas", "Actors": "Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing", "Plot": "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the evil Darth Vader.", "Language": "English", "Country": "USA", "Awards": "Won 6 Oscars. Another 50 wins & 28 nominations.", "Poster": "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", "Ratings": [{ "Source": "Internet Movie Database", "Value": "8.6/10" }, { "Source": "Rotten Tomatoes", "Value": "93%" }, { "Source": "Metacritic", "Value": "90/100" }], "Metascore": "90", "imdbRating": "8.6", "imdbVotes": "1,077,767", "imdbID": "tt0076759", "Type": "movie", "DVD": "21 Sep 2004", "BoxOffice": "N/A", "Production": "20th Century Fox", "Website": "http://www.starwars.com/episode-iv/", "Response": "True" };
    var omdbApi = {};
    var $httpBackend;

    beforeEach(module('omdb'));
    
    beforeEach(inject(function (_omdbApi_,_$httpBackend_) {
        omdbApi = _omdbApi_;
        $httpBackend = _$httpBackend_;
    }));

    it('should return search movie data', function () {
        var response;

        $httpBackend.whenGET("http://www.omdbapi.com/?v=1&s=margin%20call")
                          .respond(200, movieData);

        omdbApi.search('margin call')
            .then(data => response = data);
        
        $httpBackend.flush();

        // dump(angular.mock.dump(response))
        expect(response).toEqual(movieData);
    });

    it('should return movie data by id', function () {
        var response;

        $httpBackend.whenGET("http://www.omdbapi.com/?v=1&i=tt0076759")
                          .respond(200, movideDataById);

        omdbApi.find('tt0076759')
            .then(data => response = data);
        
        $httpBackend.flush();

        expect(response).toEqual(movideDataById);
    });

    it('should handle error', function() {
        var response;

        $httpBackend.whenGET("http://www.omdbapi.com/?v=1&i=tt0076759")
                          .respond(500);

        omdbApi.find('tt0076759')
            .then(function(data) {
                response = data;
            })
            .catch(function(err) {
                response = err;
            });
        
        $httpBackend.flush();

        expect(response).toEqual('Error!');
    })
});