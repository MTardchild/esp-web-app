<?php
//namespace App\Model\Service;

class RoomService implements IDatabaseService
{
    private $roomMapper;

    public function __construct(RoomMapper $roomMapper)
    {
        $this->roomMapper = $roomMapper;
    }

    public function insert($room)
    {
        return $this->roomMapper->insert($room);
    }

    public function update($room)
    {
        return $this->roomMapper->update($room);
    }

    public function delete($roomId)
    {
        return $this->roomMapper->delete($roomId);
    }

    public function find($roomId)
    {
        return $this->roomMapper->find($roomId);
    }

    public function findAll()
    {
        return $this->roomMapper->findAll();
    }

    public function findFreeId()
    {
        return $this->roomMapper->findFreeId();
    }

    public function handleUpdate($update)
    {
        $update = json_decode($update, true);

        if ($update["action"] === "delete") $this->delete($update["room"]["id"]);

        if ($update["action"] === "update") {
            $room = $this->find($update["room"]["id"]);
            $room->setName($update["room"]["name"]);
            $this->update($room);
        }

        if ($update["action"] === "insert") {
            $room = Room::createRoom($this->findFreeId(), $update["room"]["name"]);
            $this->insert($room);
        }
    }
}
