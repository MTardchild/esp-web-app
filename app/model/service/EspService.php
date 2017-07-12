<?php
//namespace App\Model\Service;

class EspService implements IDatabaseService {
    private $espMapper;
    private $componentService;
    private $locationService;

    public function __construct(EspMapper $espMapper,
                                ComponentService $componentService,
                                LocationService $locationService) {
        $this->espMapper = $espMapper;
        $this->componentService = $componentService;
        $this->locationService = $locationService;
    }

    public function insert($esp) {
        if (!$this->locationService->getLocation($esp->getLocation()->getId()) instanceof Location) {
            $this->locationService->insert($esp->getLocation());
        }

        $isSuccessful = $this->espMapper->insert($esp);

        foreach ($esp->getComponents() as $component) {
            var_dump($component);
            $this->componentService->insert($component);
        }

        return $isSuccessful;
    }

    public function update($esp) {
        return $this->espMapper->update($esp);
    }

    public function delete($espId) {
        return $this->espMapper->delete($espId);
    }

    public function getEsp($espId) {
        $esp = $this->espMapper->find($espId);
        if ($esp === null) return null;

        $location = $this->locationService->getLocation($esp->getLocation());
        $components = $this->componentService->getComponents($espId);
        $esp->setLocation($location);
        $esp->setComponents($components);
        $esp->populateComponentCollections();

        return $esp;
    }

    public function findFreeId() {
        return $this->espMapper->findFreeId();
    }

    public function PushData($esp, $data) {

    }
}
