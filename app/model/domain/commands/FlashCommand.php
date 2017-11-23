<?php
class FlashCommand implements JsonSerializable
{
    private $url;

    public function getUrl()
    {
        return $this->url;
    }

    public function setUrl($url)
    {
        $this->url = $url;
    }

    private function __construct() {

    }

    public static function createFlashCommandEmpty() {
        return new FlashCommand();
    }

    public static function createFlashCommand($url) {
        $command = new FlashCommand();
        $command->url = $url;

        return $command;
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