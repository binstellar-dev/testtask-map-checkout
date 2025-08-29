<?php
namespace CustomMapDisplay\ClickAndCollect\Model\ResourceModel;

class Store extends \Magento\Framework\Model\ResourceModel\Db\AbstractDb
{
    /**
     * Initialize resource model
     *
     * @return void
     */
    protected function _construct()
    {
        $this->_init('mageclass_clickandcollect_store', 'store_id');
    }
}