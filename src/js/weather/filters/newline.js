/**
 * Created by Mikhail on 2/11/2016.
 */
(function() {
    'use strict';

    angular.module('weather')
        .filter('newlines', function() {
            return function(text) {
                if(text){
                    return text.split(/\n/g);
                }
            };
        });

})();

