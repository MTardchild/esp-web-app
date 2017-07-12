<?php
class ConnectionPostService
{
    private $_componentService;

    public function __construct(ComponentService $componentService) {
        $this->_componentService = $componentService;
    }

    public function pullData($data) {

    }

    public function pushData($componentId, $data) {
        $espIp = $this->_componentService->getEspIpByComponentId($componentId);
        $connectionEsp = new ConnectionEspPost($espIp);
        return $connectionEsp->pushData($data);
    }
}