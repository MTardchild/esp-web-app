<?php

class ComponentType extends DatabaseObjectBase
{
    private $name;

    private function __construct()
    {

    }

    public static function createComponentTypeEmpty()
    {
        return new ComponentType();
    }

    public static function createComponentType($id, $name)
    {
        $componentType = new ComponentType();
        $componentType->id = $id;
        $componentType->name = $name;

        return $componentType;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }
}