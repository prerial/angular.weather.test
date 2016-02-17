/**
 * Created by Mikhail on 2/17/2016.
 */
describe('Testing Routes', function(){
    var $route, $rootScope, $location, $httpBackend;

    beforeEach(function(){
        module('weather');
        inject(function(_$route_, _$rootScope_, _$location_, _$httpBackend_){
            $route = _$route_;
            $rootScope = _$rootScope_;
            $location = _$location_;
            $httpBackend = _$httpBackend_;
            $httpBackend.when('GET', 'src/templates/weather/home.html').respond('home');
        });
    });

    it('should navigate to home', function(){
        $location.path('/home');
        $rootScope.$apply();
        expect($location.path()).toBe('/home');
        expect($route.current.templateUrl).toBe('src/templates/weather/home.html');
        expect($route.current.controller).toBe('appController');
    });

    it('should redirect urls to home', function(){
        $location.path('/other');
        $rootScope.$apply();
        expect($location.path()).toBe('/home');
        expect($route.current.templateUrl).toBe('src/templates/weather/home.html');
        expect($route.current.controller).toBe('appController');
    });

    it('should redirect urls to weather', function(){
        $location.path('/weather');
        $rootScope.$apply();
        expect($location.path()).toBe('/weather');
        expect($route.current.templateUrl).toBe('src/templates/weather/weather.html');
        expect($route.current.controller).toBe('weatherController');
    });
});


