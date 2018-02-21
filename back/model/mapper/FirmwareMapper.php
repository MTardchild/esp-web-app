<?php

class FirmwareMapper implements IDatabaseMapper, IDatabaseObjectMapper
{
    private $database;

    public function __construct(PDO $database)
    {
        $this->database = $database;
    }

    public function insert($object)
    {
        // TODO: Implement insert() method.
    }

    public function delete($object)
    {
        // TODO: Implement delete() method.
    }

    public function update($object)
    {
        // TODO: Implement update() method.
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
}