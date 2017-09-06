<?php
//namespace App\Model\Domain;

class Relay extends ComponentBase implements JsonSerializable {
	// Indicates if the relay has been switched or not.
	// Depending on the relay configuration (NO or NC) this implies different on/off states.
	// true: Relay pulled high
	// false: Relay pulled low
	private $state;

	private function __construct() {
		$this->state = false;
	}

	public static function createRelayEmpty() {
        $relay = new Relay();
        $relay->typeId = COMPONENT_TYPE_RELAY;

        return $relay;
	}

    public static function createRelayNoData($id, $espId) {
        $relay = new Relay();
        $relay->id = $id;
        $relay->espId = $espId;
        $relay->typeId = COMPONENT_TYPE_RELAY;

        return $relay;
    }

	public static function createRelay($id, $name, $state, $espId) {
		$relay = new Relay();
		$relay->id = $id;
		$relay->name = $name;
		$relay->state = filter_var($state, FILTER_VALIDATE_BOOLEAN);
		$relay->typeId = COMPONENT_TYPE_RELAY;
		$relay->espId = $espId;

		return $relay;
	}

	public function getState() {
		return $this->state;
	}

	public function setState($state) {
		$this->state = $state;
	}

    function jsonSerialize()
    {
        return [
            'id' => $this->getId(),
            'name' => $this->getName(),
            'typeId' => $this->getTypeId(),
            'espId' => $this->getEspId(),
            'state' => $this->getState()
        ];
    }
}
