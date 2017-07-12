<?php
//namespace App\Model\Domain;

class Dht extends ComponentBase implements JsonSerializable {
	private $temperature;
	private $humidity;

	private function __construct() {
		$this->temperature = -1;
		$this->humidity = -1;
	}

	public static function createDhtEmpty() {
        $dht = new Dht();
        $dht->typeId = COMPONENT_TYPE_DHT;

        return $dht;
	}

	public static function createDhtNoData($id, $espId) {
		$dht = new Dht();
		$dht->id = $id;
		$dht->espId = $espId;
        $dht->typeId = COMPONENT_TYPE_DHT;

        return $dht;
	}

	public static function createDht($id, $temperature, $humidity, $name, $espId) {
		$dht = new Dht();
		$dht->id = $id;
		$dht->temperature = $temperature;
		$dht->humidity = $humidity;
		$dht->name = $name;
		$dht->typeId = COMPONENT_TYPE_DHT;
		$dht->espId = $espId;

		return $dht;
	}

	public function getTemperature() {
		return $this->temperature;
	}

	public function setTemperature($temperature) {
		$this->temperature = $temperature;
	}

	public function getHumidity() {
		return $this->humidity;
	}

	public function setHumidity($humidity) {
		$this->humidity = $humidity;
	}

    function jsonSerialize()
    {
        return [
            'id' => $this->getId(),
            'name' => $this->getName()
        ];
    }
}