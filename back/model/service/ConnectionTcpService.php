<?php

class ConnectionTcpService
{
    private $componentService;

    public function __construct(ComponentService $componentService)
    {
        $this->componentService = $componentService;
    }

    public function send(Esp $esp, $data)
    {
        $connectionEsp = new ConnectionEspTcp($esp->getIp());

        return $connectionEsp->send($data);
    }

    public function sendByComponent($componentId, $data)
    {
        $espIp = $this->componentService->getEspIpByComponentId($componentId);
        $connectionEsp = new ConnectionEspTcp($espIp);

        return $connectionEsp->send($data);
    }
}