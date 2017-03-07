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

        function activate() {
            MapService.initMap();
            console.log("Activated API View");
        }

        function submit() {
            vm.products.length == 0 ? vm.getProducts(vm.startAddress) :
                vm.setMap(vm.startAddress, vm.endAddress);
        }

        function getGeocode(address) {
            return MapService.getGeocode(address).then(function(resp)  {
                if(resp.status === 200){
                    var dataPoint = resp.data.results[0].geometry.location
                    var datCoords = {
                        lat: dataPoint.lat,
                        lng: dataPoint.lng
                    };
                    return datCoords
                } else {
                    console.log("Error locating address: ", address);
                    return null;
                }
            });
        }

        function setMap(startAddress, endAddress) {
            MapService.clearAllMarkers();

            var coord1Promise = vm.getGeocode(startAddress)
                .then(function(coords){
                    vm.address1Coord = coords;
                    return vm.address1Coord;
                });

            var coord2Promise = coord1Promise
                .then(function(){
                    return vm.getGeocode(endAddress).then(function(coords){
                        vm.address2Coord = coords;
                        return vm.address2Coord;
                    });
                });

            coord2Promise.then(function(){
                MapService.placeMarker(vm.address1Coord, 'A');
                MapService.placeMarker(vm.address2Coord, 'B');

                UberService.getPriceEstimates(vm.address1Coord.lat,
                    vm.address1Coord.lng, vm.address2Coord.lat,
                    vm.address2Coord.lng)
                    .then(function(resp){
                        vm.priceEstimates = resp.prices;
                });
            })
        }

        function getProducts(address) {
            var coordPromise = getGeocode(address)
                .then(function(datCoords){
                    return datCoords;
                });

            return coordPromise.then(function(datCoords){
                return UberService.getTimeEstimates(datCoords.lat, datCoords.lng)
                    .then(function(resp){
                        vm.products = resp.times;
                        return vm.products;
                });
            });
        }

        function clearProducts(){
            vm.products.length = 0;
        }
    }

}());