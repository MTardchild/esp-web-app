<?php

class LedStripDataMapper implements IDatabaseMapper
{
    private $database;

    public function __construct(PDO $database) {
        $this->database = $database;
    }

    public function insert($ledStripData)
    {
        // TODO: Implement insert() method.
        return null;
    }

    public function update($ledStripData) {
        // TODO: Implement update() method.
        return null;
    }

    public function delete($ledStripDataId)
    {
        // TODO: Implement delete() method.
        return null;
    }

    public function findLatestDataSet($ledStripId) {
        $ledStripId = intval($ledStripId);
        $query = $this->database->prepare(
            "SELECT cdlQ1.cdl_red, cdlQ1.cdl_green, cdlQ1.cdl_blue, cdlQ1.cdl_warm_white, 
            component.cmp_name, component.cmp_type, component.cmp_esp 
            FROM component_data_led_strip cdlQ1 INNER JOIN component 
            ON cdlQ1.cdl_component = component.cmp_id WHERE cdlQ1.cdl_component = :ledStripId
            AND cdlQ1.cdl_timestamp = (SELECT MAX(cdlQ2.cdl_timestamp) FROM component_data_led_strip cdlQ2 
            WHERE cdlQ2.cdl_component = cdlQ1.cdl_component)"
        );

        $query->execute(array("ledStripId" => $ledStripId));
        $ledStripDb = $query->fetch();
        $ledStrip = LedStrip::createLedStrip(
            $ledStripId, $ledStripDb['cmp_name'], $ledStripDb['cdl_red'], $ledStripDb['cdl_green'],
            $ledStripDb['cdl_blue'], $ledStripDb['cdl_warm_white'], $ledStripDb['cmp_esp']);

        return $ledStrip;
    }

    public function findCollectionCurrentDay($ledStripId) {

    }
}