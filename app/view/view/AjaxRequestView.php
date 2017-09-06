<?php

class AjaxRequestView {
    private $_ajaxRequest;

    public function __construct(AjaxRequest $ajaxRequest) {
        $this->_ajaxRequest = $ajaxRequest;
    }

    public function output() {
        return $this->_ajaxRequest->getMessage();
    }
}