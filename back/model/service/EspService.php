<?php
//namespace App\Model\Service;

class EspService implements IDatabaseService
{
    private $espMapper;
    private $componentService;
    private $locationService;

    public function __construct(EspMapper $espMapper,
                                ComponentService $componentService,
                                LocationService $locationService)
    {
        $this->espMapper = $espMapper;
        $this->componentService = $componentService;
        $this->locationService = $locationService;
    }

    public function insert($esp)
    {
        if (!$this->locationService->find($esp->getLocation()->getId()) instanceof Location) {
            $this->locationService->insert($esp->getLocation());
        }

        $isSuccessful = $this->espMapper->insert($esp);

        foreach ($esp->getComponents() as $component) {
            $this->componentService->insert($component);
        }

        return $isSuccessful;
    }

    public function update($esp)
    {
        return $this->espMapper->update($esp);
    }

    public function delete($espId)
    {
        return $this->espMapper->delete($espId);
    }

    public function find($espId)
    {
        $esp = $this->espMapper->find($espId);
        if ($esp === null) return null;

        $location = $this->locationService->find($esp->getLocation());
        $components = $this->componentService->getComponents($espId);
        $esp->setLocation($location);
        $esp->setComponents($components);
        $esp->populateComponentCollections();

        return $esp;
    }

    public function findAll()
    {
        $espCollection = $this->espMapper->findAll();

        foreach ($espCollection as $esp) {
            $location = $this->locationService->find($esp->getLocation());
            $components = $this->componentService->getComponents($esp->getId());
            $esp->setLocation($location);
            $esp->setComponents($components);
            $esp->populateComponentCollections();
        }

        return $espCollection;
    }

    public function findByHwId($hwId)
    {
        $esp = $this->espMapper->findByHwId($hwId);
        $location = $this->locationService->find($esp->getLocation());
        $components = $this->componentService->getComponents($esp->getId());
        $esp->setLocation($location);
        $esp->setComponents($components);
        $esp->populateComponentCollections();

        return $esp;
    }

    public function findFreeId()
    {
        return $this->espMapper->findFreeId();
    }

    public function handleUpdate($update)
    {
        $update = json_decode($update, true);

        if ($update["action"] === "delete") $this->delete($update["esp"]["id"]);

        if ($update["action"] === "update") {
            $esp = $this->find($update["esp"]["id"]);
            $esp->setName($update["esp"]["name"]);
            $esp->setLocation($this->locationService->find($update["esp"]["location"]["id"]));
            $esp->setIp($update["esp"]["ip"]);
            $this->update($esp);
        }

        if ($update["action"] === "insert") {
            $location = $this->locationService->find($update["esp"]["location"]["id"]);
            $esp = Esp::createEsp($update["esp"]["id"], $update["esp"]["name"], $location,
                $update["esp"]["ip"], $update["esp"]["hwId"]);
            $this->insert($esp);
        }
    }
}
