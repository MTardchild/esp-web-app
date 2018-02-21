<?php

class FirmwareService implements IDatabaseService
{
    private $firmwareMapper;

    public function __construct(FirmwareMapper $firmwareMapper)
    {
        $this->firmwareMapper = $firmwareMapper;
    }

    public function insert($object)
    {
        return $this->firmwareMapper->insert($object);
    }

    public function update($object)
    {
        return $this->firmwareMapper->update($object);
    }

    public function delete($object)
    {
        return $this->firmwareMapper->delete($object);
    }

    public function find($firmwareId)
    {
        return $this->firmwareMapper->find($firmwareId);
    }

    public function findAll()
    {
        return $this->firmwareMapper->findAll();
    }

    public function findFreeId()
    {
        return $this->firmwareMapper->findFreeId();
    }

    public function handleUpdate($update)
    {
        $update = json_decode($update, true);

        if ($update["action"] === "delete") $this->delete($update["firmware"]["id"]);

        if ($update["action"] === "update") {
            $firmware = $this->find($update["firmware"]["id"]);
            $firmware->setName($update["firmware"]["name"]);
            $firmware->setPath($update["firmware"]["path"]);
            $firmware->setTimestamp(date("Y-m-d H:i:s"));
            $this->update($firmware);
        }

        if ($update["action"] === "insert") {
            $firmware = Firmware::createFirmware($this->findFreeId(), $update["firmware"]["name"],
                $update["firmware"]["path"], date("Y-m-d H:i:s"));
            $this->insert($firmware);
        }
    }
}