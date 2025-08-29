<?php
namespace CustomMapDisplay\ClickAndCollect\Ui\Component\Listing\DataProviders\CustomMapDisplay\ClickAndCollect;

class Grid extends \Magento\Ui\DataProvider\AbstractDataProvider
{    
    public function __construct(
        $name,
        $primaryFieldName,
        $requestFieldName,
        \CustomMapDisplay\ClickAndCollect\Model\ResourceModel\Store\CollectionFactory $collectionFactory,
        array $meta = [],
        array $data = []
    ) {
        parent::__construct($name, $primaryFieldName, $requestFieldName, $meta, $data);
        $this->collection = $collectionFactory->create();
    }
}
