<?php

// namespace App\Router {
class Router
{
    private $table = array();

    public function __construct()
    {
        $this->defineRoutes();
    }

    public function getRoute($route)
    {
        return $this->table[strtolower($route)];
    }

    private function defineRoutes()
    {
        $this->table[""] = new Route(
            "MainOverviewView",
            "MainOverviewController");

        $this->table["ajax"] = new Route(
            "AjaxRequestView",
            "AjaxRequestController");
    }
}
// }
