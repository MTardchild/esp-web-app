<?php

class ConnectionUdpService
{
    private $_componentService;

    public function __construct(ComponentService $componentService) {
        $this->_componentService = $componentService;
    }

    public function send($componentId, $data) {
        $espIp = $this->_componentService->getEspIpByComponentId($componentId);
        $connectionEsp = new ConnectionEspUdp($espIp);

        return $connectionEsp->send($data);
    }
}