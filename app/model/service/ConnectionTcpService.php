<?php

class ConnectionTcpService
{
    private $_componentService;

    public function __construct(ComponentService $componentService) {
        $this->_componentService = $componentService;
    }

    public function pullData($data) {

    }

    public function pushData($esp, $data) {
        $connectionEsp = new ConnectionEspTcp($esp->getIp());

        return $connectionEsp->pushData($data);
    }

    public function pushDataComponent($componentId, $data) {
        $espIp = $this->_componentService->getEspIpByComponentId($componentId);
        $connectionEsp = new ConnectionEspTcp($espIp);

        return $connectionEsp->pushData($data);
    }
}