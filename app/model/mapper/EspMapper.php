<?php
//namespace App\Model\Mapper;

class EspMapper implements IDatabaseMapper, IDatabaseObjectMapper {
    private $database;

    public function __construct(PDO $database) {
        $this->database = $database;
    }

    public function insert($esp) {
        $isSuccessful = false;

        if ($esp instanceof Esp) {
            $query = $this->database->prepare("INSERT INTO esp VALUES (:id, :name, :location, :ip, :hw_id);");
            $isSuccessful = $query->execute(array(  'id' => $esp->getId(),
                                                    'name' => $esp->getName(),
                                                    'location' => $esp->getLocation()->getId(),
                                                    'ip' => $esp->getIp(),
                                                    'hw_id' => $esp->getHwId()));
        }

        return $isSuccessful;
    }

    public function update($esp) {
        $isSuccessful = false;

        if ($esp instanceof Esp) {
            $query = $this->database->prepare(
                "UPDATE esp 
                          SET esp.esp_name = :name, esp.esp_location = :location, 
                          esp.esp_ip = :ip, esp.esp_hw_id = :hw_id
                          WHERE esp.esp_id = :id;");
            $isSuccessful = $query->execute(array(  'id' => $esp->getId(),
                                                    'name' => $esp->getName(),
                                                    'location' => $esp->getLocation()->getId(),
                                                    'ip' => $esp->getIp(),
                                                    'hw_id' => $esp->getHwId()));
        }

        return $isSuccessful;
    }

    public function delete($espId) {
        $query = $this->database->prepare("DELETE FROM esp WHERE esp_id = :espId");
        $isSuccessful = $query->execute(array("espId" => $espId));

        return $isSuccessful;
    }

    public function find($espId) {
        $espId = intval($espId);
        $query = $this->database->prepare("SELECT * FROM esp INNER JOIN location ON esp.esp_location = location.loc_id WHERE esp.esp_id = :espId");
        $query->execute(array("espId" => $espId));
        $espDb = $query->fetch();
        $esp = null;

        if ($espDb !== false) {
            $esp = Esp::createEsp($espId, $espDb['esp_name'], $espDb['esp_location'], $espDb['esp_ip'], $espDb['esp_hw_id']);
        }

        return $esp;
    }

    public function findByHwId($hwId) {
        $query = $this->database->prepare("SELECT * FROM esp INNER JOIN location ON esp_location = loc_id WHERE esp_hw_id = :hwId");
        $query->execute(array("hwId" => $hwId));
        $espDb = $query->fetch();
        $esp = null;

        if ($espDb !== false) {
            $esp = Esp::createEsp($espDb['esp_id'], $espDb['esp_name'], $espDb['esp_location'], $espDb['esp_ip'], $espDb['esp_hw_id']);
        }

        return $esp;
    }

    public function findAll() {
        $query = $this->database->prepare("SELECT * FROM esp INNER JOIN location ON esp.esp_location = location.loc_id");
        $query->execute();
        $espCollectionDb = $query->fetchAll();
        $espCollection = array();

        if ($espCollectionDb !== false) {
            foreach ($espCollectionDb as $espDb) {
                array_push($espCollection, Esp::createEsp($espDb['esp_id'], $espDb['esp_name'], $espDb['esp_location'], $espDb['esp_ip'], $espDb['esp_hw_id']));
            }
        }

        return $espCollection;
    }

    public function findFreeId() {
        $query = $this->database->prepare("SELECT esp_id FROM esp ORDER BY esp_id DESC LIMIT 1");
        $query->execute();
        $freeId = $query->fetch();

        if ($freeId === false) {
            // TODO error
        }

        return $freeId['esp_id']+1;
    }
}

