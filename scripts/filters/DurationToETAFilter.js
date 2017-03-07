(function () {
    "use strict";

    angular
        .module("uberTripEstimater")
        .filter("durationToETA", durationToETA);


    function durationToETA() {
        return function(seconds) {
            var d = new Date();
            d.setSeconds(d.getSeconds() + seconds);
            return d;
        }
    }

}());