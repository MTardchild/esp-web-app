<?php
class ConfigurationService
{
    private $connectionTcpService;

    public function __construct(ConnectionTcpService $connectionTcpService) {
        $this->connectionTcpService = $connectionTcpService;
    }

    public function getWifiNetworks() {
        $configurator = new Configurator();
        return $configurator->getWifiNetworks();
    }

    public function flash($esp, $firmware) {
        $url = "https://" + $_SERVER['SERVER_ADDR'] + ":" + $_SERVER['SERVER_PORT'] + $firmware->getPath();
//        $url = "https://192.168.0.119:80/arduino.bong";
        $command = FlashCommand::createFlashCommand($url);

//        $command = ConfigureWifiCommand::createConfigureWifiCommand("KDG-328AB", "yB8cCwu24wwQ");
        $this->connectionTcpService->send($esp, json_encode($command, JSON_UNESCAPED_SLASHES));
    }

    public function configureWifi($esp, $ssid, $password) {
        $command = ConfigureWifiCommand::createConfigureWifiCommand($ssid, $password);

        $this->connectionTcpService->send($esp, json_encode($command, JSON_UNESCAPED_SLASHES));
    }
}