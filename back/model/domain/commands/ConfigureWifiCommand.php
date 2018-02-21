<?php

class ConfigureWifiCommand implements JsonSerializable
{
    private $ssid;
    private $password;

    public function getSsid()
    {
        return $this->ssid;
    }

    public function setSsid($ssid)
    {
        $this->ssid = $ssid;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function setPassword($password)
    {
        $this->password = $password;
    }

    private function __construct()
    {

    }

    public static function createConfigureWifiCommandEmpty()
    {
        return new ConfigureWifiCommand();
    }

    public static function createConfigureWifiCommand($ssid, $password)
    {
        $command = new ConfigureWifiCommand();
        $command->ssid = $ssid;
        $command->password = $password;

        return $command;
    }

    public function jsonSerialize()
    {
        return [
            'command' => [
                'configureWifi' => [
                    'ssid' => $this->getSsid(),
                    'password' => $this->getPassword()
                ]
            ]
        ];
    }
}