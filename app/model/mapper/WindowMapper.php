<?php
//namespace App\Model\Mapper;

class WindowMapper implements IDatabaseMapper {
    private $database;

    public function __construct(PDO $database) {
        $this->database = $database;
    }

    public function insert($window) {
        $isSuccessful = false;

        if ($window instanceof Window) {
            $query = $this->database->prepare("INSERT INTO window VALUES (:windowId, :windowName, :windowRoom);");
            $isSuccessful = $query->execute(array('windowId' => $window->getId(),
                                                  'windowName' => $window->getName(),
                                                  'windowRoom' => $window->getRoom()->getId()));
        }

        return $isSuccessful;
    }

    public function update($window) {
        $isSuccessful = false;

        if ($window instanceof Window) {
            $query = $this->database->prepare("UPDATE window SET window.win_name = :windowName, window.win_room = :windowRoom WHERE win_id = :windowId;");
            $isSuccessful = $query->execute(array('windowId' => $window->getId(),
                                                  'windowName' => $window->getName(),
                                                  'windowRoom' => $window->getRoom()->getId()));
        }

        return $isSuccessful;
    }

    public function delete($windowId) {
        $query = $this->database->prepare("DELETE FROM window WHERE window.win_id = :windowId");
        $isSuccessful = $query->execute(array("windowId" => $windowId));
        return $isSuccessful;
    }

    public function find($windowId) {
        $windowId = intval($windowId);
        $query = $this->database->prepare("SELECT * FROM window WHERE window.win_id = :windowId");
        $query->execute(array("windowId" => $windowId));
        $windowDb = $query->fetch();
        $window = Window::createWindow($windowId, $windowDb['win_name'], $windowDb['win_room']);

        return $window;
    }
}
