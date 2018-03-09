<?php

class ConfigurationService
{
    private $configurator;
    private $espService;
    private $locationService;
    private $componentService;

    public function __construct(Configurator $configurator,
                                EspService $espService,
                                LocationService $locationService,
                                ComponentService $componentService)
    {
        $this->configurator = $configurator;
        $this->espService = $espService;
        $this->locationService = $locationService;
        $this->componentService = $componentService;
    }

    public function getComponentService(): ComponentService
    {
        return $this->componentService;
    }

    public function setComponentService(ComponentService $componentService): void
    {
        $this->componentService = $componentService;
    }

    public function getLocationService(): LocationService
    {
        return $this->locationService;
    }

    public function setLocationService(LocationService $locationService): void
    {
        $this->locationService = $locationService;
    }

    public function getEspService(): EspService
    {
        return $this->espService;
    }

    public function setEspService(EspService $espService): void
    {
        $this->espService = $espService;
    }

    public function getConfigurator(): Configurator
    {
        return $this->configurator;
    }

    public function setConfigurator(Configurator $configurator): void
    {
        $this->configurator = $configurator;
    }

    public function getWifiNetworks()
    {
        return $this->configurator->getWifiNetworks();
    }

    public function flash(FlashCommand $command)
    {
        return $this->configurator->flash($command);
    }

    public function configure($config)
    {
        $config = json_decode($config, true);
        $esp = Esp::createEspEmpty();
        $esp->setId($this->espService->findFreeId());
        $esp->setIp($config["ip"]);
        $esp->setName($config["name"]);
        $esp->setHwId($config["hardwareId"]);
        $esp->setLocation($this->locationService->find($config["locationId"]));
        $esp->setComponents($this->getComponents($config["components"], $esp->getId()));
        $this->espService->insert($esp);
        $espConfig = new EspConfig($esp);
        return $this->configurator->configure(new ConfigureCommand($espConfig, $this->getServerIp()));
    }

    public function configureWifi(Esp $esp, $ssid, $password)
    {
        return $this->configurator->configureWifi($esp, $ssid, $password);
    }

    public function getServerIp()
    {
        $ipConfig = shell_exec("ip address");
        $ipConfigRows = preg_split('(\r\n|\r|\n)', $ipConfig);
        foreach ($ipConfigRows as $row) {
            if (strpos($row, 'inet ')) {
                if (!strpos($row, '127.0.0.1'))
                    $ip = (substr($row, 9, strpos($row, '/') - 9));
            }
        }

        return $ip;
    }

    private function getComponents($componentsJson, $espId): array
    {
        $components = array();
        foreach ($componentsJson as $i => $component) {
            $component = ComponentBase::create($this->componentService->findFreeId() + $i,
                "", $espId, $component["typeId"]);
            array_push($components, $component);
        }

        var_dump($components);

        return $components;
    }
}