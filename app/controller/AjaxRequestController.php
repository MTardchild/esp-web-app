<?php

class AjaxRequestController {
    private $connectionPostService;
    private $connectionUdpService;
    private $connectionTcpService;
    private $dhtDataService;
    private $ledStripDataService;
    private $relayDataService;
    private $ajaxRequest;
    private $espService;

    public function __construct(ConnectionPostService $connectionPostService,
                                ConnectionUdpService $connectionUdpService,
                                ConnectionTcpService $connectionTcpService,
                                EspService $espService,
                                DhtDataService $dhtDataService,
                                RelayDataService $relayDataService,
                                LedStripDataService $ledStripDataService,
                                AjaxRequest $ajaxRequest) {
        $this->connectionPostService = $connectionPostService;
        $this->connectionUdpService = $connectionUdpService;
        $this->connectionTcpService = $connectionTcpService;
        $this->dhtDataService = $dhtDataService;
        $this->relayDataService = $relayDataService;
        $this->ajaxRequest = $ajaxRequest;
        $this->ledStripDataService = $ledStripDataService;
        $this->espService = $espService;
    }

    public function toggleRelay($action) {
        $data = array("componentId" => $action['id'], "action" => "toggle");
        $dataJson = json_encode($data);
        $statusMessage = $this->connectionTcpService->pushDataComponent($action['id'], $dataJson);

        if ($statusMessage === true) {
            $relay = $this->relayDataService->getLatestDataSet($action['id']);
            $relay->setState(!$relay->getState());
            $this->relayDataService->insert($relay);
            $this->ajaxRequest->setStatus($statusMessage);
            $this->ajaxRequest->setMessage("Relay successfully toggled.");
        } else {
            $this->ajaxRequest->setMessage($statusMessage);
        }
    }

    public function setColor($action) {
        $data = array(
            "componentId" => $action['id'],
            "action" => "changeColor",
            "values" => array(
                "red" => $action['r'],
                "green" => $action['g'],
                "blue" => $action['b']
            ));

        $dataJson = json_encode($data);
        $status = $this->connectionTcpService->pushDataComponent($action['id'], $dataJson);

        if ($status === true) {
            $ledStrip = $this->ledStripDataService->findLatestDataSet($action['id']);
            $ledStrip->setRed($action['r']);
            $ledStrip->setGreen($action['g']);
            $ledStrip->setBlue($action['b']);
            $this->ledStripDataService->update($ledStrip);
            $this->ajaxRequest->setMessage("Color successfully sent to LED-Strip.");
        } else {
            $this->ajaxRequest->setMessage($status);
        }
    }

    public function setWarmWhite($action) {
        $data = array(
            "componentId" => $action['id'],
            "action" => "changeWarmWhite",
            "values" => array(
                "warmWhite" => $action['ww']
            ));

        $dataJson = json_encode($data);
        $status = $this->connectionTcpService->pushDataComponent($action['id'], $dataJson);

        if ($status === true) {
            $ledStrip = $this->ledStripDataService->findLatestDataSet($action['id']);
            $ledStrip->setWarmWhite($action['ww']);
            $this->ledStripDataService->update($ledStrip);
            $this->ajaxRequest->setMessage("Warm White successfully sent to LED-Strip.");
        } else {
            $this->ajaxRequest->setMessage($status);
        }
    }

    public function setColorUdp($action) {
        $redStr = str_pad(decbin($action['r']), 12, 0, STR_PAD_LEFT);
        $greenStr = str_pad(decbin($action['g']), 12, 0, STR_PAD_LEFT);
        $blueStr = str_pad(decbin($action['b']), 12, 0, STR_PAD_LEFT);
        $warmWhiteStr = str_pad(decbin($action['ww']), 12, 0, STR_PAD_LEFT);

        // Hack to get php to accept 12 bit unsigned
        // Basically mapping the 12 bits per canal on 16 bit types
        $first = $redStr . substr($greenStr, 0, -8);
        $second = substr($greenStr, 4) . substr($blueStr, 0, -4);
        $third = substr($blueStr, 8) . $warmWhiteStr;

        $rgbBytes = pack('n*', bindec($first), bindec($second), bindec($third));
        $isSuccessful = $this->connectionUdpService->pushData($action['id'], $rgbBytes);
        $this->ajaxRequest->setStatus($isSuccessful);
        $this->ajaxRequest->setMessage("Color successfully sent to LED-Strip.");
    }

    public function getDashboardView($action) {
        $file = __DIR__ . "/../view/template/TileTemplate.php";
        $template = $this->getTemplate($file);
        $this->ajaxRequest->setMessage($template);
    }

    public function getConfigView($action) {
        $file = __DIR__ . "/../view/template/ConfigTemplate.php";
        $template = $this->getTemplate($file);
        $this->ajaxRequest->setMessage($template);
    }

    private function getTemplate($file) {
        $buffer = "Could not find template";
        $exists = file_exists($file);

        if ($exists) {
            ob_start();
            include $file;
            $buffer = ob_get_contents();
            ob_end_clean();
        }

        return $buffer;
    }

    // todo configure ESP ajax calls
}