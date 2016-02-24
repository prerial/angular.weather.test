/**
 * Created by Mikhail on 2/17/2016.
 */
(function() {
    'use strict';

    angular.module('weather') .constant('Config',
        {
            'navigation':  {
                'Home': {
                    route: '/home',
                    config: {controller: 'appController', templateUrl:'src/templates/weather/home.html'}
                },
                'Weather':{
                    route: '/weather',
                    source: 'openweather',
                    config: {controller: 'weatherController', templateUrl:'src/templates/weather/weather.html'}
                },
                'Weatherp': {
                    route: '/weatherp',
                    source: 'yahoo',
                    config: {controller: 'weatherpController', templateUrl: 'src/templates/weather/weatherp.html'}
                }
            },
            'urls':
            {
                'weather': 'http://api.openweathermap.org/data/2.5/weather?units=imperial&APPID=b878b1f241d4af90168ce82b179cb2c3&',
                'weatherp': "https://query.yahooapis.com/v1/public/yql?format=json&env=store&"
            }
        });

})();
