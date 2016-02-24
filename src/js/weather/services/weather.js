/**
 * Created by Mikhail on 2/11/2016.
 */
(function() {
    'use strict';

    angular.module('weather').factory('weatherService',['$http', '$q', function($http, $q) {

        var source = '';

        function getTime(str) {
            var date = new Date(str*1000);
            return date.toLocaleDateString() + " " + date.toLocaleTimeString();
        }

        function weatherGetItem(dt){
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
        function weatherYahooGetItem(dt){
            return {
                city: dt.location.city,
                description: dt.item.condition.text,
                reading: dt.item.condition.date,
                temperature: dt.item.condition.temp,
                low: dt.item.forecast[0].low,
                high: dt.item.forecast[0].high,
                humidity: dt.atmosphere.humidity,
                sunrise: dt.astronomy.sunrise,
                picture: 'http://l.yimg.com/a/i/us/nws/weather/gr/' + dt.item.condition.code + 'd.png',
                sunset: dt.astronomy.sunset
            }
        }

        function getWeather(url, src) {

            source = src;

            var request = $http({
                method: 'get',
                url: url
            });
            return( request.then( handleSuccess, handleError ) );
        }

        function setErrorData( response ) {
            var message;
            if ( ! angular.isObject( response.data ) || ! response.data.message  ) {
                message ='Weather data is not available right now.\nPlease, try again later.';
            }
            if(response.cod === '404' || response.cod === '500'){
                message = response.cod === '404'? response : 'Weather data is not available right now.\nPlease, try again later.';
            }
            return response.data = {
                error: true,
                message: message
            };
        }

        function handleError( response ) {
            var err = setErrorData(response);
            $q.reject( err );
            return(err);
        }

        function handleSuccess( response ) {
            if(response.data.cod === '404'){
                response.data.error = true;
                return( response.data);
            }else{
                if(source !== 'yahoo'){
                    return( weatherGetItem(response.data) );
                }else{
                    if(response.data.query.results === null){
                        return setErrorData(response);
                    }else{
                        return( weatherYahooGetItem(response.data.query.results.channel) );
                    }
                }
            }
        }

        return({
            getWeather: getWeather
        });

    }])

})();
