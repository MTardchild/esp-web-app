<?php
//namespace App\Model\Service;

class LocationService implements IDatabaseService {
    private $locationMapper;
    private $roomService;
    private $doorService;
    private $windowService;

    public function __construct(LocationMapper $locationMapper,
                                RoomService $roomService,
                                DoorService $doorService,
                                WindowService $windowService) {
        $this->locationMapper = $locationMapper;
        $this->roomService = $roomService;
        $this->doorService = $doorService;
        $this->windowService = $windowService;
    }

    public function insert($location) {
        return $this->locationMapper->insert($location);
    }

    public function update($location) {
        return $this->locationMapper->insert($location);
    }

    public function delete($locationId) {
        return $this->locationMapper->insert($locationId);
    }

    public function getLocation($locationId) {
        $location = $this->locationMapper->find($locationId);
        if ($location != null) {
            $location->setRoom($this->roomService->getRoom($location->getRoom()));
            $location->setDoor($this->doorService->getDoor($location->getDoor()));
            $location->setWindow($this->windowService->getWindow($location->getWindow()));
        }

        return $location;
    }

    public function findFreeId() {
        return $this->locationMapper->findFreeId();
    }
}

