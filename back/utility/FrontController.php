<?php
//namespace App\Controller;

class FrontController
{
    private $controller;
    private $view;

    private $wasHtmlPostSuccessful;

    private $heartbeatService;
    private $configurationService;
    private $doorService;
    private $locationService;
    private $roomService;
    private $espService;
    private $windowService;
    private $firmwareService;
    private $logService;

    public function __construct(HeartbeatService $heartbeatService,
                                ConfigurationService $configurationService,
                                DoorService $doorService,
                                LocationService $locationService,
                                RoomService $roomService,
                                EspService $espService,
                                WindowService $windowService,
                                FirmwareService $firmwareService,
                                LogService $logService,
                                $heartbeat,
                                $wifiCredentials,
                                $doorUpdate,
                                $locationUpdate,
                                $espUpdate,
                                $roomUpdate,
                                $windowUpdate,
                                $firmwareUpdate,
                                $logUpdate,
                                $config)
    {
        $this->heartbeatService = $heartbeatService;
        $this->doorService = $doorService;
        $this->locationService = $locationService;
        $this->roomService = $roomService;
        $this->espService = $espService;
        $this->windowService = $windowService;
        $this->configurationService = $configurationService;
        $this->firmwareService = $firmwareService;
        $this->logService = $logService;

        if (!is_null($heartbeat)) {
            $this->wasHtmlPostSuccessful = $this->heartbeatService->evaluate($heartbeat);
        }

        if (!is_null($wifiCredentials)) {
            $wifiCredentials = json_decode($wifiCredentials);
            $esp = $this->espService->find($wifiCredentials["id"]);

            $this->wasHtmlPostSuccessful = $this->configurationService->configureWifi(
                $esp, $wifiCredentials["ssid"], $wifiCredentials["password"]);
        }

        if (!is_null($doorUpdate)) {
            $this->wasHtmlPostSuccessful = $this->doorService->handleUpdate($doorUpdate);
        }

        if (!is_null($locationUpdate)) {
            $this->wasHtmlPostSuccessful = $this->locationService->handleUpdate($locationUpdate);
        }

        if (!is_null($espUpdate)) {
            $this->wasHtmlPostSuccessful = $this->espService->handleUpdate($espUpdate);
        }

        if (!is_null($roomUpdate)) {
            $this->wasHtmlPostSuccessful = $this->roomService->handleUpdate($roomUpdate);
        }

        if (!is_null($windowUpdate)) {
            $this->wasHtmlPostSuccessful = $this->windowService->handleUpdate($windowUpdate);
        }

        if (!is_null($firmwareUpdate)) {
            $this->wasHtmlPostSuccessful = $this->firmwareService->handleUpdate($firmwareUpdate);
        }

        if (!is_null($logUpdate)) {
            $this->wasHtmlPostSuccessful = $this->logService->handleUpdate($logUpdate);
        }

        if (!is_null($config)) {
            $this->wasHtmlPostSuccessful = $this->configurationService->configure($config);
        }
    }

    public function setController($controller)
    {
        $this->controller = $controller;
    }

    public function setView($view)
    {
        $this->view = $view;
    }

    public function executeAction($action)
    {
        $this->controller->{$action['action']}($action);
    }

    public function output()
    {
        return $this->view->output();
    }
}
