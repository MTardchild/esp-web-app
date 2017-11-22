<?php
//namespace App\Model\Mapper;

class LocationMapper implements IDatabaseMapper, IDatabaseObjectMapper {
    private $database;

    public function __construct(PDO $database) {
        $this->database = $database;
    }

    public function insert($location) {
        $isSuccessful = false;

        if ($location instanceof Location) {
            $query = $this->database->prepare("INSERT INTO location VALUES (:id, :name, :room, :door, :window);");
            $isSuccessful = $query->execute(array(  'id' => $location->getId(),
                                                    'name' => $location->getName(),
                                                    'room' => $location->getRoom() === null ? null : $location->getRoom()->getId(),
                                                    'door' => $location->getDoor() === null ? null : $location->getDoor()->getId(),
                                                    'window' => $location->getWindow() === null ? null : $location->getWindow()->getId()));
        }

        return $isSuccessful;
    }

    public function update($location) {
        $isSuccessful = false;

        if ($location instanceof Room) {
            $query = $this->database->prepare("UPDATE location SET location.loc_name = :name, location.loc_room = :room, location.loc_door = :door, location.loc_window = :window WHERE room.rom_id = :id;");
            $isSuccessful = $query->execute(array(  'id' => $location->getId(),
                                                    'name' => $location->getName(),
                                                    'room' => $location->getRoom()->getId(),
                                                    'door' => $location->getDoor()->getId(),
                                                    'window' => $location->getWindow()->getId()));
        }

        return $isSuccessful;
    }

    public function delete($locationId) {
        $query = $this->database->prepare("DELETE FROM location WHERE loc_id = :locationId");
        $isSuccessful = $query->execute(array("locationId" => $locationId));

        return $isSuccessful;
    }

    public function find($locationId) {
        $espId = intval($locationId);
        $query = $this->database->prepare("SELECT * FROM location WHERE location.loc_id = :locationId");
        $query->execute(array("locationId" => $locationId));
        $locationDb = $query->fetch();

        if ($locationDb === false) {
            $location = null;
        } else {
            $location = Location::createLocation(   $locationDb["loc_id"],
                $locationDb["loc_name"],
                $locationDb["loc_room"],
                $locationDb["loc_door"],
                $locationDb["loc_window"]);
        }

        return $location;
    }

    public function findAll() {
        $query = $this->database->prepare("SELECT * FROM location");
        $query->execute();
        $locationCollectionDb = $query->fetchAll();
        $locationCollection = array();

        if ($locationCollectionDb !== false) {
            foreach ($locationCollectionDb as $locationDb) {
                array_push($locationCollection, Location::createLocation(
                    $locationDb['loc_id'], $locationDb['loc_name'],
                    $locationDb['loc_room'], $locationDb['loc_door'],
                    $locationDb['loc_window']));
            }
        }

        return $locationCollection;
    }

    public function findFreeId() {
        $query = $this->database->prepare("SELECT loc_id FROM location ORDER BY loc_id DESC LIMIT 1");
        $query->execute();
        $freeId = $query->fetch();

        if ($freeId === false) {
            // TODO error
        }

        return $freeId['loc_id']+1;
    }
}
