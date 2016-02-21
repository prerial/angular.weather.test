/**
 * Created by Mikhail on 2/11/2016.
 */
(function() {
    'use strict';

    angular.module('weather')
        .controller('appController', ['$scope', function($scope) {
            $scope.isNavHidden = false;
            $scope.toggleNav = function(){
                 $scope.isNavHidden = !$scope.isNavHidden;
            }
        }]);

})();