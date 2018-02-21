<?php
//namespace App\Model\Service;

class DoorService implements IDatabaseService
{
    private $doorMapper;
    private $roomService;

    public function __construct(DoorMapper $doorMapper,
                                RoomService $roomService)
    {
        $this->doorMapper = $doorMapper;
        $this->roomService = $roomService;
    }

    public function insert($door)
    {
        return $this->doorMapper->insert($door);
    }

    public function update($door)
    {
        return $this->doorMapper->update($door);
    }

    public function delete($doorId)
    {
        return $this->doorMapper->delete($doorId);
    }

    public function find($doorId)
    {
        $door = $this->doorMapper->find($doorId);
        $door->setRoom1($this->roomService->find($door->getRoom1()->getId()));
        $door->setRoom2($this->roomService->find($door->getRoom2()->getId()));

        return $door;
    }

    public function findAll()
    {
        $doorCollection = $this->doorMapper->findAll();

        foreach ($doorCollection as $door) {
            $door->setRoom1($this->roomService->find($door->getRoom1()->getId()));
            $door->setRoom2($this->roomService->find($door->getRoom2()->getId()));
        }

        return $doorCollection;
    }

    public function findFreeId()
    {
        return $this->doorMapper->findFreeId();
    }

    public function handleUpdate($update)
    {
        $update = json_decode($update, true);

        if ($update["action"] === "delete") $this->delete($update["door"]["id"]);

        if ($update["action"] === "update") {
            $door = $this->find($update["door"]["id"]);
            $door->setName($update["door"]["name"]);
            $door->setRoom1($this->roomService->find($update["door"]["room1"]["id"]));
            $door->setRoom2($this->roomService->find($update["door"]["room2"]["id"]));
            $this->update($door);
        }

        if ($update["action"] === "insert") {
            $room1 = $this->roomService->find($update["door"]["room1"]["id"]);
            $room2 = $this->roomService->find($update["door"]["room2"]["id"]);
            $door = Door::createDoor($this->findFreeId(), $update["door"]["name"], $room1, $room2);
            $this->insert($door);
        }
    }
}
