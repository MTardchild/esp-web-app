<?php
//namespace App\Model\Service;

class RelayDataService implements IDatabaseService {
    private $relayDataMapper;

    public function __construct(RelayDataMapper $relayDataMapper) {
        $this->relayDataMapper = $relayDataMapper;
    }

    public function insert($ledStripData) {
        return $this->relayDataMapper->insert($ledStripData);
    }

    public function update($relayData) {
        return $this->relayDataMapper->update($relayData);
    }

    public function delete($relayDataId) {
        return $this->relayDataMapper->delete($relayDataId);
    }

    public function getLatestDataSet($relayId) {
        return $this->relayDataMapper->findLatestDataSet($relayId);
    }

    public function getCollectionCurrentDay($relayId) {
        return $this->relayDataMapper->findCollectionCurrentDay($relayId);
    }
}

