<?php
//namespace App\Model\Service;

class WindowService implements IDatabaseService
{
    private $windowMapper;
    private $roomService;

    public function __construct(WindowMapper $windowMapper,
                                RoomService $roomService)
    {
        $this->windowMapper = $windowMapper;
        $this->roomService = $roomService;
    }

    public function insert($window)
    {
        return $this->windowMapper->insert($window);
    }

    public function update($window)
    {
        return $this->windowMapper->update($window);
    }

    public function delete($windowId)
    {
        return $this->windowMapper->delete($windowId);
    }

    public function find($windowId)
    {
        $window = $this->windowMapper->find($windowId);
        $window->setRoom($window->getRoom()->getId());

        return $window;
    }

    public function findAll()
    {
        $windowCollection = $this->windowMapper->findAll();

        foreach ($windowCollection as $window) {
            $window->setRoom($this->roomService->find($window->getRoom()->getId()));
        }

        return $windowCollection;
    }

    public function findFreeId()
    {
        return $this->windowMapper->findFreeId();
    }

    public function handleUpdate($update)
    {
        $update = json_decode($update, true);

        if ($update["action"] === "delete") $this->delete($update["window"]["id"]);

        if ($update["action"] === "update") {
            $window = $this->find($update["window"]["id"]);
            $window->setName($update["window"]["name"]);
            $window->setRoom($this->roomService->find($update["window"]["room"]["id"]));
            $this->update($window);
        }

        if ($update["action"] === "insert") {
            $room = $this->roomService->find($update["window"]["room"]["id"]);
            $window = Window::createWindow($this->findFreeId(), $update["window"]["name"], $room);
            $this->insert($window);
        }
    }
}
