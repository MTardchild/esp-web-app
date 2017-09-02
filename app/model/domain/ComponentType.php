<?php

class ComponentType extends DomainObjectBase {
    private $_name;

    private function __construct() {

    }

    public static function createComponentTypeEmpty() {
        return new ComponentType();
    }

    public static function createComponentType($id, $name) {
        $componentType = new ComponentType();
        $componentType->id = $id;
        $componentType->_name = $name;

        return $componentType;
    }

    public function getName() {
        return $this->_name;
    }

    public function setName($name) {
        $this->_name = $name;
    }
}