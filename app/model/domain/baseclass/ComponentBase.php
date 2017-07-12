<?php
//namespace App\Model\Domain\Abstract;

class ComponentBase extends DomainObjectBase {
    protected $name;
    protected $espId;
    protected $typeId;

    private function __construct() {

    }

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getEspId() {
        return $this->espId;
    }

    public function getTypeId() {
        return $this->typeId;
    }
}
