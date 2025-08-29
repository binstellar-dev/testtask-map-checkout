<?php
namespace CustomMapDisplay\ClickAndCollect\Controller\Adminhtml\Index;

use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Backend\App\Action\Context;
use CustomMapDisplay\ClickAndCollect\Api\StoreRepositoryInterface;

class Delete extends \Magento\Backend\App\Action
{
    /**
     * @var \CustomMapDisplay\ClickAndCollect\Api\StoreRepositoryInterface
     */
    protected $storeRepository;

    /**
     * @param \Magento\Backend\App\Action\Context $context
     * @param \CustomMapDisplay\ClickAndCollect\Api\StoreRepositoryInterface $storeRepository
     */
    public function __construct(
        Context $context,
        StoreRepositoryInterface $storeRepository
    ){

        $this->storeRepository = $storeRepository;
        parent::__construct($context);
    }
    /**
     * Delete action
     *
     * @return \Magento\Backend\Model\View\Result\Redirect
     */
    public function execute()
    {
        $resultRedirect = $this->resultRedirectFactory->create();
        $id = $this->getRequest()->getParam('store_id');
        if ($id) {
            try {
                $this->storeRepository->deleteById($id);
                $this->messageManager->addSuccessMessage(__('The store has been deleted.'));
                $resultRedirect->setPath('*/*/');
                return $resultRedirect;
            } catch (NoSuchEntityException $e) {
                $this->messageManager->addErrorMessage(__('The store does not exist.'));
                return $resultRedirect->setPath('*/*/');
            } catch (LocalizedException $e) {
                $this->messageManager->addErrorMessage($e->getMessage());
                return $resultRedirect->setPath('*/*/edit', ['store_id' => $id]);
            } catch (\Exception $e) {
                $this->messageManager->addErrorMessage(__('There was a problem deleting the store'));
                return $resultRedirect->setPath('*/*/edit', ['store_id' => $id]);
            }
        }
        $this->messageManager->addErrorMessage(__('We can\'t find the store to delete.'));
        $resultRedirect->setPath('*/*/');
        return $resultRedirect;
    }
}
