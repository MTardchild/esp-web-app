<?php
//namespace App\Model\Service;

class ComponentService implements IDatabaseService {
    private $componentMapper;
    private $dhtDataService;
    private $relayDataService;
    private $ledStripDataService;

    public function __construct(ComponentMapper $componentMapper,
                                DhtDataService $dhtDataService,
                                RelayDataService $relayDataService,
                                LedStripDataService $ledStripDataService) {
        $this->componentMapper = $componentMapper;
        $this->dhtDataService = $dhtDataService;
        $this->relayDataService = $relayDataService;
        $this->ledStripDataService = $ledStripDataService;
    }

    public function insert($component) {
        return $this->componentMapper->insert($component);
    }

    public function update($component) {
        return $this->componentMapper->update($component);
    }

    public function delete($component) {
        return $this->componentMapper->delete($component);
    }

    public function findComponent($componentId) {
        $componentDb = $this->componentMapper->findComponent($componentId);
        $component = $this->createComponentObject($componentDb);

        return $component;
    }

    public function getComponents($espId) {
        $componentsDb = $this->componentMapper->findComponents($espId);
        $components = $this->createComponentObjects($componentsDb);

        return $components;
    }

    public function getEspIpByComponentId($componentId) {
        return $this->componentMapper->getEspIpByComponentId($componentId);
    }

    public function findFreeId() {
        return $this->componentMapper->findFreeId();
    }

    private function createComponentObject($componentDb) {
        switch($componentDb["cty_type"]) {
            case "dht":
                return $this->dhtDataService->getLatestDataSet($componentDb["cmp_id"]);
            case "relay":
                return $this->relayDataService->getLatestDataSet($componentDb["cmp_id"]);
            case "ledStrip":
                return $this->ledStripDataService->findLatestDataSet($componentDb['cmp_id']);
        }

        return null;
    }

    private function createComponentObjects($componentsDb) {
        $componentsArray = array();

        foreach ($componentsDb as $component) {
            array_push($componentsArray, $this->createComponentObject($component));
        }

        return $componentsArray;
    }
}
