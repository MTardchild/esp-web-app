<?php
$i = 1;
$espCollection = $this->espService->findAll();
?>
<?php foreach ($espCollection as $esp): ?>
    <div class="grid-stack-item-content" id="esp<?php echo $esp->getId() ?>">
        <p class="espInfo">
            <b>Esp:</b>
            <span style="display: block; float: right;">
                <?php
                echo $esp->getName();
                ?>
            </span>
            <br>
            <b>Room:</b>
            <span style="display: block; float: right;">
                <?php echo $esp->getLocation()->getRoom()->getName(); ?>
            </span>
        </p>
        <br>
            <?php
            include 'DhtTemplate.php';
            include 'RelayTemplate.php';
            include 'LedStripTemplate.php';
            ?>
    </div>
<?php endforeach ?>