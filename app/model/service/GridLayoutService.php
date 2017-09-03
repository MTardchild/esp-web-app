<?php

class GridLayoutService
{
    public function __construct() {

    }

    public function save($gridLayout) {
        unlink("../app/gridlayout.json");
        $gridLayoutFile = fopen("../app/gridlayout.json", "w") or die("Unable to open file!");
        fwrite($gridLayoutFile, $gridLayout);
        fclose($gridLayoutFile);

        return true;
    }

    public function load() {
        return file_get_contents("../app/gridlayout.json");
    }
}