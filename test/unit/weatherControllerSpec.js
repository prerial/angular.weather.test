/**
 * Created by Mikhail on 2/12/2016.
 */
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


