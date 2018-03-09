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
                    if ($component instanceof ComponentBase)
                        array_push($this->components, new LedStripConfig(
                            LedStrip::createLedStripNoData($component->getId(), $component->getEspId())));
                    else
                        array_push($this->components, new LedStripConfig($component));
                    break;
            }

        }
    }

    public function getEsp(): Esp
    {
        return $this->esp;
    }

    public function setEsp(Esp $esp): void
    {
        $this->esp = $esp;
    }

    public function getComponents(): array
    {
        return $this->components;
    }

    public function setComponents(array $components): void
    {
        $this->components = $components;
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->esp->getId(),
            'components' => $this->components
        ];
    }
}