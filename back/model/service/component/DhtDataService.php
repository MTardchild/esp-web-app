<?php
//namespace App\Model\Service;

class DhtDataService implements IDatabaseService
{
    private $dhtDataMapper;

    public function __construct(DhtDataMapper $dhtDataMapper)
    {
        $this->dhtDataMapper = $dhtDataMapper;
    }

    public function insert($dhtData)
    {
        return $this->dhtDataMapper->insert($dhtData);
    }

    public function update($dhtData)
    {
        return $this->dhtDataMapper->update($dhtData);
    }

    public function delete($dhtDataId)
    {
        return $this->dhtDataMapper->delete($dhtDataId);
    }

    public function getLatestDataSet($dhtId)
    {
        return $this->dhtDataMapper->findLatestDataset($dhtId);
    }

    public function getCollectionCurrentDay($dhtId)
    {
        return $this->dhtDataMapper->findCollectionCurrentDay($dhtId);
    }
}

