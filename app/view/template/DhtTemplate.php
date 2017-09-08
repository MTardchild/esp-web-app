<?php foreach ($esp->getDhtCollection() as $dht): ?>
<div class="componentRow">
    <div class="componentTile" id="component<?php echo $dht->getId(); ?>">
        <?php include 'SortIconsTemplate.php'; ?>
        <p>
            <b>Component:</b>
            <span style="display: block; float: right;">
        <img src="img/temperature.png" height="30px"/> <?php $dht->getName(); ?>
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
</div>
<?php endforeach ?>
