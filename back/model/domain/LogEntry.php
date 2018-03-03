<?php
/**
 * Created by PhpStorm.
 * User: mtardunix
 * Date: 03.03.18
 * Time: 01:41
 */

class LogEntry extends DatabaseObjectBase implements JsonSerializable
{
    private $type;
    private $text;

    private function __construct()
    {

    }

    public static function createLogEntryEmpty()
    {
        $logEntry = new LogEntry();
        $logEntry->id = -1;
        $logEntry->type = -1;
        $logEntry->text = "";
        return $logEntry;
    }

    public static function createLogEntry($id, $type, $text)
    {
        $logEntry = new LogEntry();
        $logEntry->id = $id;
        $logEntry->type = $type;
        $logEntry->text = $text;
        return $logEntry;
    }

    public function getType()
    {
        return $this->type;
    }

    public function setType($type)
    {
        $this->type = $type;
    }

    public function getText()
    {
        return $this->text;
    }

    public function setText($text)
    {
        $this->text = $text;
    }

    public function jsonSerialize()
    {
        // TODO: Implement jsonSerialize() method.
    }
}