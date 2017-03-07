(function () {
    "use strict";

    angular
        .module("uberTripEstimater")
        .service("MapService", MapService);

    MapService.$inject = ["$http", "MAPS_API"];

    function MapService($http, MAPS_API) {
        var map;
        var bounds = new google.maps.LatLngBounds();
        var markers = [];

        var service = {
            initMap: initMap,
            placeMarker: placeMarker,
            clearAllMarkers: clearAllMarkers,
            getGeocode: getGeocode
        };

        return service;

        function initMap(initLat, initLong) {
            if (!map){
                var myLatLng = {lat: 42.3132882, lng: -71.1972408};
                map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 8,
                    center: myLatLng
                });
            }
        }

        function placeMarker(coord, label) {
            var marker;
            if (map){
                marker = new google.maps.Marker({
                    position: coord,
                    label: label,
                    map: map
                });
                markers.push(marker);
            } else {
                initMap(coord.lat, coord.lng);
                marker = new google.maps.Marker({
                    position: coord,
                    label: label,
                    map: map
                });
                markers.push(marker);
            }
            marker.addListener('click', function() {
              map.setCenter(marker.getPosition());
            });

            bounds.extend(new google.maps.LatLng(coord.lat, coord.lng));
            map.fitBounds(bounds);
            map.setCenter(bounds.getCenter());
        }

        function clearAllMarkers() {
            if(map){
                markers.forEach(function(marker){
                    marker.setMap(null);
                });
                markers.length = 0;
                bounds = new google.maps.LatLngBounds();
            }
        }

        function getGeocode(address) {
            return $http({
                method: 'GET',
                url: MAPS_API.url + "/geocode/json",
                params: {
                    address: address,
                    key: MAPS_API.key
                }
            }).then(SuccessCallback, ErrorCallback);

            function SuccessCallback(resp) {
                return resp;
            }

            function ErrorCallback(resp) {
                return resp;
            }
        }
    }
}());