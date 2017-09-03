<?php
//namespace App\Controller;

class FrontController {
    private $heartbeatService;

    private $controller;
    private $view;

    private $wasHtmlPostSuccessful;
    private $saveGridLayoutService;

    public function __construct(HeartbeatService $heartbeatService,
                                GridLayoutService $saveGridLayoutService,
                                $heartbeat,
                                $gridLayout) {
        $this->heartbeatService = $heartbeatService;
        $this->saveGridLayoutService = $saveGridLayoutService;

        if (!is_null($heartbeat)) {
            $this->wasHtmlPostSuccessful = $this->heartbeatService->evaluate($heartbeat);
        }

        if (!is_null($gridLayout)) {
            $this->wasHtmlPostSuccessful = $this->saveGridLayoutService->save($gridLayout);
        }
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