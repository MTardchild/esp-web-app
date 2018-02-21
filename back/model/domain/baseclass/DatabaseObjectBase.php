<?php
//namespace App\Model\Domain\Abstract;

class DatabaseObjectBase
{
    protected $id = null;

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        if (is_null($this->id) || $this->id == -1) {
            $this->id = $id;
        }
    }
}
