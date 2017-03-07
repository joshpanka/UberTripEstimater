(function () {
    "use strict";

    angular
        .module("uberTripEstimater")
        .filter("secondsToMinutes", secondsToMinutes);


    function secondsToMinutes() {
        return function(seconds) {
            return seconds/60;
        }
    }

}());