<?php
//namespace App\Model\Mapper;

class WindowMapper implements IDatabaseMapper
{
    private $database;

    public function __construct(PDO $database)
    {
        $this->database = $database;
    }

    public function insert($window)
    {
        $isSuccessful = false;

        if ($window instanceof Window) {
            $query = $this->database->prepare("INSERT INTO window VALUES (:windowId, :windowName, :windowRoom);");
            $isSuccessful = $query->execute(array('windowId' => $window->getId(),
                'windowName' => $window->getName(),
                'windowRoom' => $window->getRoom()->getId()));
        }

        return $isSuccessful;
    }

    public function update($window)
    {
        $isSuccessful = false;

        if ($window instanceof Window) {
            $query = $this->database->prepare("UPDATE window SET window.win_name = :windowName, window.win_room = :windowRoom WHERE win_id = :windowId;");
            $isSuccessful = $query->execute(array('windowId' => $window->getId(),
                'windowName' => $window->getName(),
                'windowRoom' => $window->getRoom()->getId()));
        }

        return $isSuccessful;
    }

    public function delete($windowId)
    {
        $query = $this->database->prepare("DELETE FROM window WHERE window.win_id = :windowId");
        $isSuccessful = $query->execute(array("windowId" => $windowId));
        return $isSuccessful;
    }

    public function find($windowId)
    {
        $windowId = intval($windowId);
        if ($windowId <= 0) return Window::createWindowEmpty();

        $query = $this->database->prepare("SELECT * FROM window WHERE window.win_id = :windowId");
        $query->execute(array("windowId" => $windowId));
        $windowDb = $query->fetch();
        $window = Window::createWindow($windowId, $windowDb['win_name'], Room::createRoomId($windowDb['win_room']));

        return $window;
    }

    public function findAll()
    {
        $query = $this->database->prepare("SELECT * FROM window");
        $query->execute();
        $windowCollectionDb = $query->fetchAll();
        $windowCollection = array();

        if ($windowCollectionDb !== false) {
            foreach ($windowCollectionDb as $windowDb) {
                array_push($windowCollection,
                    Window::createWindow($windowDb['win_id'], $windowDb['win_name'],
                        Room::createRoomId($windowDb['win_room'])));
            }
        }

        return $windowCollection;
    }

    public function findFreeId()
    {
        $query = $this->database->prepare("SELECT win_id FROM window ORDER BY win_id DESC LIMIT 1");
        $query->execute();
        $freeId = $query->fetch();

        return $freeId['win_id'] + 1;
    }
}
