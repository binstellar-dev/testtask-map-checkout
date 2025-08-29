<?php

namespace CustomMapDisplay\ClickAndCollect\Setup;

use CustomMapDisplay\ClickAndCollect\Model\Store;
use CustomMapDisplay\ClickAndCollect\Model\StoreFactory;
use CustomMapDisplay\ClickAndCollect\Api\StoreRepositoryInterface;
use Magento\Framework\Setup\InstallDataInterface;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\ModuleDataSetupInterface;
use Magento\Framework\Stdlib\DateTime\DateTime;

class InstallData implements InstallDataInterface
{
	/**
     * Store factory
     *
     * @var StoreFactory
     */
    protected $storeFactory;

    /**
     * Store repository
     *
     * @var StoreRepository
     */
    private $storeRepository;

    /**
     *
     * @var \Magento\Framework\Stdlib\DateTime\DateTime
     */
    protected $date;

    /**
     * Init
     *
     * @param StoreFactory $storeFactory
     */
    public function __construct(
        StoreFactory $storeFactory,
        StoreRepositoryInterface $storeRepository,
        DateTime $date
    ) {
        $this->storeFactory = $storeFactory;
        $this->storeRepository = $storeRepository;
        $this->date = $date;
    }

    public function install(ModuleDataSetupInterface $setup, ModuleContextInterface $context)
    {
    	$dataSet = [
    		[
    			'name' => 'Binstellar Ahmedabad Branch',
    			'address' => 'Ganesh Meridian, D-402, Sarkhej - Gandhinagar Hwy, opp. Kargil Petrol Pump, Vishwas City 1, Sola, Ahmedabad, Gujarat 380060',
                'working_time' => 'Monday: 7am - 10pm
Tuesday: 7am - 10pm
Wednesday: 7am - 10pm
Thursday: 7am - 10pm
Friday: 7am - 10pm
Saturday: 7am - 10pm
Sunday: CLOSED',
                'latitude' => '23.07545829889500',
                'longitude' => '72.52536810850200',
                'is_active' => 1
    		],
            [
                'name' => 'Binstellar Rajkot Branch',
                'address' => 'Big Bazar Rd, opposite West RMC zone, Chandra Park, Rajkot, Gujarat 360005',
                'working_time' => 'Monday: 7am - 10pm
Tuesday: 7am - 10pm
Wednesday: 7am - 10pm
Thursday: 7am - 10pm
Friday: 7am - 10pm
Saturday: 7am - 10pm
Sunday: CLOSED',
                'latitude' => '22.28008623494800',
                'longitude' => '70.77463192266800',
                'is_active' => 1
            ]
    	];

    	foreach ($dataSet as $data) {
    		$store = $this->storeFactory->create();
            $store->setData($data);
            $this->storeRepository->save($store);
        }
    }
}