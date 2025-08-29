<?php
namespace CustomMapDisplay\ClickAndCollect\Model\ResourceModel\Store;

class Collection extends \Magento\Framework\Model\ResourceModel\Db\Collection\AbstractCollection
{
    /**
     * @var string
     */
    protected $_idFieldName = 'store_id';
    /**
     * Define resource model
     *
     * @return void
     */
    protected function _construct()
    {
        $this->_init('CustomMapDisplay\ClickAndCollect\Model\Store', 'CustomMapDisplay\ClickAndCollect\Model\ResourceModel\Store');
    }

    public function addActiveFilter()
    {
        $this->addFieldToFilter('is_active', 1);
        return $this;
    }
}