<?php

class SetColorCommand implements JsonSerializable
{
    private $id;
    private $red;
    private $green;
    private $blue;
    private $warmWhite;

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
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

    private function __construct()
    {

    }

    public static function createSetColorCommand($id, $red, $green, $blue, $warmWhite)
    {
        $command = new SetColorCommand();
        $command->id = $id;
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
                    'id' => $this->getId(),
                    'red' => $this->getRed(),
                    'green' => $this->getGreen(),
                    'blue' => $this->getBlue(),
                    'warmWhite' => $this->getWarmWhite()
                ]
            ]
        ];
    }
}