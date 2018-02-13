<?php

class ConnectionEspUdp extends ConnectionBase {
    public function send($data) {
        $socket = socket_create(AF_INET, SOCK_DGRAM, SOL_UDP);
        socket_sendto($socket, $data, strlen($data), 0, $this->url, 420);

        return true;
    }
}