<?php

class ConnectionEspTcp extends ConnectionBase
{
    public function send($data)
    {
        $result = true;
        $port = getservbyname('www', 'tcp');

        if (($socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP)) === false) {
            $result = "Socket could not be created. Error " . socket_last_error($socket);
            return $result;
        }

        if ($error = socket_connect($socket, $this->url, 420) === false) {
            $result = $this->getErrorMessageConnect(socket_last_error($socket));
            return $result;
        }

        socket_write($socket, $data, strlen($data));
        socket_close($socket);

        return $result;
    }

    private function getErrorMessageConnect($errorNumber)
    {
        $errorMessage = "";

        switch ($errorNumber) {
            case 10060:
                $errorMessage = "Unable to connect. Host is down.";
                break;
        }

        return $errorMessage;
    }
}