<?php
//namespace App\Model\Mapper;

class RoomMapper implements IDatabaseMapper, IDatabaseObjectMapper
{
    private $database;

    public function __construct(PDO $database)
    {
        $this->database = $database;
    }

    public function insert($room)
    {
        $isSuccessful = false;

        if ($room instanceof Room) {
            $query = $this->database->prepare("INSERT INTO room VALUES (:id, :name);");
            $isSuccessful = $query->execute(array('id' => $room->getId(),
                'name' => $room->getName()));
        }

        return $isSuccessful;
    }

    public function update($room)
    {
        $isSuccessful = false;

        if ($room instanceof Room) {
            $query = $this->database->prepare("UPDATE room SET room.rom_name = :name WHERE room.rom_id = :id;");
            $isSuccessful = $query->execute(array('id' => $room->getId(),
                'name' => $room->getName()));
        }

        return $isSuccessful;
    }

    public function delete($roomId)
    {
        $query = $this->database->prepare("DELETE FROM room WHERE room.rom_id = :id");
        $isSuccessful = $query->execute(array("id" => $roomId));

        return $isSuccessful;
    }

    public function find($roomId)
    {
        $roomId = intval($roomId);
        if ($roomId <= 0) return Room::createRoomEmpty();

        $query = $this->database->prepare("SELECT * FROM room WHERE room.rom_id = :id");
        $query->execute(array("id" => $roomId));
        $roomDb = $query->fetch();
        $room = Room::createRoom($roomId, $roomDb['rom_name']);

        return $room;
    }

    public function findAll()
    {
        $query = $this->database->prepare("SELECT * FROM room");
        $query->execute();
        $roomCollectionDb = $query->fetchAll();
        $roomCollection = array();

        if ($roomCollectionDb !== false) {
            foreach ($roomCollectionDb as $roomDb) {
                array_push($roomCollection, Room::createRoom($roomDb['rom_id'], $roomDb['rom_name']));
            }
        }

        return $roomCollection;
    }

    public function findFreeId()
    {
        $query = $this->database->prepare("SELECT rom_id FROM room ORDER BY rom_id DESC LIMIT 1");
        $query->execute();
        $freeId = $query->fetch();

        return $freeId['rom_id'] + 1;
    }
}
