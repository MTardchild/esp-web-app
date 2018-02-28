<?php

class LedStripMapper implements IDatabaseMapper
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

    public function find($id)
    {
        $id = intval($id);
        $query = $this->database->prepare("SELECT * FROM component_led_strip JOIN component ON cls_id=cmp_id WHERE cls_id = :id");
        $query->execute(array("id" => $id));
        $ledStripDb = $query->fetch();
        $ledStrip = null;

        if ($ledStripDb !== false) {
            $ledStrip = LedStrip::createLedStripNoData($ledStripDb['cls_id'], $ledStripDb['cmp_esp'], $ledStripDb['cls_start_offset']);
        }

        return $ledStrip;
    }
}