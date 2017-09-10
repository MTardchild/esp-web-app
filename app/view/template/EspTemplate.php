<?php
$i = 0;
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
            $componentOrder = json_decode($this->gridLayoutService->loadComponentOrder());

            for ($j = 0; $j < count($componentOrder[$i]); ++$j) {
                for ($k = 0; $k < count($componentOrder[$i][$j]); ++$k) {
                    echo '<div class="componentRow">';
                    for ($l = 0; $l < count($esp->getComponents()); ++$l) {
                        if ($esp->getComponents()[$l]->getId() == $componentOrder[$i][$j][$k]) {
                            $component = $esp->getComponents()[$l];
                            if ($component instanceof Dht) {
                                include 'DhtTemplate.php';
                            } elseif ($component instanceof Relay) {
                                include 'RelayTemplate.php';
                            } elseif ($component instanceof LedStrip) {
                                include 'LedStripTemplate.php';
                            }
                        }
                    }
                    echo '</div>';
                }
            }

            ?>
    </div>
<?php
++$i;
endforeach
?>