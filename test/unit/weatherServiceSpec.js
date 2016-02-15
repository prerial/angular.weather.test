/**
 * Created by Mikhail on 2/12/2016.
 */
describe('Weather Service test', function() {

    beforeEach(module('weather'));

    describe('test weather $http service', function() {

        var mockBackend, loader, dataUrl = "/data/weather.json",  mockData = {
            "weather":[{"description":"Sky is Clear"}],
            "main":{"temp":123456},
            "dt":1455203821,
            "sys":{"sunrise":1455175312,"sunset":1455210503},
            "name":"My City"
        };

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
            //units=imperial - temperature is displayed as it is (Fahrenheit)
            expect(weatherlist.temperature).toBe(123456);

        });
    });
});

