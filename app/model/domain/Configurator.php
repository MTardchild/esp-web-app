<?php
class Configurator
{
    public function __construct() {

    }

    public function getWifiNetworks() {
        $wifiNetworksString = shell_exec("nmcli device wifi list");
        $wifiNetworks = array();
        $rows = preg_split('(\r\n|\r|\n)', $wifiNetworksString);

        foreach($rows as $row) {
            $column = preg_split('/\s\s+/', $row);

            if (count($column) > 1) {
                $ssidColumn = $column[1];
                if (substr($ssidColumn, 0, 4 ) === "esp_") {
                    array_push($wifiNetworks, $column);
                }
            }
        }

        return $wifiNetworks;
    }

    public function flash($esp, $firmwarePath) {
        $wifiNetworks = $this->getWifiNetworks();
    }

    public function configureWifi($esp, $ssid, $password) {

    }
}