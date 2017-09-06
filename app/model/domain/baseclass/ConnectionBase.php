<?php

abstract class ConnectionBase
{
    protected $_url;

    public function __construct($url)
    {
        $this->_url = $url;
    }

    public abstract function pullData($data);
    public abstract function pushData($data);
}