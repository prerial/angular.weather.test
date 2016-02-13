/**
 * Created by Mikhail on 2/12/2016.
 */
angular.module('weather').run(['$templateCache', function($templateCache) {
    'use strict';

    $templateCache.put('src/templates/weather/weather.html',
        "<div class=\"weather-menu\"><span><ul class=\"toggle-menu\" ng-click=\"toggleNav()\"><li class=\"toggle\"><span class=\"toggle-menu-bar\"></span> <span class=\"toggle-menu-bar\"></span> <span class=\"toggle-menu-bar\"></span></li></ul><span class=\"weather-title\">Weather</span></span></div><div class=\"weather\"><h3>Enter City/ZIP</h3><form name=\"weatherForm\" role=\"form\" ng-submit=\"getWeather()\" novalidate><table><tr><td><label class=\"form-label\">City:</label></td><td><input name=\"city\" type=\"text\" ng-model=\"weatherForm.city\" class=\"form-control\" placeholder=\"Enter city name\"></td></tr><tr><td><label class=\"form-label\">ZIP:</label></td><td><input type=\"text\" name=\"zip\" ng-model=\"weatherForm.zip\" class=\"form-control\" placeholder=\"Enter ZIP\"></td></tr><tr><td></td><td><button ng-disabled=\"isLoading\" style=\"float:right\" type=\"submit\">GO</button></td></tr></table></form><h3>Results:</h3><div ng-hide=\"isHidden\"><p><label>City:</label><span>{{weather.city}}</span></p><p><label>Current Weather:</label><span>{{weather.description}}</span></p><p><label>Last Reading:</label><span>{{weather.reading}}</span></p><p><label>Temperature:</label><span>{{weather.temperature}} &#8457;</span></p><p><label>Humidity:</label><span>{{weather.humidity}} &#37;</span></p><p><label>Sunrise:</label><span>{{weather.sunrise}}</span></p><p><label>Sunset:</label><span>{{weather.sunset}}</span></p></div><div ng-show=\"alert.isAlert\" style=\"color:red\" ng-repeat=\"line in (alert.alertParam.message | newlines) track by $index\"><span>{{line}}</span></div><div class=\"loading\" ng-hide=\"!isLoading\"><div>Loading...</div></div></div>"
    );

}]);

describe('Testing weatherController', function(){
    var scope, controller, templateHtml, formElem, form;

    beforeEach(function(){
        module('weather');

        inject(function(_$rootScope_, _$controller_, _$templateCache_, _$compile_ ){
            scope = _$rootScope_.$new();
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
        angular.element(form.city).val("mycity");
        angular.element(form.zip).val("myzip");
        scope.resetForm();
        expect(form.city).toEqual('');
        expect(form.zip).toEqual('');
    });

});


