<?php
//namespace App\Model\Mapper;

class ComponentMapper implements IDatabaseMapper, IDatabaseObjectMapper {
    private $database;

    public function __construct(PDO $database) {
        $this->database = $database;
    }

    public function insert($component) {
        $isSuccessful = false;

        if ($component instanceof ComponentBase) {
            $query = $this->database->prepare("INSERT INTO component VALUES (:id, :name, :esp, :type);");
            $isSuccessful = $query->execute(array(
                'id' => $component->getId(),
                'name' => $component->getName(),
                'esp' => $component->getEspId(),
                'type' => $component->getTypeId()
            ));
        }

        return $isSuccessful;
    }

    public function update($component) {
        $isSuccessful = false;

        if ($component instanceof ComponentBase) {
            $query = $this->database->prepare("UPDATE component SET component.cmp_name = :name, component.cmp_esp = :espId, component.cmp_type = :typeId WHERE component.cmp_id = :id;");
            $isSuccessful = $query->execute(array(
                'id' => $component->getId(),
                'name' => $component->getName(),
                'espId' => $component->getEspId(),
                'typeId' => $component->getTypeId()
            ));
        }

        return $isSuccessful;
    }

    public function delete($componentId) {
        $query = $this->database->prepare("DELETE FROM component WHERE cmp_id = :id");
        $isSuccessful = $query->execute(array("id" => $componentId));

        return $isSuccessful;
    }

    public function findComponent($componentId) {
        $componentId = intval($componentId);
        $query = $this->database->prepare("SELECT component.cmp_id, component.cmp_name, component_type.cty_type FROM component INNER JOIN component_type ON component.cmp_type = component_type.cty_id WHERE component.cmp_id = :id");
        $query->execute(array("id" => $componentId));
        $componentDb = $query->fetch();

        return $componentDb;
    }

    public function findComponents($espId) {
        $espId = intval($espId);
        $query = $this->database->prepare("SELECT component.cmp_id, component.cmp_name, component_type.cty_type FROM component INNER JOIN component_type ON component.cmp_type = component_type.cty_id WHERE component.cmp_esp = :espId");
        $query->execute(array("espId" => $espId));
        $componentsDb = $query->fetchAll();

        return $componentsDb;
    }

    public function getEspIpByComponentId($componentId) {
        $componentId = intval($componentId);
        $query = $this->database->prepare("SELECT esp.esp_ip FROM component INNER JOIN esp ON component.cmp_esp = esp.esp_id WHERE component.cmp_id = :componentId");
        $query->execute(array("componentId" => $componentId));
        $espIp = $query->fetch();

        return $espIp['esp_ip'];
    }

    public function findFreeId() {
        $query = $this->database->prepare("SELECT cmp_id FROM component ORDER BY cmp_id DESC LIMIT 1");
        $query->execute();
        $freeId = $query->fetch();

        if ($freeId === false) {
            // TODO error
        }

        return $freeId['cmp_id']+1;
    }
}

