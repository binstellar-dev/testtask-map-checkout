<?php
namespace CustomMapDisplay\Checkout\Plugin\Magento\Checkout;
class LayoutProcessor
{

    /**
     * @var \Magento\Framework\App\Config\ScopeConfigInterface
     */
    protected $scopeConfig;

    /**
     * @var \Magento\Checkout\Model\Session
     */
    protected $checkoutSession;

    /**
     * @var \Magento\Customer\Model\AddressFactory
     */
    protected $customerAddressFactory;

    /**
     * @var \Magento\Framework\Data\Form\FormKey
     */
    protected $formKey;

    public function __construct(
        \Magento\Framework\View\Element\Template\Context $context,
        \Magento\CheckoutAgreements\Model\ResourceModel\Agreement\CollectionFactory $agreementCollectionFactory,
        \Magento\Checkout\Model\Session $checkoutSession,
        \Magento\Customer\Model\AddressFactory $customerAddressFactory
    ) {
        $this->scopeConfig = $context->getScopeConfig();
        $this->checkoutSession = $checkoutSession;
        $this->customerAddressFactory = $customerAddressFactory;
    }
    /**
     * @param \Magento\Checkout\Block\Checkout\LayoutProcessor $subject
     * @param array $jsLayout
     * @return array
     */
    public function afterProcess(
        \Magento\Checkout\Block\Checkout\LayoutProcessor $subject,
        array $jsLayout
    ) {
        $beforePlaceOrderPath = &$jsLayout['components']['checkout']['children']['steps']['children']['billing-step']['children']
        ['payment']['children']['payments-list']['children']['before-place-order']['children'];

        // Add map field
        $beforePlaceOrderPath['map'] = [
            'component' => 'CustomMapDisplay_Checkout/js/view/map',
            'config' => [
                'customScope' => 'shippingAddress',
                'elementTmpl' => 'CustomMapDisplay_Checkout/map-field', // path to your knockout template
                'id' => 'map'
            ],
            'dataScope' => 'ordercomment.map',
            'label' => 'Pick Store Location',
            'provider' => 'checkoutProvider',
            'visible' => true,
            'sortOrder' => 260
        ];

        return $jsLayout;
    }


}