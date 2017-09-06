<?php
// namespace App\Router;

class Route {
    public $model;
    public $view;
    public $controller;

    public function __construct($view, $controller) {
        $this->view = $view;
        $this->controller = $controller;
    }
}

