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

    public function configure($config)
    {

//        return $this->configurator->configure($esp);
    }

    public function configureWifi(Esp $esp, $ssid, $password)
    {
        return $this->configurator->configureWifi($esp, $ssid, $password);
    }

    public function getServerIp() {
        $ipConfig = shell_exec("ip address");
        $ipConfigRows = preg_split('(\r\n|\r|\n)', $ipConfig);
        foreach ($ipConfigRows as $row) {
            if (strpos($row, 'inet ')) {
                if (!strpos($row, '127.0.0.1'))
                    $ip = (substr($row, 9, strpos($row, '/') - 9));
            }
        }

        return $ip;
    }
}