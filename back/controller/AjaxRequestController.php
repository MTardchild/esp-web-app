<?php

class AjaxRequestController
{
    private $connectionPostService;
    private $connectionUdpService;
    private $connectionTcpService;
    private $dhtDataService;
    private $ledStripDataService;
    private $relayDataService;
    private $ajaxRequest;
    private $espService;
    private $componentTypeService;
    private $componentService;
    private $configurationService;
    private $firmwareService;
    private $roomService;
    private $windowService;
    private $locationService;
    private $doorService;
    private $ledStripService;
    private $espCommunicationService;

    public function __construct(ConnectionPostService $connectionPostService,
                                ConnectionUdpService $connectionUdpService,
                                ConnectionTcpService $connectionTcpService,
                                EspService $espService,
                                DhtDataService $dhtDataService,
                                RelayDataService $relayDataService,
                                LedStripDataService $ledStripDataService,
                                AjaxRequest $ajaxRequest,
                                ComponentTypeService $componentTypeService,
                                ComponentService $componentService,
                                ConfigurationService $configurationService,
                                FirmwareService $firmwareService,
                                RoomService $roomService,
                                WindowService $windowService,
                                LocationService $locationService,
                                DoorService $doorService,
                                LedStripService $ledStripService,
                                EspCommunicationService $espCommunicationService)
    {
        $this->connectionPostService = $connectionPostService;
        $this->connectionUdpService = $connectionUdpService;
        $this->connectionTcpService = $connectionTcpService;
        $this->dhtDataService = $dhtDataService;
        $this->relayDataService = $relayDataService;
        $this->ajaxRequest = $ajaxRequest;
        $this->ledStripDataService = $ledStripDataService;
        $this->espService = $espService;
        $this->componentTypeService = $componentTypeService;
        $this->componentService = $componentService;
        $this->configurationService = $configurationService;
        $this->firmwareService = $firmwareService;
        $this->roomService = $roomService;
        $this->windowService = $windowService;
        $this->locationService = $locationService;
        $this->doorService = $doorService;
        $this->ledStripService = $ledStripService;
        $this->espCommunicationService = $espCommunicationService;
    }

    public function toggleRelay($action)
    {
        $command = ToggleCommand::createToggleCommand($action["id"]);
        $status = $this->espCommunicationService->handle($command);

        if ($status) {
            $this->ajaxRequest->setStatus($status);
            $this->ajaxRequest->setMessage("Relay successfully toggled.");
        } else {
            $this->ajaxRequest->setMessage($status);
        }
    }

    public function setColor($action)
    {
        $ledStrip = $this->ledStripService->find($action['id']);
        $command = SetColorCommand::createSetColorCommand(
            $ledStrip, $action['r'], $action['g'], $action['b'], $action['ww']);
        $status = $this->espCommunicationService->handle($command);

        if ($status) {
            $this->ajaxRequest->setStatus($status);
            $this->ajaxRequest->setMessage("Color successfully sent to LED-Strip.");
        } else {
            $this->ajaxRequest->setMessage($status);
        }
    }

    public function flash($action)
    {
        $esp = $this->espService->findByHwId($action['esp']);
        $command = FlashCommand::createFlashCommand(
            $esp, $this->firmwareService->find($action['firmware']));
        $status = $this->espCommunicationService->handle($command);

        $this->ajaxRequest->setMessage("Flashed " . $esp->getIp());
    }

    public function getEsps($action)
    {
        $this->ajaxRequest->setMessage(json_encode($this->espService->findAll()));
    }

    public function addComponent($action)
    {
        $component = $this->componentTypeService->getComponentOfType(intval($action["type"]));
        $component->setId($this->componentService->findFreeId());
        $component->setEspId($action["esp"]);
        $this->componentService->insert($component);

        $this->ajaxRequest->setMessage(json_encode($component));
    }

    public function removeComponent($action)
    {
        $this->componentService->removeComponentFromEsp($action["id"]);
        $component = $this->componentService->find($action["id"]);

        $this->ajaxRequest->setMessage(json_encode($component));
    }

    public function getUnconfiguredEsps($action)
    {
        $wifiNetworks = $this->configurationService->getWifiNetworks();

        $this->ajaxRequest->setMessage(json_encode($wifiNetworks));
    }

    public function getFirmwares($action)
    {
        $this->ajaxRequest->setMessage(json_encode($this->firmwareService->findAll()));
    }

    public function getRooms($action)
    {
        $this->ajaxRequest->setMessage(json_encode($this->roomService->findAll()));
    }

    public function getWindows($action)
    {
        $this->ajaxRequest->setMessage(json_encode($this->windowService->findAll()));
    }

    public function getDoors($action)
    {
        $this->ajaxRequest->setMessage(json_encode($this->doorService->findAll()));
    }

    public function getLocations($action)
    {
        $this->ajaxRequest->setMessage(json_encode($this->locationService->findAll()));
    }
}
