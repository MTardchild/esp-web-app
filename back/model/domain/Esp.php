<?php
//namespace App\Model\Domain;

class Esp extends DatabaseObjectBase implements JsonSerializable
{
    private $name;
    private $location;
    private $components;
    private $ip;
    private $hwId;

    private $dhtCollection = array();
    private $relayCollection = array();
    private $ledStripCollection = array();

    private function __construct()
    {

    }

    public static function createEspEmpty()
    {
        $esp = new Esp();
        $esp->id = -1;
        return $esp;
    }

    public static function createEsp($id, $name, $location, $ip, $hwId)
    {
        $esp = new Esp();
        $esp->id = $id;
        $esp->name = $name;
        $esp->location = $location;
        $esp->ip = $ip;
        $esp->hwId = $hwId;

        return $esp;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getLocation()
    {
        return $this->location;
    }

    public function setLocation($location)
    {
        $this->location = $location;
    }

    public function getHwId()
    {
        return $this->hwId;
    }

    public function setHwId($hwId)
    {
        $this->hwId = $hwId;
    }

    public function getComponents()
    {
        return $this->components;
    }

    public function setComponents(array $components)
    {
        $this->components = $components;
    }

    public function getDhtCollection()
    {
        return $this->dhtCollection;
    }

    public function getRelayCollection()
    {
        return $this->relayCollection;
    }

    public function getLedStripCollection()
    {
        return $this->ledStripCollection;
    }

    public function getIp()
    {
        return $this->ip;
    }

    public function setIp($ip)
    {
        $this->ip = $ip;
    }

    public function populateComponentCollections()
    {
        $components = $this->getComponents();

        foreach ($components as $component) {
            if ($component instanceof Dht) {
                array_push($this->dhtCollection, $component);
            } elseif ($component instanceof Relay) {
                array_push($this->relayCollection, $component);
            } elseif ($component instanceof LedStrip) {
                array_push($this->ledStripCollection, $component);
            }
        }
    }

    function jsonSerialize()
    {
        return [
            'id' => $this->getId(),
            'hwId' => $this->getHwId(),
            'name' => $this->getName(),
            'location' => $this->getLocation(),
            'ip' => $this->getIp(),
            'components' => $this->getComponents()
        ];
    }
}
