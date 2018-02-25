<?php

class ToggleCommand implements JsonSerializable
{
    private $id;

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    private function __construct()
    {

    }

    public static function createToggleCommand($id)
    {
        $command = new ToggleCommand();
        $command->id = $id;

        return $command;
    }

    public function jsonSerialize()
    {
        return [
            'command' => [
                'toggle' => [
                    'id' => $this->getId()
                ]
            ]
        ];
    }
}