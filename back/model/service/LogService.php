<?php
/**
 * Created by PhpStorm.
 * User: mtardunix
 * Date: 03.03.18
 * Time: 01:36
 */

class LogService implements IDatabaseService
{
    private $logMapper;

    public function __construct(LogMapper $logMapper)
    {
        $this->logMapper = $logMapper;
    }

    public function insert($logEntry)
    {
        return $this->logMapper->insert($logEntry);
    }

    public function update($logEntry)
    {
        return $this->logMapper->update($logEntry);
    }

    public function delete($logEntryId)
    {
        return $this->logMapper->delete($logEntryId);
    }

    public function findAll() {
        return $this->logMapper->findAll();
    }

    public function findFreeId() {
        return $this->logMapper->findFreeId();
    }

    public function handleUpdate($update)
    {
        $update = json_decode($update, true);

        if ($update["action"] === "delete") ;

        if ($update["action"] === "update") ;

        if ($update["action"] === "insert") {
            $logEntry = LogEntry::createLogEntry($this->findFreeId(),
                $update["logEntry"]["type"], $update["logEntry"]["text"]);
            $this->insert($logEntry);
        }
    }
}