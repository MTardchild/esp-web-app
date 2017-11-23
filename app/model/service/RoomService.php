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
        return $this->roomMapper->update($room);
    }

    public function delete($roomId) {
        return $this->roomMapper->delete($roomId);
    }

    public function find($roomId) {
        return $this->roomMapper->find($roomId);
    }

    public function findAll() {
      return $this->roomMapper->findAll();
    }
}
