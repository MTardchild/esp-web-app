<?php

class LedStripConfig implements JsonSerializable
{
    private $ledStrip;

    public function __construct(LedStrip $ledStrip)
    {
        $this->ledStrip = $ledStrip;
    }

    public function jsonSerialize()
    {
        return [
            "id" => $this->ledStrip->getId(),
            "offset" => $this->ledStrip->getOffset()
        ];
    }
}