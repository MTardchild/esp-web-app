<?php
class FirmwareService implements IDatabaseService {
    private $firmwareMapper;

    public function __construct(FirmwareMapper $firmwareMapper) {
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

}