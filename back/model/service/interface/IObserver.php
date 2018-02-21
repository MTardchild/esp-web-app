<?php

interface IObserver
{
    public function attach($event, $object, $handler);
}
