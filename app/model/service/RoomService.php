<?php
//namespace App\Model\Service;

class RoomService implements IDatabaseService {
    private $roomMapper;

    public function __construct(RoomMapper $roomMapper) {
        $this->roomMapper = $roomMapper;
    }

    public function insert($room) {
        return $this->roomMapper->insert($room);
    }

    public function update($room) {
        return $this->roomMapper->insert($room);
    }

    public function delete($roomId) {
        return $this->roomMapper->insert($roomId);
    }

    public function getRoom($roomId) {
        return $this->roomMapper->find($roomId);
    }
}

