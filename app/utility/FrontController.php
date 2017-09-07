<?php
//namespace App\Controller;

class FrontController {
    private $heartbeatService;

    private $controller;
    private $view;

    private $wasHtmlPostSuccessful;
    private $gridLayoutService;
    private $configurationService;

    public function __construct(HeartbeatService $heartbeatService,
                                GridLayoutService $gridLayoutService,
                                ConfigurationService $configurationService,
                                $heartbeat,
                                $gridLayout,
                                $componentOrder,
                                $wifiCredentials) {
        $this->heartbeatService = $heartbeatService;
        $this->gridLayoutService = $gridLayoutService;

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