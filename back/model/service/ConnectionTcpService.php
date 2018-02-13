<?php

class ConnectionTcpService
{
    private $_componentService;

    public function __construct(ComponentService $componentService) {
        $this->_componentService = $componentService;
    }

    public function send($esp, $data) {
        $connectionEsp = new ConnectionEspTcp($esp->getIp());

        return $connectionEsp->send($data);
    }

    public function sendByComponent($componentId, $data) {
        $espIp = $this->_componentService->getEspIpByComponentId($componentId);
        $connectionEsp = new ConnectionEspTcp($espIp);

        return $connectionEsp->send($data);
    }
}