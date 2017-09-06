<?php
class ConfigurationService
{
    public function __construct() {

    }

    public function getWifiNetworks() {
        $configurator = new Configurator();
        return $configurator->getWifiNetworks();
    }

    public function flash($esp, $firmwarePath) {

    }

    public function configureWifi($esp, $ssid, $password) {

    }
}