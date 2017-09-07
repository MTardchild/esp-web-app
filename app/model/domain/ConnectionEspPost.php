<?php

class ConnectionEspPost extends ConnectionBase {
    public function send($data) {
        $result = true;
        $defaults = array(
            CURLOPT_POST => 1,
            CURLOPT_HEADER => 0,
            CURLOPT_URL => $this->url,
            CURLOPT_PORT => 8080,
            CURLOPT_FRESH_CONNECT => 1,
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_FORBID_REUSE => 1,
            CURLOPT_TIMEOUT => 4,
            CURLOPT_POSTFIELDS => $data
        );

        $curl = curl_init();
        curl_setopt_array($curl, $defaults);
        curl_exec($curl);

        if (curl_errno($curl)) {
            $result = $this->getErrorMessage(curl_errno($curl));
        }

        curl_close($curl);

        return $result;
    }

    private function getErrorMessage($errorNumber) {
        $errorMessage = "";

        switch($errorNumber) {
            case "28":
                $errorMessage = "Connection attempt timed out after 4000 ms.";
                break;
        }

        return $errorMessage;
    }
}
