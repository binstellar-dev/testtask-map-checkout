var config = {
    map: {
       '*': {
           'mageclass/map-loader' : 'CustomMapDisplay_ClickAndCollect/js/map-loader',
           'mageclass/stores-provider' : 'CustomMapDisplay_ClickAndCollect/js/model/stores-provider',
           'mageclass/map' : 'CustomMapDisplay_ClickAndCollect/js/view/map',
           'Magento_Checkout/js/model/shipping-save-processor/default': 'CustomMapDisplay_ClickAndCollect/js/model/shipping-save-processor/default'
       }
    },
    config: {
    	mixins: {
            'Magento_Checkout/js/view/shipping': {
                'CustomMapDisplay_ClickAndCollect/js/view/plugin/shipping': true
            }
        }
    }
};
