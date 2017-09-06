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
        return $this->windowMapper->insert($window);
    }

    public function delete($windowId) {
        return $this->windowMapper->insert($windowId);
    }

    public function getWindow($windowId) {
        $window = $this->windowMapper->find($windowId);
        $window->setRoom($window->getRoom());

        return $window;
    }
}

