<?php

class ReceiveDataService
{
    private $heartbeatService;

    public function __construct(HeartbeatService $heartbeatService) {
        $this->heartbeatService = $heartbeatService;
    }

    public function evaluateHeartbeat($postData) {
        return $this->heartbeatService->evaluate($postData);
    }
}