<?php

class ComponentTypeMapper implements IDatabaseMapper, IDatabaseObjectMapper
{
    private $database;

    public function __construct(PDO $database) {
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

    public function findAll() {
        $query = $this->database->prepare("SELECT * FROM component_type");
        $query->execute();
        $cmpTypeCollectionDb = $query->fetchAll();
        $cmpTypeCollection = array();

        if ($cmpTypeCollectionDb !== false) {
            foreach ($cmpTypeCollectionDb as $cmpTypeDb) {
                array_push($cmpTypeCollection, ComponentType::createComponentType(
                    $cmpTypeDb['cty_id'], $cmpTypeDb['cty_type']));
            }
        }

        return $cmpTypeCollection;
    }
}