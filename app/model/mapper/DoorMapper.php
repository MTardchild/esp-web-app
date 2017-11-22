<?php
//namespace App\Model\Mapper;

class DoorMapper implements IDatabaseMapper, IDatabaseObjectMapper {
    private $database;

    public function __construct(PDO $database) {
        $this->database = $database;
    }

    public function insert($door) {
        $isSuccessful = false;

        if ($door instanceof Door) {
            $query = $this->database->prepare("INSERT INTO door VALUES (:id, :name, :room1, :room2);");
            $isSuccessful = $query->execute(array(  'id' => $door->getId(),
                                                    'name' => $door->getName(),
                                                    'room1' => $door->getRoom1()->getId(),
                                                    'room2' => $door->getRoom2()->getId()));
        }

        return $isSuccessful;
    }

    public function update($door) {
        $isSuccessful = false;

        if ($door instanceof Door) {
            $query = $this->database->prepare("UPDATE door SET door.dor_name = :name, door.dor_room_1 = :room1, door.dor_room_2 = :room2 WHERE door.dor_id = :id;");
            $isSuccessful = $query->execute(array(  'id' => $door->getId(),
                                                    'name' => $door->getName(),
                                                    'room1' => $door->getRoom1()->getId(),
                                                    'room2' => $door->getRoom2()->getId()));
        }

        return $isSuccessful;
    }

    public function delete($espId) {
        $query = $this->database->prepare("DELETE FROM esp WHERE esp_id = :espId");
        $isSuccessful = $query->execute(array("espId" => $espId));

        return $isSuccessful;
    }

    public function find($doorId) {
        $doorId = intval($doorId);
        $query = $this->database->prepare("SELECT * FROM door WHERE door.dor_id = :doorId");
        $query->execute(array("doorId" => $doorId));
        $doorDb = $query->fetch();
        $door = Door::createDoor($doorId, $doorDb['dor_name'], $doorDb['dor_room_1'], $doorDb['dor_room_2']);

        return $door;
    }

    public function findAll() {
        $query = $this->database->prepare("SELECT * FROM door");
        $query->execute();
        $doorCollectionDb = $query->fetchAll();
        $doorCollection = array();

        if ($doorCollectionDb !== false) {
            foreach ($doorCollectionDb as $doorDb) {
                array_push($doorCollection, Door::createDoor($doorDb['dor_id'], $doorDb['dor_name'], $doorDb['dor_room_1'], $doorDb['dor_room_2']));
            }
        }

        return $doorCollection;
    }
}
