<?php

class FlashCommand extends Command implements JsonSerializable
{
    private $url;
    private $esp;
    private $firmware;

    private function __construct()
    {

    }

    public function getEsp()
    {
        return $this->esp;
    }

    public function setEsp(Esp $esp): void
    {
        $this->esp = $esp;
    }

    public function getFirmware()
    {
        return $this->firmware;
    }

    public function setFirmware(Firmware $firmware): void
    {
        $this->firmware = $firmware;
        $this->url = FlashCommand::generateUrl($firmware);
    }

    public function getUrl()
    {
        return $this->url;
    }

    public static function createFlashCommandEmpty(): FlashCommand
    {
        return new FlashCommand();
    }

    public static function createFlashCommand(Esp $esp, Firmware $firmware): FlashCommand
    {
        $command = new FlashCommand();
        $command->esp = $esp;
        $command->firmware = $firmware;
        $command->url = FlashCommand::generateUrl($firmware);
        return $command;
    }

    private static function generateUrl(Firmware $firmware)
    {
        return "http://" . $_SERVER['REMOTE_ADDR'] . ":" . $_SERVER['SERVER_PORT'] . $firmware->getPath();
    }

    public function jsonSerialize()
    {
        return [
            'command' => [
                'flash' => [
                    'url' => $this->getUrl()
                ]
            ]
        ];
    }
}