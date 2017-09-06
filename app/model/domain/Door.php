<?php
//namespace App\Model\Domain;

class Door extends DatabaseObjectBase implements JsonSerializable {
	private $name;
	private $room1;
	private $room2;

	private function __construct() {

	}

	public static function createDoorEmpty() {
		$door = new Door();
		$door->room1 = Room::createRoomEmpty();
		$door->room2 = Room::createRoomEmpty();

		return $door;
	}

	public static function createDoor($id, $name, $room1, $room2) {
		$door = new Door();
		$door->id = $id;
		$door->name = $name;
		$door->room1 = $room1;
		$door->room2 = $room2;

		return $door;
	}

	public function getName() {
		return $this->name;
	}

	public function setName($name) {
		$this->name = $name;
	}

	public function getRoom1() {
		return $this->room1;
	}

	public function setRoom1(Room $room) {
		$this->room1 = $room;
	}

	public function getRoom2() {
		return $this->room2;
	}

	public function setRoom2(Room $room) {
		$this->room2 = $room;
	}

    function jsonSerialize()
    {
        return [
            'id' => $this->getId(),
            'name' => $this->getName(),
            'room1' => $this->getRoom1(),
            'room2' => $this->getRoom2()
        ];
    }
}
