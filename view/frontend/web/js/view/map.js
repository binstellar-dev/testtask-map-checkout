define([
    'uiComponent',
    'CustomMapDisplay_Checkout/js/model/api-load-listener'
], function (Component, loadListener) {
    'use strict';

    function waitForMapContainer(callback) {
        var interval = setInterval(function () {
            var mapContainer = document.getElementById('map');
            if (mapContainer) {
                clearInterval(interval);
                callback(mapContainer);
            }
        }, 100);
    }

    return Component.extend({
        defaults: {
            template: 'CustomMapDisplay_Checkout/map-field'
        },

        initialize: function () {
            this._super();

            window.notifySubscribers = function() {
                loadListener.isGoogleApiLoaded(true);
            };

            if (!window.google || !google.maps) {
                if (!document.getElementById('google-maps-api')) {
                    var script = document.createElement('script');
                    script.id = 'google-maps-api';
                    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB3PaPQbGeKbfvLv1QSugYMG4VI7mn2kjk&libraries=places&callback=notifySubscribers';
                    script.async = true;
                    script.defer = true;
                    document.head.appendChild(script);
                }
            }

            loadListener.isGoogleApiLoaded.subscribe(function (loaded) {
                if (loaded) {
                    waitForMapContainer(function (mapContainer) {

                        // Initialize map centered at Ahmedabad
                        var map = new google.maps.Map(mapContainer, {
                            center: {lat: 23.0225, lng: 72.5714}, // Ahmedabad
                            zoom: 12,
                            mapTypeId: 'roadmap'
                        });

                        // Store locations
                        var stores = [
                            {
                                name: 'Binstellar Technologies',
                                position: {lat: 23.036, lng: 72.525}
                            },
                            {
                                name: 'Virtual Codes',
                                position: {lat: 23.050, lng: 72.560}
                            }
                        ];

                        // Add markers
                        stores.forEach(function(store) {
                            var marker = new google.maps.Marker({
                                position: store.position,
                                map: map,
                                title: store.name
                            });

                            var infoWindow = new google.maps.InfoWindow({
                                content: '<strong>' + store.name + '</strong>'
                            });

                            marker.addListener('click', function() {
                                infoWindow.open(map, marker);
                            });
                        });

                    });
                }
            });
        }
    });
});