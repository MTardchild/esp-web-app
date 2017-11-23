<?php
//namespace App\Model\Domain;

class Location extends DatabaseObjectBase implements JsonSerializable {
	private $name;
	private $room;
	private $door;
	private $window;

	private function __construct() {

	}

	public static function createLocationEmpty() {
		$location = new Location();
		$location->id = -1;
		$location->name = "";
		$location->room = Room::createRoomEmpty();
		$location->door = Door::createDoorEmpty();
		$location->window = Window::createWindowEmpty();

		return $location;
	}

	public static function createLocationEmptyId($id) {
        $location = new Location();
        $location->id = $id;
        $location->name = "location" . $id;

        return $location;
    }

	public static function createLocation($id, $name, $room, $door, $window) {
		$location = new Location();
		$location->id = $id;
		$location->name = $name;
		$location->room = $room;
		$location->door = $door;
		$location->window = $window;

		return $location;
	}

	public function getName() {
		return $this->name;
	}

	public function setName($name) {
		$this->name = $name;
	}

	public function getRoom() {
		return $this->room;
	}

	public function setRoom(Room $room) {
		$this->room = $room;
	}

	public function getDoor() {
		return $this->door;
	}

	public function setDoor(Door $door) {
		$this->door = $door;
	}

	public function getWindow() {
		return $this->window;
	}

	public function setWindow(Window $window) {
		$this->window = $window;
	}

    function jsonSerialize()
    {
        return [
            'id' => $this->getId(),
            'name' => $this->getName(),
            'room' => $this->getRoom(),
            'door' => $this->getDoor(),
            'window' => $this->getWindow()
        ];
    }
}
