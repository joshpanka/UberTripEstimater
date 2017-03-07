/**
 * Filter used estimate ETA given a duration in seconds
 */
(function () {
    "use strict";

    angular
        .module("uberTripEstimater")
        .filter("durationToETA", durationToETA);

    /**
     * Adds a given duration in seconds to current time.
     *
     * @param seconds - expected duration in seconds
     * @return ETA - expected duration plus current time
     */
    function durationToETA() {
        return function(seconds) {
            var d = new Date();
            d.setSeconds(d.getSeconds() + seconds);
            return d;
        }
    }

}());