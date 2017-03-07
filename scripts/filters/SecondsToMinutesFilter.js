(function () {
    "use strict";

    angular
        .module("uberTripEstimater")
        .filter("secondsToMinutes", secondsToMinutes);

    /**
     * Converts number of seconds to minutes.
     *
     * @param seconds - given number of seconds
     * @return number of minutes from seconds
     */
    function secondsToMinutes() {
        return function(seconds) {
            return seconds/60;
        }
    }

}());