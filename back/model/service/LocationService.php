<?php
//namespace App\Model\Service;

class LocationService implements IDatabaseService
{
    private $locationMapper;
    private $roomService;
    private $doorService;
    private $windowService;

    public function __construct(LocationMapper $locationMapper,
                                RoomService $roomService,
                                DoorService $doorService,
                                WindowService $windowService)
    {
        $this->locationMapper = $locationMapper;
        $this->roomService = $roomService;
        $this->doorService = $doorService;
        $this->windowService = $windowService;
    }

    public function insert($location)
    {
        return $this->locationMapper->insert($location);
    }

    public function update($location)
    {
        return $this->locationMapper->update($location);
    }

    public function delete($locationId)
    {
        return $this->locationMapper->delete($locationId);
    }

    public function find($locationId)
    {
        $location = $this->locationMapper->find($locationId);
        if ($location != null) {
            $location->setRoom($this->roomService->find($location->getRoom()));
            $location->setDoor($this->doorService->find($location->getDoor()));
            $location->setWindow($this->windowService->find($location->getWindow()));
        }

        return $location;
    }

    public function findAll()
    {
        $locationCollection = $this->locationMapper->findAll();

        foreach ($locationCollection as $location) {
            $location->setRoom($this->roomService->find($location->getRoom()));
            $location->setDoor($this->doorService->find($location->getDoor()));
            $location->setWindow($this->windowService->find($location->getWindow()));
        }

        return $locationCollection;
    }

    public function findFreeId()
    {
        return $this->locationMapper->findFreeId();
    }

    public function handleUpdate($update)
    {
        $update = json_decode($update, true);

        if ($update["action"] === "delete") $this->delete($update["location"]["id"]);

        if ($update["action"] === "update") {
            $location = $this->find($update["location"]["id"]);
            $location->setName($update["location"]["name"]);
            $location->setRoom($this->roomService->find($update["location"]["room"]["id"]));
            $location->setDoor($this->doorService->find($update["location"]["door"]["id"]));
            $location->setWindow($this->windowService->find($update["location"]["window"]["id"]));
            $this->update($location);
        }

        if ($update["action"] === "insert") {
            $room = $this->roomService->find($update["location"]["room"]["id"]);
            $door = $this->doorService->find($update["location"]["door"]["id"]);
            $window = $this->windowService->find($update["location"]["window"]["id"]);
            $location = Location::createLocation($this->findFreeId(), $update["location"]["name"], $room, $door, $window);
            $this->insert($location);
        }
    }
}
