<div class="componentTile" id="component<?php echo $component->getId(); ?>">
    <?php include 'SortIconsTemplate.php'; ?>
    <p>
        <b>Component:</b>
        <span style="display: block; float: right;">
    <img src="img/temperature.png" height="30px"/> <?php $component->getName(); ?>
</span>
    <p>
        <b>Temperature:</b>
        <span style="display: block; float: right;">
        <?php echo $component->getTemperature(); ?>
    </span>
        <br>
        <b>Humidity:</b>
        <span style="display: block; float: right;">
        <?php echo $component->getHumidity(); ?>
    </span>
    </p>
</div>