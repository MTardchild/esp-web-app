<?php

class ConfigureCommand extends Command implements JsonSerializable
{
    private $esp;
    private $serverIp;

    public function __construct(EspConfig $esp, $serverIp)
    {
        $this->esp = $esp;
        $this->serverIp = $serverIp;
    }

    public function getServerIp()
    {
        return $this->serverIp;
    }

    public function setServerIp($serverIp): void
    {
        $this->serverIp = $serverIp;
    }

    public function getEsp()
    {
        return $this->esp;
    }

    public function setEsp(EspConfig $esp): void
    {
        $this->esp = $esp;
    }

    public function jsonSerialize()
    {
        return [
            'command' => [
                'config' => [
                    'esp' => $this->getEsp(),
                    'server' => [
                        'ip' => $this->getServerIp()
                    ]
                ]
            ]
        ];
    }
}