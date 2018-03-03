<?php
/**
 * Created by PhpStorm.
 * User: mtardunix
 * Date: 03.03.18
 * Time: 01:38
 */

class LogMapper implements IDatabaseMapper, IDatabaseObjectMapper
{
    private $database;

    public function __construct(PDO $database)
    {
        $this->database = $database;
    }

    public function insert($logEntry)
    {
        $isSuccessful = false;

        if ($logEntry instanceof LogEntry) {
            $query = $this->database->prepare("INSERT INTO log VALUES (:id, :type, :text);");
            $isSuccessful = $query->execute(array('id' => $logEntry->getId(),
                'type' => $logEntry->getType(),
                'text' => $logEntry->getText()));
        }

        return $isSuccessful;
    }

    public function update($logEntry)
    {
        return false;
    }

    public function delete($logEntryId)
    {
        $query = $this->database->prepare("DELETE FROM log WHERE log_id = :id");
        $isSuccessful = $query->execute(array("id" => $logEntryId));

        return $isSuccessful;
    }

    public function findAll()
    {
        $query = $this->database->prepare("SELECT * FROM log");
        $query->execute();
        $logEntryCollectionDb = $query->fetchAll();
        $logEntryCollection = array();

        if ($logEntryCollectionDb !== false) {
            foreach ($logEntryCollectionDb as $logEntryDb) {
                array_push($logEntryCollection, LogEntry::createLogEntry(
                    $logEntryDb['log_id'], $logEntryDb['log_type'],
                    ($logEntryDb["log_text"])));
            }
        }

        return $logEntryCollection;
    }

    public function findFreeId()
    {
        $query = $this->database->prepare("SELECT log_id FROM log ORDER BY log_id DESC LIMIT 1");
        $query->execute();
        $freeId = $query->fetch();

        return $freeId['log_id'] + 1;
    }
}