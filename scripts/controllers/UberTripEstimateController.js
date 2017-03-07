(function() {
    "use strict";

    angular
        .module("uberTripEstimater")
        .controller("UberTripEstimateController", UberTripEstimateController);

    UberTripEstimateController.$inject = ["MapService", "UberService"];

    function UberTripEstimateController(MapService, UberService){
        var vm = this;

        // Attributes set by MapService
        vm.startAddress = null;
        vm.endAddress = null;
        vm.address1Coord = {};
        vm.address2Coord = {};
        vm.getGeocode = getGeocode;
        vm.setMap = setMap;

        // Attributes set by UberService
        vm.priceEstimates = [];
        vm.timeEstimates = [];
        vm.products = [];
        vm.getProducts = getProducts;
        vm.clearProducts  = clearProducts;
        vm.rideType = null;

        // Allow for variable action on form submit
        vm.submit = submit;

        activate();

        /**
         * Initialize the Google Map on start up
         */
        function activate() {
            MapService.initMap();
            console.log("Activated API View");
        }

        /**
         * Perform specific submit task based on current
         * application state.
         *
         * If no products get products from Uber API
         * Else set map with start and end address
         */
        function submit() {
            vm.products.length == 0 ? vm.getProducts(vm.startAddress) :
                vm.setMap(vm.startAddress, vm.endAddress);
        }

        /**
         * Converts address into latitude and longitude.
         *
         * @param address - any address
         * @return          object containing lat and
         *                      lng values
         */
        function getGeocode(address) {
            return MapService.getGeocode(address).then(function(resp)  {
                var dataPoint = resp.data.results[0].geometry.location
                var datCoords = {
                    lat: dataPoint.lat,
                    lng: dataPoint.lng
                };
                return datCoords
            }).catch(function(error){
                console.log("Error getting geocode for: ", address);
                return null;
            });
        }

        /**
         * Sets start and end address points on map.
         *
         * @param startAddress - any intial address
         * @param endAddress   - any end address
         */
        function setMap(startAddress, endAddress) {
            MapService.clearAllMarkers();

            var coord1Promise = vm.getGeocode(startAddress)
                .then(function(coords){
                    vm.address1Coord = coords;
                    return vm.address1Coord;
                }).catch(function(error){
                    console.log("Error getting coords for: ", startAddress);
                    return null;
                });

            var coord2Promise = coord1Promise
                .then(function(){
                    return vm.getGeocode(endAddress).then(function(coords){
                        vm.address2Coord = coords;
                        return vm.address2Coord;
                    });
                }).catch(function(error){
                    console.log("Error getting coords for: ", endAddress);
                    return null;
                });

            coord2Promise.then(function(){
                MapService.placeMarker(vm.address1Coord, 'A');
                MapService.placeMarker(vm.address2Coord, 'B');

                UberService.getPriceEstimates(vm.address1Coord.lat,
                    vm.address1Coord.lng, vm.address2Coord.lat,
                    vm.address2Coord.lng)
                    .then(function(resp){
                        vm.priceEstimates = resp.prices;
                    })
                    .catch(function(error){
                        console.log("Error getting price estimate for trip: ",
                            vm.address1Coord, " ", vm.address2Coord);
                    });
            })
        }

        /**
         * Gets available uber products at a given address.
         *
         * @param address - any address
         * @return          available uber products at a
         *                  given address
         */
        function getProducts(address) {
            var coordPromise = getGeocode(address)
                .then(function(datCoords){
                    return datCoords;
                })
                .catch(function(error){
                    console.log("Error geocode for address: ",
                            address);
                });

            return coordPromise.then(function(datCoords){
                return UberService.getTimeEstimates(datCoords.lat, datCoords.lng)
                    .then(function(resp){
                        vm.products = resp.times;
                        return vm.products;
                    });
                })
                .catch(function(error){
                    console.log("Error time estimates for: ",
                            address);
                });
        }

        /**
         * Clears current products list.
         */
        function clearProducts(){
            vm.products.length = 0;
        }
    }

}());