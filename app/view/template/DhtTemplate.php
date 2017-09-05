<?php foreach ($esp->getDhtCollection() as $dht): ?>
<div class="componentTile">
    <?php include 'SortIconsTemplate.php'; ?>
    <p>
        <b>Component:</b>
        <span style="display: block; float: right;">
            DHT22
        </span>
        <p>
            <b>Temperature:</b>
            <span style="display: block; float: right;">
                <?php echo $dht->getTemperature(); ?>
            </span>
            <br>
            <b>Humidity:</b>
            <span style="display: block; float: right;">
                <?php echo $dht->getHumidity(); ?>
            </span>
        </p>
</div>
<?php endforeach ?>
