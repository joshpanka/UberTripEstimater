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

        function getTimeEstimates(startLat, startLong) {
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
                    "start_latitude": startLat,
                    "start_longitude": startLong
                }
            }).then(SuccessCallback, ErrorCallback);

            function SuccessCallback (resp) {
                return resp.data;
            }

            function ErrorCallback (resp) {
                return resp.data;
            }
        }

        function getPriceEstimates(startLat, startLong,
                    endLat, endLong, rideID) {
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