/**
 * Created by Mikhail on 2/11/2016.
 */
(function() {
    'use strict';

    angular.module('weather')
        .controller('weatherpController', ['$scope', 'Config', 'weatherService', 'alertService', function($scope, Config, weatherService, alertService) {

            $scope.alert = alertService;
            $scope.isLoading = false;
            $scope.isHidden = true;

            $scope.resetForm = function () {
                $scope.isLoading = false;
                $scope.weatherForm.city = "";
                $scope.weatherForm.zip = "";
                $scope.weatherForm.$setPristine();
                $scope.weatherForm.$setUntouched();
            };
            $scope.getWeather = function() {
                var location = '';
                $scope.isLoading = true;

                if ($scope.weatherForm.city && $scope.weatherForm.city !== '') {
                    location = "q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + $scope.weatherForm.city + "')"
                } else if ($scope.weatherForm.zip && $scope.weatherForm.zip !== '' && $scope.weatherForm.zip.length === 5) {
                    location = "q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + $scope.weatherForm.zip + "')"
                }else{
                    $scope.isLoading = false;
                    $scope.isHidden = true;
                    alertService.show({message:'Please enter valid City or ZIP'});
                    $scope.resetForm();
                    return;
                }

                $scope.isHidden = true;
                alertService.hide();
                weatherService.getWeather(Config.urls.weatherp + location, Config.navigation.Weatherp.source).then(
                    function( resp ) {
                        if(resp.error && resp.error === true){
                            $scope.isHidden = true;
                            alertService.show({message:resp.message});
                            $scope.weather = {};
                        }else{
                            $scope.isHidden = false;
                            $scope.weather = resp;
                        }
                        $scope.resetForm();
                        $scope.isLoading = false;
                    }
                );
            };
        }]);

})();