/**
 * Created by Mikhail on 2/12/2016.
 */
/**
 * Created by Mikhail on 2/12/2016.
 */
describe('Testing Routes', function(){
    var $route, $rootScope, $location, $httpBackend;

    beforeEach(function(){
        module('weather');

        inject(function($injector){
            $route = $injector.get('$route');
            $rootScope = $injector.get('$rootScope');
            $location = $injector.get('$location');
            $httpBackend = $injector.get('$httpBackend');

            $httpBackend.when('GET', 'src/templates/weather/home.html').respond('home');
        });
    });

    it('should navigate to home', function(){
        // navigate using $apply to safely run the $digest cycle
        $rootScope.$apply(function() {
            $location.path('/home');
        });
        expect($location.path()).toBe('/home');
        expect($route.current.templateUrl).toBe('src/templates/weather/home.html');
        expect($route.current.controller).toBe('appController');
    });

    it('should redirect not registered urls to home', function(){
        // navigate using $apply to safely run the $digest cycle
        $rootScope.$apply(function() {
            $location.path('/other');
        });
        expect($location.path()).toBe('/home');
        expect($route.current.templateUrl).toBe('src/templates/weather/home.html');
        expect($route.current.controller).toBe('appController');
    })
});


