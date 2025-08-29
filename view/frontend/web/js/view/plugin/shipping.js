define([
    'Magento_Checkout/js/model/quote',
    'jquery'
], function (quote, $) {
    'use strict';

    return function (Component) {
        return Component.extend({
            validateShippingInformation: function () {
                var method = quote.shippingMethod();
                if (method && method.carrier_code === 'clickandcollect') {
                    var stores = window.checkoutConfig.shipping.select_store.stores;

                    // if backend sometimes sends JSON string
                    if (typeof stores === 'string') {
                        stores = $.parseJSON(stores);
                    }

                    if ($('#pickup-date').val() === '' || 
                        (stores.totalRecords > 1 && $('#pickup-store').val() === '')) {
                        this.errorValidationMessage(
                            'Please provide when and where (if suitable) you prefer to pick your order.'
                        );
                        return false;
                    }
                }
                return this._super();
            }
        });
    }
});
