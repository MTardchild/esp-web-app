<?php

class GridLayoutService
{
    public function __construct()
    {

    }

    public function save($gridLayout)
    {
        unlink("../app/gridlayout.json");
        $gridLayoutFile = fopen("../app/gridlayout.json", "w") or die ("Unable to open file!");
        fwrite($gridLayoutFile, $gridLayout);
        fclose($gridLayoutFile);

        return true;
    }

    public function load()
    {
        return file_get_contents("../app/gridlayout.json");
    }

    public function saveComponentOrder($componentOrder)
    {
        unlink("../app/componentOrder.json");
        $componentOrderFile = fopen("../app/componentOrder.json", "w") or die ("Unable to open file!");
        fwrite($componentOrderFile, $componentOrder);
        fclose($componentOrderFile);

        return true;
    }

    public function loadComponentOrder()
    {
        return file_get_contents("../app/componentOrder.json");
    }

    public function addToComponentOrder($component) {
        $componentOrder = file_get_contents("../app/componentOrder.json");
        $componentOrderJson = json_decode($componentOrder);
    }
}