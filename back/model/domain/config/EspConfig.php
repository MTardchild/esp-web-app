<?php

class EspConfig implements JsonSerializable
{
    private $esp;
    private $components = array();

    public function __construct(Esp $esp)
    {
        $this->esp = $esp;

        foreach ($esp->getComponents() as $component) {
            switch ($component->getTypeId()) {
                case 1:
                    array_push($this->components, new ComponentConfig($component));
                    break;
                case 2:
                    array_push($this->components, new ComponentConfig($component));
                    break;
                case 3:
                    array_push($this->components, new LedStripConfig($component));
                    break;
            }

        }
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->esp->getId(),
            'components' => $this->components
        ];
    }
}