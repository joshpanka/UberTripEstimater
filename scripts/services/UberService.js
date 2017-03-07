(function () {
    "use strict";

    angular
        .module("uberTripEstimater")
        .factory("UberService", UberService);

    UberService.$inject = ["$http", "UBER_API"];

    function UberService ($http, UBER_API) {
        var service = {
            getProducts: getProducts,
            getTimeEstimates: getTimeEstimates,
            getPriceEstimates: getPriceEstimates
        };

        return service;

        /**
         * Get a list of available products at
         * a given latitude and longitude
         *
         * @param lat  - any given latitude
         * @param long - any given longitude
         * @return       an array of available
         *  products at the given lat and long
         */
        function getProducts(lat, long) {
            return $http({
                method: "GET",
                url: UBER_API.devURL + "/" +
                     UBER_API.apiVersion +"/" +
                     "products",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "TOKEN " + UBER_API.serverToken,
                    "Accept-Language": "en_EN"
                },
                params: {
                    "latitude": lat,
                    "longitude": long
                }
            }).then(SuccessCallback, ErrorCallback);

            function SuccessCallback (resp) {
                return resp.data;
            }

            function ErrorCallback (resp) {
                return resp.data;
            }
        }

        /**
         * Get a list of estimates for how long
         * it would take an uber driver to reach
         * the given lat and long
         *
         * @param lat  - any given latitude
         * @param long - any given longitude
         * @return       an array of time
         *  estimates at the given lat and long
         */
        function getTimeEstimates(lat, long) {
            return $http({
                method: "GET",
                url: UBER_API.devURL + "/" +
                     UBER_API.apiVersion +"/" +
                     "estimates/time",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "TOKEN " + UBER_API.serverToken,
                    "Accept-Language": "en_EN"
                },
                params: {
                    "start_latitude": lat,
                    "start_longitude": long
                }
            }).then(SuccessCallback, ErrorCallback);

            function SuccessCallback (resp) {
                return resp.data;
            }

            function ErrorCallback (resp) {
                return resp.data;
            }
        }

        /**
         * Get a list of estimates for how much
         * it cost to take the predicted trip
         *
         * @param startLat  - any given intial latitude
         * @param startLong - any given intial longitude
         * @param endLat  - any given end latitude
         * @param endLong - any given end longitude
         * @return       an array of price
         *  estimates for the predicted trip
         */
        function getPriceEstimates(startLat, startLong,
                    endLat, endLong) {
            return $http({
                method: "GET",
                url: UBER_API.devURL + "/" +
                     UBER_API.apiVersion +"/" +
                     "estimates/price",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "TOKEN " + UBER_API.serverToken,
                    "Accept-Language": "en_EN"
                },
                params: {
                    "start_latitude": startLat,
                    "start_longitude": startLong,
                    "end_latitude": endLat,
                    "end_longitude": endLong
                }
            }).then(SuccessCallback, ErrorCallback);

            function SuccessCallback (resp) {
                return resp.data;
            }

            function ErrorCallback (resp) {
                return resp.data;
            }
        }
    }

}());