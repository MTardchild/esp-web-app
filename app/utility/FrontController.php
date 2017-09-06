<?php
//namespace App\Controller;

class FrontController {
    private $heartbeatService;

    private $controller;
    private $view;

    private $wasHtmlPostSuccessful;
    private $gridLayoutService;

    public function __construct(HeartbeatService $heartbeatService,
                                GridLayoutService $gridLayoutService,
                                $heartbeat,
                                $gridLayout,
                                $componentOrder) {
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