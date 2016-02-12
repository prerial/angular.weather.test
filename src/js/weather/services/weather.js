/**
 * Created by Mikhail on 2/11/2016.
 */
(function() {
    'use strict';

    angular.module('weather').factory('weatherService',['$http', '$q', 'alertService', function($http, $q) {

        function getTime(str) {
            var date = new Date(str*1000);
            return date.toLocaleDateString() + " " + date.toLocaleTimeString();
        }

        function weatherItem(dt){
            return {
                city: dt.name,
                description: dt.weather[0].description,
                reading: getTime(dt.dt),
                temperature: dt.main.temp,
                humidity: dt.main.humidity,
                sunrise: getTime(dt.sys.sunrise),
                sunset: getTime(dt.sys.sunset)
            }
        }

        function getWeather(url) {

            var request = $http({
                method: "get",
                url: url
            });
            return( request.then( handleSuccess, handleError ) );

        }

        function handleError( response ) {
            var message;
            if ( ! angular.isObject( response.data ) || ! response.data.message  ) {
                message ='Weather data is not available right now.\nPlease, try again later.';
            }
            if(response.cod === '404' || response.cod === '500'){
                message = response.cod === '404'? response : 'Weather data is not available right now.\nPlease, try again later.';
            }
            response.data = {
                error: true,
                message: message
            };
            $q.reject( response.data );
            return(response.data);
        }

        function handleSuccess( response ) {
            if(response.data.cod === '404'){
                response.data.error = true;
                return( response.data);
            }else{
                return( weatherItem(response.data) );
            }
        }

        return({
            getWeather: getWeather
        });

    }])

})();
