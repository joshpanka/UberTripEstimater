(function () {
    "use strict";

    angular
        .module("uberTripEstimater", ["ngRoute"])
        .constant("UBER_API", {
            apiVersion: "v1.2",
            serverToken: "YOUR_UBER_SERVER_TOKEN",
            devURL: "https://sandbox-api.uber.com",
            prodURL: "https://api.uber.com"
        })
        .constant("MAPS_API", {
            key: "YOUR_MAPS_API_KEY",
            url: "https://maps.googleapis.com/maps/api"
        })
        .config(ConfigureApp);

        ConfigureApp.$inject = ["$httpProvider", "$routeProvider", "$locationProvider"];

        function ConfigureApp($httpProvider, $routeProvider, $locationProvider){
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common["X-Requested-With"];

            $locationProvider.html5Mode(true);

            $routeProvider
                .when("/", {
                    templateUrl: "views/home.html",
                    controller: "UberTripEstimateController"
                })
                .otherwise({
                    redirect: "/"
                });
        }
}());
