<?php
//namespace App\Model\Domain\Abstract;

class DomainObjectBase {
    protected $id = null;

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        if (!is_null($this->id)) {
            throw new Exception("ID is immutable");
        }

        return $this->id = $id;
    }
}