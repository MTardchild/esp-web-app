<?php

abstract class ConnectionBase
{
    protected $url;

    public function __construct($url)
    {
        $this->url = $url;
    }

    public abstract function send($data);
}