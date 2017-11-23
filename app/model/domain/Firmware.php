<?php
class Firmware extends DatabaseObjectBase implements JsonSerializable {
    private $name;
    private $path;
    private $timestamp;

    private function __construct() {

    }

    public static function createFirmwareEmpty() {
        $firmware = new Firmware();
        $firmware->id = -1;
        $firmware->name = "";
        $firmware->path = "";
        $firmware->timestamp = "";

        return $firmware;
    }

    public static function createFirmware($id, $name, $path, $timestamp) {
        $firmware = new Firmware();
        $firmware->id = $id;
        $firmware->name = $name;
        $firmware->path = $path;
        $firmware->timestamp = $timestamp;

        return $firmware;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getPath()
    {
        return $this->path;
    }

    public function setPath($path)
    {
        $this->path = $path;
    }

    public function getTimestamp()
    {
        return $this->timestamp;
    }

    public function setTimestamp($timestamp)
    {
        $this->timestamp = $timestamp;
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->getId(),
            'name' => $this->getName(),
            'path' => $this->getPath(),
            'timestamp' => $this->getTimestamp()
        ];
    }
}
