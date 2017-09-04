<?php

class ComponentTypeService implements IDatabaseService {
    private $_componentTypeMapper;

    public function __construct(ComponentTypeMapper $componentTypeMapper) {
        $this->_componentTypeMapper = $componentTypeMapper;
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

    public function findAll() {
        return $this->_componentTypeMapper->findAll();
    }

    public function getComponentOfType($componentType) {
        $component = null;

        switch($componentType) {
            case 1:
                $component = Dht::createDhtEmpty();
                break;
            case 2:
                $component = Relay::createRelayEmpty();
                break;
            case 3:
                $component = LedStrip::createLedStripEmpty();
                break;
        }

        return $component;
    }
}