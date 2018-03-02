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
        $query = $this->database->prepare(
            "select distinct cls_id, cls_start_offset, cmp_name, cmp_esp, cdl_red, cdl_green, cdl_blue, 
            cdl_warm_white from component_led_strip join component on cls_id=cmp_id 
            join (select * from component_data_led_strip order by cdl_id desc limit 1) as cdl where cls_id = :id");
        $query->execute(array("id" => $id));
        $ledStripDb = $query->fetch();
        $ledStrip = null;

        if ($ledStripDb !== false) {
            $ledStrip = LedStrip::createLedStrip($ledStripDb['cls_id'], $ledStripDb['cmp_name'],
                $ledStripDb['cdl_red'], $ledStripDb['cdl_green'], $ledStripDb['cdl_blue'], $ledStripDb['cdl_warm_white'],
                $ledStripDb['cmp_esp'], $ledStripDb['cls_start_offset']);
        }

        return $ledStrip;
    }
}