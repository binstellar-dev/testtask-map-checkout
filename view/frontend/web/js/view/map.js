define([
    'jquery'
], function ($) {
    'use strict';
    return {
        initMap: function() {
            var self = this;
            var myLatLng = {
                lat: parseFloat(window.checkoutConfig.shipping.select_store.lat),
                lng: parseFloat(window.checkoutConfig.shipping.select_store.lng)
            };

            var map = new google.maps.Map(document.getElementById('map-canvas'), {
                zoom: parseInt(window.checkoutConfig.shipping.select_store.zoom) || 8,
                center: myLatLng
            });

            var stores = $.parseJSON(window.checkoutConfig.shipping.select_store.stores);
            var infoWindow = new google.maps.InfoWindow();

            // ✅ Fix: loop only through `items`
            $.each(stores.items, function(index, store) {
                var latitude = parseFloat(store.latitude),
                    longitude = parseFloat(store.longitude);

                if (isNaN(latitude) || isNaN(longitude)) {
                    console.warn("Invalid lat/lng for store:", store);
                    return;
                }

                var latLng = new google.maps.LatLng(latitude, longitude);
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    title: store.name
                });

                (function(marker, store) {
                    google.maps.event.addListener(marker, 'click', function() {
                        infoWindow.setContent(
                            '<h3>'+ store.name + '</h3><br />' +
                            '<strong>Address: </strong>' + store.address + '<br /><br />' +
                            (store.working_time ? store.working_time.replace(/(?:\r\n|\r|\n)/g, '<br />') : '') +
                            '<br /><br /><button data-id="'+ store.store_id + '" data-name="'+ store.name +'" class="apply-store">Pick Up Here!</button>'
                        );
                        infoWindow.open(map, marker);
                    });
                })(marker, store);
            });
        }
    }
});
