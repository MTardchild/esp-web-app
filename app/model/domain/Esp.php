<?php
//namespace App\Model\Domain;

class Esp extends DomainObjectBase implements JsonSerializable {
	private $name;
    private $location;
    private $components;
    private $ip;

	private $dhtCollection = array();
	private $relayCollection = array();
	private $ledStripCollection = array();

	private function __construct() {

	}

	public static function createEspEmpty() {
		return new Esp();
	}

	public static function createEsp($id, $name, $location, $ip) {
		$esp = new Esp();
		$esp->id = $id;
		$esp->name = $name;
		$esp->location = $location;
		$esp->ip = $ip;

		return $esp;
	}

	public function getName() {
		return $this->name;
	}

	public function setName($name) {
		$this->name = $name;
	}

	public function getLocation() {
		return $this->location;
	}

	public function setLocation($location) {
		$this->location = $location;
	}

	public function getComponents() {
		return $this->components;
	}

	public function setComponents(array $components) {
		$this->components = $components;
	}

	public function getDhtCollection() {
		return $this->dhtCollection;
	}

	public function getRelayCollection() {
		return $this->relayCollection;
	}

    public function getLedStripCollection()
    {
        return $this->ledStripCollection;
    }

	public function getIp() {
	    return $this->ip;
    }

    public function setIp($ip) {
	    $this->ip = $ip;
    }

	public function populateComponentCollections() {
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
            'esp' => [
                'id' => $this->getId(),
                'name' => $this->getName(),
                'location' => $this->getLocation(),
                'ip' => $this->getIp(),
                'components' => [
                    $this->getComponents()
                ]
            ]
        ];
    }
}