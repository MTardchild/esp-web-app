<?php
//namespace App\Controller;

class FrontController {
    private $receiveDataService;

    private $controller;
    private $view;

    private $wasHtmlPostSuccessful;

    public function __construct(ReceiveDataService $receiveDataService,
                                $heartbeat) {
        $this->receiveDataService = $receiveDataService;

        if (!is_null($heartbeat)) {
            $this->wasHtmlPostSuccessful = $this->receiveDataService->evaluateHeartbeat($heartbeat);
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