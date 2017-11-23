<?php
//namespace App\Model\Domain;

class Room extends DatabaseObjectBase implements JsonSerializable {
	private $name;

	private function __construct() {

	}

	public static function createRoomEmpty() {
		$room = new Room();
		$room->id = -1;
		$room->name = "";

		return $room;
	}

	public static function createRoom($id, $name) {
		$room = new Room();
		$room->id = $id;
		$room->name = $name;

		return $room;
	}

	public function getName() {
		return $this->name;
	}

	public function setName($name) {
		$this->name = $name;
	}

    function jsonSerialize()
    {
        return [
            'id' => $this->getId(),
            'name' => $this->getName()
        ];
    }
}
