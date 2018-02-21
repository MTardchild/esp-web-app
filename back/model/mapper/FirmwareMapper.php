<?php

class FirmwareMapper implements IDatabaseMapper, IDatabaseObjectMapper
{
    private $database;

    public function __construct(PDO $database)
    {
        $this->database = $database;
    }

    public function insert($firmware)
    {
        $isSuccessful = false;

        if ($firmware instanceof Firmware) {
            $query = $this->database->prepare("INSERT INTO firmware VALUES (:id, :name, :path, :timestamp);");
            $isSuccessful = $query->execute(array('id' => $firmware->getId(),
                'name' => $firmware->getName(),
                'path' => $firmware->getPath(),
                'timestamp' => $firmware->getTimestamp()));
        }

        return $isSuccessful;
    }

    public function delete($firmwareId)
    {
        $query = $this->database->prepare("DELETE FROM firmware WHERE fwa_id = :firmwareId");
        $isSuccessful = $query->execute(array("firmwareId" => $firmwareId));

        return $isSuccessful;
    }

    public function update($firmware)
    {
        $isSuccessful = false;

        if ($firmware instanceof Firmware) {
            $query = $this->database->prepare(
                "UPDATE firmware 
                          SET fwa_name = :name, fwa_path = :path, 
                          fwa_timestamp = :timestamp
                          WHERE fwa_id = :id;");
            $isSuccessful = $query->execute(array('id' => $firmware->getId(),
                'name' => $firmware->getName(),
                'path' => $firmware->getPath(),
                'timestamp' => $firmware->getTimestamp()));
        }

        return $isSuccessful;
    }

    public function find($firmwareId)
    {
        $firmwareId = intval($firmwareId);
        $query = $this->database->prepare("SELECT * FROM firmware WHERE firmware.fwa_id = :firmwareId");
        $query->execute(array("firmwareId" => $firmwareId));
        $firmwareDb = $query->fetch();
        $firmware = null;

        if ($firmwareDb !== false) {
            $firmware = Firmware::createFirmware($firmwareDb['fwa_id'], $firmwareDb['fwa_name'], $firmwareDb['fwa_path'], $firmwareDb['fwa_timestamp']);
        }

        return $firmware;
    }

    public function findAll()
    {
        $query = $this->database->prepare("SELECT * FROM firmware");
        $query->execute();
        $firmwareCollectionDb = $query->fetchAll();
        $firmwareCollection = array();

        if ($firmwareCollectionDb !== false) {
            foreach ($firmwareCollectionDb as $firmwareDb) {
                array_push($firmwareCollection, Firmware::createFirmware($firmwareDb['fwa_id'], $firmwareDb['fwa_name'], $firmwareDb['fwa_path'], $firmwareDb['fwa_timestamp']));
            }
        }

        return $firmwareCollection;
    }

    public function findFreeId()
    {
        $query = $this->database->prepare("SELECT fwa_id FROM firmware ORDER BY fwa_id DESC LIMIT 1");
        $query->execute();
        $freeId = $query->fetch();

        return $freeId['fwa_id'] + 1;
    }
}