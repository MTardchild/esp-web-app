<?php

class Configurator
{
    public function __construct()
    {

    }

    public function getWifiNetworks()
    {
        $wifiNetworksString = shell_exec("nmcli device wifi list");
        $wifiNetworks = array();
        $rows = preg_split('(\r\n|\r|\n)', $wifiNetworksString);

        foreach ($rows as $row) {
            $column = preg_split('/\s\s+/', $row);

            if (count($column) > 1) {
                $ssidColumn = $column[1];
                if (substr($ssidColumn, 0, 4) === "esp_") {
                    array_push($wifiNetworks, $column);
                }
            }
        }

        return $wifiNetworks;
    }

    public function flash(Esp $esp, Firmware $firmware)
    {
        $url = "http://" . $_SERVER['REMOTE_ADDR'] . ":" . $_SERVER['SERVER_PORT'] . $firmware->getPath();
        $command = FlashCommand::createFlashCommand($url);

        if ($esp->getId() === -1) {
            $this->connectWifi($esp->getHwId(), $esp->getHwId());
            // AP default IP: 192.168.4.1
            $esp->setIp("192.168.4.1");
        }

        $connectionEsp = new ConnectionEspTcp($esp->getIp());
        return $connectionEsp->send(json_encode($command, JSON_UNESCAPED_SLASHES));
    }

    public function connectWifi($ssid, $password)
    {
        shell_exec("nmcli device wifi connect " . $ssid . " password " . $password);
        sleep(5);
    }

    public function configureWifi(Esp $esp, $ssid, $password)
    {
        $command = ConfigureWifiCommand::createConfigureWifiCommand($ssid, $password);
        if ($esp->getId() === -1) {
            $this->connectWifi($esp->getHwId(), $esp->getHwId());
            // AP default IP: 192.168.4.1
            $esp->setIp("192.168.4.1");
        }

        $connectionEsp = new ConnectionEspTcp($esp->getIp());
        return $connectionEsp->send(json_encode($command, JSON_UNESCAPED_SLASHES));
    }
}