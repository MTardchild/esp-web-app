<?php

class LedStripService implements IDatabaseService
{
    private $ledStripMapper;

    public function __construct(LedStripMapper $ledStripMapper)
    {
        $this->ledStripMapper = $ledStripMapper;
    }

    public function insert($object)
    {
        // TODO: Implement insert() method.
    }

    public function update($object)
    {
        // TODO: Implement update() method.
    }

    public function delete($object)
    {
        // TODO: Implement delete() method.
    }

    public function find($id)
    {
        return $this->ledStripMapper->find($id);
    }
}