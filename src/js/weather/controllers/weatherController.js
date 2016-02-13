/**
 * Created by Mikhail on 2/11/2016.
 */
(function() {
    'use strict';

    angular.module('weather')
        .controller('weatherController', ['$scope', 'urls', 'weatherService', 'alertService', function($scope, urls, weatherService, alertService) {

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
                var location = null;
                $scope.isLoading = true;
                if ($scope.weatherForm.city) {
                    location = 'q='+$scope.weatherForm.city;
                } else if ($scope.weatherForm.zip && $scope.weatherForm.zip.length === 5) {
                    location = 'zip='+$scope.weatherForm.zip;
                }else{
                    $scope.isLoading = false;
                    $scope.isHidden = true;
                    alertService.show({message:'Please enter valid City or ZIP'});
                    $scope.resetForm();
                    return;
                }
                $scope.isHidden = true;
                alertService.hide();
                weatherService.getWeather(urls.weather + location).then(
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