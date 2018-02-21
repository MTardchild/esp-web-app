<?php

interface ISubject
{
    public function register($event, $object, $handler);

    public function trigger($event, $data = null);
}
