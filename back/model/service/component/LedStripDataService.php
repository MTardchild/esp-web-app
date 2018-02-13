<?php

class LedStripDataService implements IDatabaseService
{
    private $ledStripDataMapper;

    public function __construct(LedStripDataMapper $ledStripDataMapper)
    {
        $this->ledStripDataMapper = $ledStripDataMapper;
    }

    public function insert($ledStripData)
    {
        return $this->ledStripDataMapper->insert($ledStripData);
    }

    public function update($ledStripData)
    {
        return $this->ledStripDataMapper->update($ledStripData);
    }

    public function delete($ledStripDataId)
    {
        return $this->ledStripDataMapper->delete($ledStripDataId);
    }

    public function findLatestDataSet($ledStripId)
    {
        return $this->ledStripDataMapper->findLatestDataSet($ledStripId);
    }

    public function findCollectionCurrentDay($ledStripId)
    {
        return $this->ledStripDataMapper->findCollectionCurrentDay($ledStripId);
    }
}