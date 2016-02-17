/**
 * Created by Mikhail on 2/11/2016.
 */
(function() {
    'use strict';

    angular.module('weather')
        .config( ['$routeProvider', 'Config', function($routeProvider, Config) {

            $routeProvider
                .when(Config.navigation['Home'].route, Config.navigation['Home'].config)
                .when(Config.navigation['Weather'].route, Config.navigation['Weather'].config)
                .otherwise({
                    redirectTo: Config.navigation['Home'].route
                });
        }]).run(['$rootScope',function ($rootScope) {
            $rootScope.$on('$locationChangeSuccess', function (evt, newurl) {
                $rootScope.page = newurl.indexOf('home') === -1? 'Weather':'Home';
            });
        }]);

})();


