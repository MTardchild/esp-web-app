<?php

class ConfigurationService
{
    private $configurator;

    public function __construct(Configurator $configurator)
    {
        $this->configurator = $configurator;
    }

    public function getWifiNetworks()
    {
        return $this->configurator->getWifiNetworks();
    }

    public function flash(Esp $esp, Firmware $firmware)
    {
        return $this->configurator->flash($esp, $firmware);
    }


    public function configureWifi(Esp $esp, $ssid, $password)
    {
        return $this->configurator->configureWifi($esp, $ssid, $password);
    }
}