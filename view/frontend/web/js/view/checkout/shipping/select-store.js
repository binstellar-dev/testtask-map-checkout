define([
    'uiComponent',
    'ko',
    'jquery',
    'mage/translate',
    'Magento_Ui/js/modal/modal',
    'Magento_Checkout/js/model/quote',
    'Magento_Checkout/js/model/step-navigator',
    'Magento_Checkout/js/model/payment-service',
    'Magento_Checkout/js/action/get-payment-information',
    'Magento_Checkout/js/model/address-converter',
    'Magento_Checkout/js/action/select-shipping-address',   // ✅
    'Magento_Checkout/js/action/set-shipping-information',  // ✅
    'mageclass/map-loader',
    'mageclass/map',
    'jquery-ui-modules/datepicker'
], function (
    Component,
    ko,
    $,
    $t,
    modal,
    quote,
    stepNavigator,
    paymentService,
    getPaymentInformationAction,
    addressConverter,
    selectShippingAddressAction,   // ✅
    setShippingInformationAction,  // ✅
    MapLoader,
    map
) {
    'use strict';

    var popUp = null;

    return Component.extend({
        defaults: {
            template: 'CustomMapDisplay_ClickAndCollect/checkout/shipping/select-store'
        },
        isClickAndCollect: ko.observable(false),
        isSelectStoreVisible: ko.observable(false),
        storesItems: ko.observableArray([]),

        initialize: function () {
            var self = this;

            quote.shippingMethod.subscribe(function (method) {
                if (method && method.carrier_code === 'clickandcollect') {
                    self.isClickAndCollect(true);

                    var stores = window.checkoutConfig.shipping.select_store.stores;
                    if (typeof stores === 'string') {
                        try {
                            stores = $.parseJSON(stores);
                        } catch (e) {
                            stores = { totalRecords: 0, items: [] };
                        }
                    }

                    if (stores.items && stores.items.length > 0) {
                        self.isSelectStoreVisible(true);
                        self.storesItems(stores.items);
                    }
                } else {
                    self.isClickAndCollect(false);
                    self.storesItems([]);
                }
            });

            // ✅ Store selection handler
            $('body').on('click', '.apply-store, .select-point-btn, .select-store', function () {
                var storeId   = $(this).data('store-id');
                var name      = $(this).data('name');
                var address   = $(this).data('address');
                var latitude  = $(this).data('latitude');
                var longitude = $(this).data('longitude');
                var city      = $(this).data('city') || "Ahmedabad";
                var postcode  = $(this).data('postcode') || "380060";

                $('#pickup-store').val(name + ' - ' + address);
                $('#selected-store-msg').show().find('span').text(name);

                if (popUp) {
                    popUp.closeModal();
                }

                // Build plain address data
                var shippingAddressData = {
    firstname: "Click & Collect - ",
    lastname: name,
    street: [address],
    city: city,
    postcode: postcode,
    telephone: "98234987654",
    country_id: "IN",

    // Both must be set
    region: "Gujarat", 
    region_id: "580",   // ← replace with actual ID from DB

    save_in_address_book: 0,
    same_as_billing: 1,
    custom_attributes: {
        pickup_store_id: storeId,
        pickup_store_latitude: latitude,
        pickup_store_longitude: longitude
    }
};


                // Convert to quote address
                var shippingAddress = addressConverter.formAddressDataToQuoteAddress(shippingAddressData);

                // ✅ Tell Magento this is the selected shipping address
                selectShippingAddressAction(shippingAddress);

                // ✅ Save shipping info (so backend won’t complain)
                setShippingInformationAction().done(function () {
                    getPaymentInformationAction().done(function () {
                        if (stepNavigator && typeof stepNavigator.next === 'function') {
                            stepNavigator.next();
                        }
                    });
                });
            });

            return this._super();
        },

        showMap: function () {
            if (!popUp) {
                var options = {
                    type: 'popup',
                    responsive: true,
                    innerScroll: false,
                    title: 'Select Store',
                    buttons: []
                };
                popUp = modal(options, $('.map-wrapper'));
            }

            popUp.openModal();

            MapLoader.done(function () {
                var stores = window.checkoutConfig.shipping.select_store.stores;
                if (typeof stores === 'string') {
                    stores = $.parseJSON(stores);
                }
                if (stores.items && stores.items.length) {
                    map.initMap(stores.items);
                }
            }).fail(function () {
                console.error("ERROR: Google maps library failed to load");
            });
        }
    });
});
