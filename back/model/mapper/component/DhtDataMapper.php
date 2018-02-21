<?php
//namespace App\Model\Mapper;

class DhtDataMapper implements IDatabaseMapper
{
    private $database;

    public function __construct(PDO $database)
    {
        $this->database = $database;
    }

    public function insert($dht)
    {
        $isSuccessful = false;

        if ($dht instanceof Dht) {
            $freeId = $this->findFreeId();
            $temperature = $dht->getTemperature();
            $humidity = $dht->getHumidity();
            $componentId = $dht->getId();

            $query = $this->database->prepare('INSERT INTO component_data_dht VALUES (:id, :temperature, :humidity, NOW(), :component);');
            $query->bindValue(':id', $freeId, PDO::PARAM_STR);
            $query->bindValue(':temperature', $temperature, PDO::PARAM_STR);
            $query->bindValue(':humidity', $humidity, PDO::PARAM_STR);
            $query->bindValue(':component', $componentId, PDO::PARAM_STR);
            $query->execute();
        }

        return $isSuccessful;
    }

    public function delete($dhtDataId)
    {
        $query = $this->database->prepare("DELETE FROM dht_data WHERE dda_id = :id");
        $isSuccessful = $query->execute(array("id" => $dhtDataId));

        return $isSuccessful;
    }

    public function findLatestDataset($dhtId)
    {
        $dhtId = intval($dhtId);
        $query = $this->database->prepare("SELECT cddQ1.cdd_id, cddQ1.cdd_temperature, cddQ1.cdd_humidity, component.cmp_name, component.cmp_type, component.cmp_esp FROM component_data_dht cddQ1 INNER JOIN component ON cddQ1.cdd_component = component.cmp_id WHERE cddQ1.cdd_component = :dhtId AND cddQ1.cdd_timestamp = (SELECT MAX(cddQ2.cdd_timestamp) FROM component_data_dht cddQ2 WHERE cddQ2.cdd_component = cddQ1.cdd_component)");
        $query->execute(array("dhtId" => $dhtId));
        $dhtDb = $query->fetch();
        $dhtDomain = Dht::createDht($dhtId,
            $dhtDb["cdd_temperature"],
            $dhtDb["cdd_humidity"],
            $dhtDb["cmp_name"],
            $dhtDb["cmp_esp"]);

        return $dhtDomain;
    }

    public function findCollectionCurrentDay($espId)
    {
        $espId = intval($espId);
    }

    private function findFreeId()
    {
        $query = $this->database->prepare("SELECT MAX(component_data_dht.cdd_id) AS cdd_id FROM component_data_dht;");
        $query->execute();
        $highestIndexDb = $query->fetch();

        return intval($highestIndexDb['cdd_id']) + 1;
    }
}