<?php
//namespace App\Model\Service;

class DoorService implements IDatabaseService {
    private $doorMapper;
    private $roomService;

    public function __construct(DoorMapper $doorMapper,
                                RoomService $roomService) {
        $this->doorMapper = $doorMapper;
        $this->roomService = $roomService;
    }

    public function insert($door) {
        return $this->doorMapper->insert($door);
    }

    public function update($door) {
        return $this->doorMapper->update($door);
    }

    public function delete($doorId) {
        return $this->doorMapper->insert($doorId);
    }

    public function find($doorId) {
        $door = $this->doorMapper->find($doorId);
        $door->setRoom1($this->roomService->find($door->getRoom1()));
        $door->setRoom2($this->roomService->find($door->getRoom2()));

        return $door;
    }

    public function findAll() {
        $doorCollection = $this->doorMapper->findAll();

        foreach ($doorCollection as $door) {
            $door->setRoom1($this->roomService->find($door->getRoom1()));
            $door->setRoom2($this->roomService->find($door->getRoom2()));
        }

        return $doorCollection;
    }
}
