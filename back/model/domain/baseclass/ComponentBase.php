<?php
//namespace App\Model\Domain\Abstract;

class ComponentBase extends DatabaseObjectBase
{
    protected $name;
    protected $espId;
    protected $typeId;

    private function __construct()
    {

    }

    static public function create($id, $name, $espId, $typeId): ComponentBase
    {
        $component = new ComponentBase();
        $component->id = $id;
        $component->name = $name;
        $component->espId = $espId;
        $component->typeId = $typeId;
        return $component;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getEspId()
    {
        return $this->espId;
    }

    public function setEspId($espId)
    {
        $this->espId = intval($espId);
    }

    public function getTypeId()
    {
        return $this->typeId;
    }
}
