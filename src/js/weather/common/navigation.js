(function() {
    'use strict';

    angular.module('weather') .constant('Navigation',

        {
            'Home': {
                route: '/home',
                config: {controller: 'appController', templateUrl:'src/templates/weather/home.html'}
            },
            'Weather':{
                route: '/weather',
                config: {controller: 'weatherController', templateUrl:'src/templates/weather/weather.html'}
            }
        });

})();
