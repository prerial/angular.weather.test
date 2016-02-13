/**
 * Created by Mikhail on 2/12/2016.
 */
describe('Weather Service test', function() {

    beforeEach(module('weather'));

    describe('test weather $http service', function() {

        var mockBackend, loader, dataUrl = "/data/weather.json",  mockData = {
            "weather":[{"id":800,"main":"Clear","description":"Sky is Clear","icon":"01d"}],
            "main":{"temp":123456,"pressure":1006.43,"humidity":90,"temp_min":279.788,"temp_max":279.788,"sea_level":1016.46,"grnd_level":1006.43},
            "dt":1455203821,
            "sys":{"message":0.0075,"country":"GB","sunrise":1455175312,"sunset":1455210503},
            "name":"My City",
            "cod":200
        };
        // The _$httpBackend_ is the same as $httpBackend. Only written this way to
        // differentiate between injected variables and local variables
        beforeEach(inject(function (_$httpBackend_, weatherService) {
            mockBackend = _$httpBackend_;
            loader = weatherService;
        }));

        it('should load weather list and check city name and data conversion', function() {

            mockBackend.expectGET(dataUrl).respond(mockData);
            var weatherlist = null;
            var promise = loader.getWeather(dataUrl);
            promise.then(function(rec) {
                weatherlist = rec;
            });
            expect(weatherlist).toBe(null);
            mockBackend.flush();
            expect(weatherlist.city).toBe('My City');
            expect(weatherlist.temperature).toBe(123456);

        });
    });
});

