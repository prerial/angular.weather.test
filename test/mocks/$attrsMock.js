
(function () {
    "use strict";

    angular.module('weather').factory('$attrsMock', AttrsMockFactory);

    function AttrsMockFactory() {
        function AttrsMock(elem, map) {

        }

        return AttrsMock;
    }

})();