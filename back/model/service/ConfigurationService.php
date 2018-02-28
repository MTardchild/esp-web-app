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

    public function flash(FlashCommand $command)
    {
        return $this->configurator->flash($command);
    }


    public function configureWifi(Esp $esp, $ssid, $password)
    {
        return $this->configurator->configureWifi($esp, $ssid, $password);
    }
}