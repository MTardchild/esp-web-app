<?php
//namespace App\Model\Mapper;

class RelayDataMapper implements IDatabaseMapper {
    private $database;

    public function __construct(PDO $database) {
        $this->database = $database;
    }

    public function insert($relay) {
        $isSuccessful = false;

        if ($relay instanceof Relay) {
            $unusedIndex = $this->getUnusedIndex();
            $query = $this->database->prepare("INSERT INTO component_data_relay VALUES (:id, :state, NOW(), :component);");
            $isSuccessful = $query->execute(array(  'id' => $unusedIndex,
                                                    'state' => $relay->getState(),
                                                    'component' => $relay->getId()));
        }

        return $isSuccessful;
    }

    public function delete($relayId) {
         $query = $this->database->prepare("DELETE FROM component_data_relay WHERE component_data_relay.cdr_id = :id");
         $isSuccessful = $query->execute(array("id" => $relayId));

         return $isSuccessful;
    }

    public function findLatestDataSet($relayId) {
        $relayId = intval($relayId);
        $query = $this->database->prepare("SELECT cdrQ1.cdr_state, component.cmp_name, component.cmp_type, component.cmp_esp FROM component_data_relay cdrQ1 INNER JOIN component ON cdrQ1.cdr_component = component.cmp_id WHERE cdrQ1.cdr_component = :relayId AND cdrQ1.cdr_timestamp = (SELECT MAX(cdrQ2.cdr_timestamp) FROM component_data_relay cdrQ2 WHERE cdrQ2.cdr_component = cdrQ1.cdr_component)");
        $query->execute(array("relayId" => $relayId));
        $relayDb = $query->fetch();
        $relay = Relay::createRelay($relayId, $relayDb['cmp_name'], $relayDb['cdr_state'], $relayDb['cmp_esp']);
        return $relay;
    }

    public function findCollectionCurrentDay($relayId) {
        $relayId = intval($relayId);
    }

    private function getUnusedIndex() {
        $query = $this->database->prepare("SELECT MAX(component_data_relay.cdr_id) AS cdr_id FROM component_data_relay;");
        $query->execute();
        $highestIndexDb = $query->fetch();

        return intval($highestIndexDb['cdr_id']) + 1;
    }
}

