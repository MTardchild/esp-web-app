<?php
//namespace App\Model\Service;

class EspService implements IDatabaseService {
    private $_espMapper;
    private $_componentService;
    private $_locationService;

    public function __construct(EspMapper $espMapper,
                                ComponentService $componentService,
                                LocationService $locationService) {
        $this->_espMapper = $espMapper;
        $this->_componentService = $componentService;
        $this->_locationService = $locationService;
    }

    public function insert($esp) {
        if (!$this->_locationService->getLocation($esp->getLocation()->getId()) instanceof Location) {
            $this->_locationService->insert($esp->getLocation());
        }

        $isSuccessful = $this->_espMapper->insert($esp);

        foreach ($esp->getComponents() as $component) {
            $this->_componentService->insert($component);
        }

        return $isSuccessful;
    }

    public function update($esp) {
        return $this->_espMapper->update($esp);
    }

    public function delete($espId) {
        return $this->_espMapper->delete($espId);
    }

    public function find($espId) {
        $esp = $this->_espMapper->find($espId);
        if ($esp === null) return null;

        $location = $this->_locationService->getLocation($esp->getLocation());
        $components = $this->_componentService->getComponents($espId);
        $esp->setLocation($location);
        $esp->setComponents($components);
        $esp->populateComponentCollections();

        return $esp;
    }

    public function findAll() {
        $espCollection = $this->_espMapper->findAll();

        foreach ($espCollection as $esp) {
            $location = $this->_locationService->getLocation($esp->getLocation());
            $components = $this->_componentService->getComponents($esp->getId());
            $esp->setLocation($location);
            $esp->setComponents($components);
            $esp->populateComponentCollections();
        }

        return $espCollection;
    }

    public function findByHwId($hwId) {
        $esp = $this->_espMapper->findByHwId($hwId);
        $location = $this->_locationService->getLocation($esp->getLocation());
        $components = $this->_componentService->getComponents($esp->getId());
        $esp->setLocation($location);
        $esp->setComponents($components);
        $esp->populateComponentCollections();

        return $esp;
    }

    public function findFreeId() {
        return $this->_espMapper->findFreeId();
    }
}
