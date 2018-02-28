<?php

class EspCommunicationService
{
    private $connectionTcpService;
    private $relayDataService;
    private $ledStripDataService;
    private $configurationService;

    public function __construct(ConnectionTcpService $connectionTcpService,
                                RelayDataService $relayDataService,
                                LedStripDataService $ledStripDataService,
                                ConfigurationService $configurationService)
    {
        $this->connectionTcpService = $connectionTcpService;
        $this->relayDataService = $relayDataService;
        $this->ledStripDataService = $ledStripDataService;
        $this->configurationService = $configurationService;
    }

    public function handle(Command $command)
    {
        $status = false;
        $class = get_class($command);
        switch ($class) {
            case "ToggleCommand":
                $status = $this->toggleRelayJson($command);
                break;
            case "FlashCommand":
                $status = $this->flash($command);
                break;
            case "SetColorCommand":
                $status = $this->setColor($command);
                break;
            case "ConfigureWifiCommand":
                break;
            default:
                break;
        }

        return $command;
    }

    private function toggleRelayJson(ToggleCommand $command)
    {
        $dataJson = json_encode($command);
        $status = $this->connectionTcpService->sendByComponent($command->getId(), $dataJson);

        if ($status === true) {
            $relay = $this->relayDataService->getLatestDataSet($command->getId());
            $relay->setState(!$relay->getState());
            $this->relayDataService->insert($relay);
        }

        return $status;
    }

    public function setColor(SetColorCommand $command)
    {
        $offset = str_pad(decbin($command->getLedStrip()->getOffset()), 8, 0, STR_PAD_LEFT);
        $redStr = str_pad(decbin($command->getRed()), 12, 0, STR_PAD_LEFT);
        $greenStr = str_pad(decbin($command->getGreen()), 12, 0, STR_PAD_LEFT);
        $blueStr = str_pad(decbin($command->getBlue()), 12, 0, STR_PAD_LEFT);
        $warmWhiteStr = str_pad(decbin($command->getWarmWhite()), 12, 0, STR_PAD_LEFT);

        // Hack to get php to accept 12 bit unsigned
        // Basically mapping the 12 bits per canal on 16 bit types
        // behold order: Offset, WW, B, R, G
        $first = $warmWhiteStr . substr($blueStr, 0, -8);
        $second = substr($blueStr, 4) . substr($redStr, 0, -4);
        $third = substr($redStr, 8) . $greenStr;

        $rgbBytes = pack('n*', bindec($offset), bindec($first), bindec($second), bindec($third));
        $status = $this->connectionTcpService->sendByComponent($command->getLedStrip()->getId(), $rgbBytes);

        if ($status === true) {
            $this->updateColor($command);
        }

        return true;
    }

    public function setColorJson(SetColorCommand $command)
    {
        $dataJson = json_encode($command);
        $status = $this->connectionTcpService->sendByComponent($command->getLedStrip()->getId(), $dataJson);

        if ($status === true) {
            $this->updateColor($command);
        }

        return $status;
    }

    public function flash(FlashCommand $command)
    {
        return $this->configurationService->flash($command);
    }

    private function updateColor(SetColorCommand $command)
    {
        $ledStrip = $this->ledStripDataService->findLatestDataSet($command->getLedStrip()->getId());
        $ledStrip->setRed($command->getRed());
        $ledStrip->setGreen($command->getGreen());
        $ledStrip->setBlue($command->getBlue());
        $ledStrip->setWarmWhite($command->getWarmWhite());
        $this->ledStripDataService->update($ledStrip);
    }
}