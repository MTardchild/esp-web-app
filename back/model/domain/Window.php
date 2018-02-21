<?php
//namespace App\Model\Domain;

class Window extends DatabaseObjectBase implements JsonSerializable
{
    private $name;
    private $room;

    private function __construct()
    {

    }

    public static function createWindowEmpty()
    {
        $window = new Window();
        $window->id = -1;
        $window->name = "";
        $window->room = Room::createRoomEmpty();

        return $window;
    }

    public static function createWindow($id, $name, $room)
    {
        $window = new Window();
        $window->id = $id;
        $window->name = $name;
        $window->room = $room;

        return $window;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getRoom()
    {
        return $this->room;
    }

    public function setRoom($room)
    {
        $this->room = $room;
    }

    function jsonSerialize()
    {
        return [
            'id' => $this->getId(),
            'name' => $this->getName(),
            'room' => $this->getRoom()
        ];
    }
}
