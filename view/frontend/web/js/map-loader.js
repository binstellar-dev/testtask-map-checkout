define(['jquery'], function ($) {
    var google_maps_loaded_def = null;

    if (!google_maps_loaded_def) {
        google_maps_loaded_def = $.Deferred();

        // This function will be called by Google Maps when it finishes loading
        window.initGoogleMaps = function () {
            google_maps_loaded_def.resolve(window.google.maps);
        };

        var key = window.checkoutConfig.shipping.select_store.maps_api_key;

        // Inject script tag
        var script = document.createElement("script");
        script.src =
            "https://maps.googleapis.com/maps/api/js?key=" +
            key +
            "&callback=initGoogleMaps"; // ✅ Google prefers callback=initGoogleMaps
        script.async = true;
        script.defer = true;

        script.onerror = function () {
            google_maps_loaded_def.reject();
        };

        document.head.appendChild(script);
    }

    return google_maps_loaded_def.promise();
});

