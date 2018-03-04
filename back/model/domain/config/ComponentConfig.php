<?php
/**
 * Created by PhpStorm.
 * User: mtardchild
 * Date: 04.03.18
 * Time: 05:33
 */

class ComponentConfig implements JsonSerializable
{
    private $component;

    public function __construct(ComponentBase $component)
    {
        $this->component = $component;
    }

    public function jsonSerialize()
    {
        return [
            "id" => $this->component->getId()
        ];
    }
}