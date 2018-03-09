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
//        if ($command->getLedStrip()->getRed() != $command->getRed()) {
            $redStr = str_pad(decbin($command->getRed()), 12, 0, STR_PAD_LEFT);
            $redOffset = str_pad(decbin($command->getLedStrip()->getOffset()), 4, 0, STR_PAD_LEFT);
//        }
//        if ($command->getLedStrip()->getGreen() != $command->getGreen()) {
            $greenStr = str_pad(decbin($command->getGreen()), 12, 0, STR_PAD_LEFT);
            $greenOffset = str_pad(decbin($command->getLedStrip()->getOffset() + 1), 4, 0, STR_PAD_LEFT);
//        }
//        if ($command->getLedStrip()->getBlue() != $command->getBlue()) {
            $blueStr = str_pad(decbin($command->getBlue()), 12, 0, STR_PAD_LEFT);
            $blueOffset = str_pad(decbin($command->getLedStrip()->getOffset() + 2), 4, 0, STR_PAD_LEFT);
//        }
//        if ($command->getLedStrip()->getWarmWhite() != $command->getWarmWhite()) {
            $whiteStr = str_pad(decbin($command->getWarmWhite()), 12, 0, STR_PAD_LEFT);
            $whiteOffset = str_pad(decbin($command->getLedStrip()->getOffset() + 3), 4, 0, STR_PAD_LEFT);
//        }

        $commandId = str_pad(decbin(1), 8, 0, STR_PAD_LEFT);

        // Hack to get php to accept 12 bit unsigned
        // Basically mapping the 12 bits per canal on 16 bit types
        // behold order: [Rl/Gl/Bl/Wl][Offset][Rh/Gh/Bh/Wh]
        if (!is_null($redStr))
            $redBits = substr($redStr, 4) . $redOffset . substr($redStr, 0, 4);
        if (!is_null($greenStr))
            $greenBits = substr($greenStr, 4) . $greenOffset . substr($greenStr, 0, 4);
        if (!is_null($blueStr))
            $blueBits = substr($blueStr, 4) . $blueOffset . substr($blueStr, 0, 4);
        if (!is_null($whiteStr))
            $whiteBits = substr($whiteStr, 4) . $whiteOffset . substr($whiteStr, 0, 4);

        $rgbBytes = pack('n*',
            bindec($commandId),
            is_null($redBits) ? null : bindec($redBits),
            is_null($greenBits) ? null : bindec($greenBits),
            is_null($blueBits) ? null : bindec($blueBits),
            is_null($whiteBits) ? null : bindec($whiteBits));
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