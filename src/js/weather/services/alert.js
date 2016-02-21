/**
 * Created by Mikhail on 2/11/2016.
 */
(function() {
    'use strict';

    angular.module('weather').service('alertService', function() {

        var service = {};
        service.show = function(err) {
            service.isAlert = true;
            service.alertParam = err;
        };
        service.hide = function() {
            service.isAlert = false;
        };
        return service;
    })

})();
