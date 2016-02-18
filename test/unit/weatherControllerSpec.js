/**
 * Created by Mikhail on 2/12/2016.
 */
describe('Testing weatherController', function(){
    var scope, controller, templateHtml, formElem, form, mockBackend, loader,
        dataUrl = "/data/weather.json?",  mockData = {
        "weather":[{"description":"Sky is Clear"}],
        "main":{"temp":123456},
        "dt":1455203821,
        "sys":{"sunrise":1455175312,"sunset":1455210503},
        "name":"My City"
    };

    beforeEach(function(){
        module('weather');

        inject(function(_$rootScope_, _$controller_, _$templateCache_, _$compile_, _$httpBackend_, weatherService, Config ){
            mockBackend = _$httpBackend_;
            loader = weatherService;
            scope = _$rootScope_.$new();
            Config.urls.weather = dataUrl;
            controller = _$controller_('weatherController', { $scope: scope });
            templateHtml = _$templateCache_.get('src/templates/weather/weather.html');
            formElem = angular.element(templateHtml);
            _$compile_(formElem)(scope);
            form = scope.weatherForm;
            scope.$apply();
        });
    });

    it('should check form reset', function(){
        expect(form.$valid).toBeTruthy();
        angular.element(form.wcity).val("mycity");
        angular.element(form.wzip).val("myzip");
        scope.resetForm();
        expect(form.city).toEqual('');
        expect(form.zip).toEqual('');
    });

    it('should check empty form', function(){
        expect(form.$valid).toBeTruthy();
        scope.isLoading = null;
        scope.isHidden = null;
        scope.getWeather();
        expect(scope.isLoading).toEqual(false);
        expect(scope.isHidden).toEqual(true);
    });

    it('should load weather list and check city name and data conversion', function() {
        mockBackend.expectGET(dataUrl+"q=London").respond(mockData);
        form.wcity.$setViewValue("London");
        scope.getWeather();
        mockBackend.flush();
        expect(scope.weather.city).toBe('My City');
        //units=imperial - temperature is displayed as it is (Fahrenheit)
        expect(scope.weather.temperature).toBe(123456);
    });

});


