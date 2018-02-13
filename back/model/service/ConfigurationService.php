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
        if ($esp->getId() === -1) {
            $this->connectWifi($esp->getHwId(), $esp->getHwId());
        }

//        $command = ConfigureWifiCommand::createConfigureWifiCommand("KDG-328AB", "yB8cCwu24wwQ");
        $this->connectionTcpService->send($esp, json_encode($command, JSON_UNESCAPED_SLASHES));
    }

    public function connectWifi($ssid, $password) {
        shell_exec("nmcli device wifi connect " . $ssid . " password " . $password);
        sleep(5);
    }

    public function configureWifi($esp, $ssid, $password) {
        $command = ConfigureWifiCommand::createConfigureWifiCommand($ssid, $password);
        if ($esp->getId() === -1) {
            $this->connectWifi($esp->getHwId(), $esp->getHwId());
        }

        $this->connectionTcpService->send($esp, json_encode($command, JSON_UNESCAPED_SLASHES));
    }
}