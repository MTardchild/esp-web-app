<?php

class HeartbeatService
{
    private $dhtDataService;
    private $relayDataService;
    private $ledStripDataService;
    private $espService;
    private $locationService;
    private $componentService;
    private $connectionTcpService;

    public function __construct(
        EspService $espService,
        DhtDataService $dhtDataService,
        RelayDataService $relayDataService,
        LedStripDataService $ledStripDataService,
        LocationService $locationService,
        ComponentService $componentService,
        ConnectionTcpService $connectionTcpService)
    {
        $this->dhtDataService = $dhtDataService;
        $this->relayDataService = $relayDataService;
        $this->espService = $espService;
        $this->locationService = $locationService;
        $this->componentService = $componentService;
        $this->ledStripDataService = $ledStripDataService;
        $this->connectionTcpService = $connectionTcpService;
    }

    public function evaluate($heartbeatJsonString)
    {
        $heartbeatJson = json_decode($heartbeatJsonString, true);

        if ($this->IsEspIdValid($heartbeatJson['esp']['id'])) {
            $this->updateEsp($heartbeatJson['esp']);
        } else {
            $this->configureEsp($heartbeatJson['esp']);
        }

        return true;
    }

    private function updateEsp($espJson)
    {
        $isSuccessful = false;
        $esp = Esp::createEsp(
            $espJson['id'],
            $espJson['name'],
            $this->locationService->find($espJson['location']),
            $espJson['ip'],
            $espJson['hwId']
        );

        if ($this->espService->find($espJson['id']) instanceof Esp) {
            $isSuccessful = $this->espService->update($esp)
                && $this->insertComponentData($espJson['id'], $espJson['components']);
        }

        return $isSuccessful;
    }

    private function insertComponentData($espId, $componentsJson)
    {
        $isSuccessful = false;

        if (!is_null($componentsJson)) {
            foreach ($componentsJson as $component) {
                switch ($component) {
                    case $component['componentType'] == COMPONENT_TYPE_DHT:
                        $isSuccessful = $this->insertDhtData($espId, $component);
                        break;
                    case $component['componentType'] == COMPONENT_TYPE_RELAY:
                        $isSuccessful = $this->insertRelayData($espId, $component);
                        break;
                    case $component['componentType'] == COMPONENT_TYPE_LED_STRIP:
                        $isSuccessful = $this->insertLedStripData($espId, $component);
                        break;
                }
            }
        }

        return $isSuccessful;
    }

    private function insertDhtData($espId, $dhtData)
    {
        $dht = Dht::createDht(
            $dhtData['componentId'],
            $dhtData['temperature'],
            $dhtData['humidity'],
            $dhtData['name'],
            $espId
        );

        return $this->dhtDataService->insert($dht);
    }

    private function insertRelayData($espId, $relayData)
    {
        $relay = Relay::createRelay(
            $relayData['componentId'],
            $relayData['name'],
            $relayData['state'],
            $espId
        );

        return $this->relayDataService->insert($relay);
    }

    private function insertLedStripData($espId, $ledStripData)
    {
        $ledStrip = LedStrip::createLedStrip(
            $ledStripData['componentId'],
            $ledStripData['name'],
            $ledStripData['red'],
            $ledStripData['green'],
            $ledStripData['blue'],
            $ledStripData['warmWhite'],
            $espId
        );

        return $this->ledStripDataService->insert($ledStrip);
    }

    private function IsEspIdValid($espId)
    {
        if ($espId <= 0) {
            return false;
        } else {
            return true;
        }
    }

    private function configureEsp($espJson)
    {
        $espId = $this->espService->findFreeId();
        $esp = Esp::createEsp(
            $espId,
            "esp" . $espId,
            Location::createLocationEmptyId($this->locationService->findFreeId()),
            $espJson['ip'],
            $espJson["hwId"]);

        $esp->setComponents($this->createComponentCollection($espJson, $espId));
        $this->espService->insert($esp);
        $this->connectionTcpService->send($esp, json_encode($esp));
    }

    private function createComponentCollection($espJson, $espId)
    {
        $components = array();
        $freeId = $this->componentService->findFreeId();

        foreach ($espJson['components'] as $component) {
            switch ($component['componentType']) {
                case 1:
                    $dht = Dht::createDhtNoData($freeId, $espId);
                    array_push($components, $dht);
                    break;
                case 2:
                    $relay = Relay::createRelayNoData($freeId, $espId);
                    array_push($components, $relay);
                    break;
                case 3:
                    $ledStrip = LedStrip::createLedStripNoData($freeId, $espId);
                    array_push($components, $ledStrip);
                    break;
                default:
                    // todo error
                    break;
            }

            ++$freeId;
        }

        return $components;
    }
}
