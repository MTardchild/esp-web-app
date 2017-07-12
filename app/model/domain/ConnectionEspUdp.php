<?php

class ConnectionEspUdp extends ConnectionBase {
    public function pullData($data) {
        // TODO: Implement pullData() method.
    }

    public function pushData($data) {
        $socket = socket_create(AF_INET, SOCK_DGRAM, SOL_UDP);
        socket_sendto($socket, $data, strlen($data), 0, $this->_url, 4210);

        return true;
    }
}