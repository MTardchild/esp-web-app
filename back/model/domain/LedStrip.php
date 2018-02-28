<?php

class LedStrip extends ComponentBase implements JsonSerializable
{
    private $red;
    private $green;
    private $blue;
    private $warmWhite;
    private $offset;

    private function __construct()
    {
        $this->red = 0;
        $this->green = 0;
        $this->blue = 0;
        $this->warmWhite = 0;
    }

    public static function createLedStripEmpty()
    {
        $ledStrip = new LedStrip();
        $ledStrip->id = -1;
        $ledStrip->espId = -1;
        $ledStrip->typeId = COMPONENT_TYPE_LED_STRIP;

        return $ledStrip;
    }

    public static function createLedStripNoData($id, $espId, $offset = 0)
    {
        $ledStrip = new LedStrip();
        $ledStrip->id = $id;
        $ledStrip->espId = $espId;
        $ledStrip->typeId = COMPONENT_TYPE_LED_STRIP;
        $ledStrip->offset = $offset;

        return $ledStrip;
    }

    public static function createLedStrip($id, $name, $red, $green, $blue, $warmWhite, $espId, $offset = 0)
    {
        $ledStrip = new LedStrip();
        $ledStrip->id = $id;
        $ledStrip->name = $name;
        $ledStrip->red = $red;
        $ledStrip->green = $green;
        $ledStrip->blue = $blue;
        $ledStrip->warmWhite = $warmWhite;
        $ledStrip->typeId = COMPONENT_TYPE_LED_STRIP;
        $ledStrip->espId = $espId;
        $ledStrip->offset = $offset;

        return $ledStrip;
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

    public function getOffset()
    {
        return $this->offset;
    }

    public function setOffset($offset)
    {
        $this->offset = $offset;
    }

    function jsonSerialize()
    {
        return [
            'id' => $this->getId(),
            'name' => $this->getName(),
            'typeId' => $this->getTypeId(),
            'typeString' => "LED-Strip",
            'espId' => $this->getEspId(),
            'red' => $this->getRed(),
            'blue' => $this->getBlue(),
            'green' => $this->getGreen(),
            'warmWhite' => $this->getWarmWhite(),
            'offset' => $this->getOffset()
        ];
    }
}
