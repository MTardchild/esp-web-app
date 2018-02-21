<?php
//namespace App\Model\Service;

class WindowService implements IDatabaseService {
    private $windowMapper;
    private $roomService;

    public function __construct(WindowMapper $windowMapper,
                                RoomService $roomService) {
        $this->windowMapper = $windowMapper;
        $this->roomService = $roomService;
    }

    public function insert($window) {
        return $this->windowMapper->insert($window);
    }

    public function update($window) {
        return $this->windowMapper->update($window);
    }

    public function delete($windowId) {
        return $this->windowMapper->delete($windowId);
    }

    public function find($windowId) {
        $window = $this->windowMapper->find($windowId);
        $window->setRoom($window->getRoom());

        return $window;
    }

    public function findAll() {
        $windowCollection = $this->windowMapper->findAll();

        foreach ($windowCollection as $window) {
            $window->setRoom($this->roomService->find($window->getRoom()));
        }

        return $windowCollection;
    }
}
