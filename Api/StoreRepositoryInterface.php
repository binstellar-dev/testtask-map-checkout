<?php
namespace CustomMapDisplay\ClickAndCollect\Api;

interface StoreRepositoryInterface
{
    /**
     * Save store
     * 
     * @param \CustomMapDisplay\ClickAndCollect\Api\Data\StoreInterface $store
     * @return \CustomMapDisplay\ClickAndCollect\Api\Data\StoreInterface
     * @throws \Magento\Framework\Exception\CouldNotSaveException
     */
    public function save(\CustomMapDisplay\ClickAndCollect\Api\Data\StoreInterface $store);

    /**
     * Returns store by ID 
     * 
     * @param int $storeId
     * @return \CustomMapDisplay\ClickAndCollect\Api\Data\StoreInterface
     * @throws \Magento\Framework\Exception\NoSuchEntityException
     */
    public function get($storeId);

    /**
     * Deletes store
     * 
     * @param \CustomMapDisplay\ClickAndCollect\Api\Data\StoreInterface $store
     * @return bool
     * @throws \Magento\Framework\Exception\CouldNotDeleteException
     */
    public function delete(\CustomMapDisplay\ClickAndCollect\Api\Data\StoreInterface $store);

    /**
     * Deletes store by ID
     * 
     * @param int $storeId
     * @return bool
     * @throws \Magento\Framework\Exception\CouldNotDeleteException
     */
    public function deleteById($storeId);

}