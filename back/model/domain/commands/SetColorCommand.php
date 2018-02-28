<?php

class SetColorCommand extends Command implements JsonSerializable
{
    private $ledStrip;
    private $red;
    private $green;
    private $blue;
    private $warmWhite;

    private function __construct()
    {

    }

    public function getLedStrip()
    {
        return $this->ledStrip;
    }

    public function setLedStrip($ledStrip)
    {
        $this->ledStrip = $ledStrip;
    }

    public function getRed()
    {
        return $this->red;
    }

    public function setRed($red)
    {
        $this->red = $red;
    }

    public function getGreen()
    {
        return $this->green;
    }

    public function setGreen($green)
    {
        $this->green = $green;
    }

    public function getBlue()
    {
        return $this->blue;
    }

    public function setBlue($blue)
    {
        $this->blue = $blue;
    }

    public function getWarmWhite()
    {
        return $this->warmWhite;
    }

    public function setWarmWhite($warmWhite)
    {
        $this->warmWhite = $warmWhite;
    }

    public static function createSetColorCommand($ledStrip, $red, $green, $blue, $warmWhite)
    {
        $command = new SetColorCommand();
        $command->ledStrip = $ledStrip;
        $command->red = $red;
        $command->blue = $blue;
        $command->green = $green;
        $command->warmWhite = $warmWhite;

        return $command;
    }

    public function jsonSerialize()
    {
        return [
            'command' => [
                'setColor' => [
                    'id' => $this->getLedStrip(),
                    'red' => $this->getRed(),
                    'green' => $this->getGreen(),
                    'blue' => $this->getBlue(),
                    'warmWhite' => $this->getWarmWhite()
                ]
            ]
        ];
    }
}