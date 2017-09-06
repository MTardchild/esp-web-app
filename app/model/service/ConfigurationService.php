<?php
class ConfigurationService
{
    public function __construct() {

    }

    public function getWifiNetworks() {
        $configurator = new Configurator();
        return $configurator->getWifiNetworks();
    }

    public function flash($esp, $firmware) {
//        $url = "https://" + $_SERVER['SERVER_ADDR'] + $firmware->getPath();
        $url = "https://192.168.0.119:80/arduino.bong";
        $command = FlashCommand::createFlashCommand($url);

        var_dump("sending command");
//        shell_exec('echo "' . json_encode($command) . '" > /dev/tcp/' . $esp->getIp() . '/420');
        shell_exec('echo "new" > /dev/tcp/192.168.4.1/420');
    }

    public function configureWifi($esp, $ssid, $password) {
        $command = ConfigureWifiCommand::createConfigureWifiCommand($ssid, $password);

        var_dump($command);
        shell_exec('echo "' . json_encode($command) . '" > /dev/tcp/' . $esp->getIp() . '/420');
    }
}