<?php

class ConnectionEspTcp extends ConnectionBase {
    public function pullData($data) {

    }

    public function pushData($data) {
        $result = true;
        $port = getservbyname('www', 'tcp');

        if (($socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP)) === false) {
            $result = "socket_create() failed: reason: " . socket_strerror(socket_last_error($socket));
        }

        if ($error = socket_connect($socket, $this->_url, 4210) === false) {
            $result = "socket_connect() failed.\nReason: ($error) " . socket_strerror(socket_last_error($socket));
        }

        socket_write($socket, $data, strlen($data));
        socket_close($socket);

        return $result;
    }
}