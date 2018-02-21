<?php
//namespace App\Controller;

class FrontController {
    private $heartbeatService;

    private $controller;
    private $view;

    private $wasHtmlPostSuccessful;
    private $gridLayoutService;
    private $configurationService;
    private $doorService;
    private $locationService;
    private $roomService;
    private $espService;

    public function __construct(HeartbeatService $heartbeatService,
                                GridLayoutService $gridLayoutService,
                                ConfigurationService $configurationService,
                                DoorService $doorService,
                                LocationService $locationService,
                                RoomService $roomService,
                                EspService $espService,
                                WindowService $windowService,
                                $heartbeat,
                                $gridLayout,
                                $componentOrder,
                                $wifiCredentials,
                                $doorUpdate,
                                $locationUpdate,
                                $espUpdate,
                                $roomUpdate,
                                $windowUpdate) {
        $this->heartbeatService = $heartbeatService;
        $this->gridLayoutService = $gridLayoutService;
        $this->doorService = $doorService;
        $this->locationService = $locationService;
        $this->roomService = $roomService;
        $this->espService = $espService;
        $this->windowService = $windowService;

        if (!is_null($heartbeat)) {
            $this->wasHtmlPostSuccessful = $this->heartbeatService->evaluate($heartbeat);
        }

        if (!is_null($gridLayout)) {
            $this->wasHtmlPostSuccessful = $this->gridLayoutService->save($gridLayout);
        }

        if (!is_null($componentOrder)) {
            $this->wasHtmlPostSuccessful = $this->gridLayoutService->saveComponentOrder($componentOrder);
        }

        if (!is_null($wifiCredentials)) {
            $this->wasHtmlPostSuccessful = $this->configurationService->configureWifi($wifiCredentials);
        }

        if (!is_null($doorUpdate)) {
            $doorJson = json_decode($doorUpdate, true);
            $door = $this->doorService->find($doorJson["id"]);
            $door->setName($doorJson["name"]);
            $door->setRoom1($this->roomService->find($doorJson["room1"]["id"]));
            $door->setRoom2($this->roomService->find($doorJson["room2"]["id"]));
            $this->wasHtmlPostSuccessful = $this->doorService->update($door);
        }

        if (!is_null($locationUpdate)) {
            $locationJson = json_decode($locationUpdate, true);
            //var_dump($locationJson);
            $location = $this->locationService->find($locationJson["id"]);
            $location->setName($locationJson["name"]);
            $location->setRoom($this->roomService->find($locationJson["room"]["id"]));
            $location->setDoor($this->doorService->find($locationJson["door"]["id"]));
            $location->setWindow($this->windowService->find($locationJson["window"]["id"]));
            //var_dump($location);
            $this->wasHtmlPostSuccessful = $this->locationService->update($location);
        }

        if (!is_null($espUpdate)) {
            $espJson = json_decode($espUpdate, true);
            $esp = $this->espService->find($espJson["id"]);
            $esp->setName($espJson["name"]);
            $esp->setLocation($this->locationService->find($espJson["location"]["id"]));
            $esp->setIp($espJson["ip"]);
            //$esp->setIp($espJson["hwId"]);
            $this->wasHtmlPostSuccessful = $this->espService->update($esp);
        }

        if (!is_null($roomUpdate)) {
            $roomJson = json_decode($roomUpdate, true);
            $room = $this->roomService->find($roomJson["id"]);
            $room->setName($roomJson["name"]);
            $this->wasHtmlPostSuccessful = $this->roomService->update($room);
        }

        if (!is_null($windowUpdate)) {
            $windowJson = json_decode($windowUpdate, true);
            $window = $this->windowService->find($windowJson["id"]);
            $window->setName($windowJson["name"]);
            $window->setRoom($this->roomService->find($windowJson["room"]["id"]));
            $this->wasHtmlPostSuccessful = $this->windowService->update($window);
        }

        $this->configurationService = $configurationService;
    }

    public function setController($controller) {
        $this->controller = $controller;
    }

    public function setView($view) {
        $this->view = $view;
    }

    public function executeAction($action) {
        $this->controller->{$action['action']}($action);
    }

    public function output() {
        return $this->view->output();
    }
}
