/**
 * Created by Mikhail on 2/11/2016.
 */
(function() {
    'use strict';

    angular.module('weather')
        .config( ['$routeProvider', 'Navigation', function($routeProvider, navigation) {

            $routeProvider
                .when(navigation['Home'].route, navigation['Home'].config)
                .when(navigation['Weather'].route, navigation['Weather'].config)
                .otherwise({
                    redirectTo: navigation['Home'].route
                });
        }]).run(['$rootScope',function ($rootScope) {
            $rootScope.$on('$locationChangeSuccess', function (evt, newurl) {
                $rootScope.page = newurl.indexOf('home') === -1? 'Weather':'Home';
                $rootScope.urlpage = newurl.indexOf('home') === -1?'home':'weather';
            });
        }]);

})();


