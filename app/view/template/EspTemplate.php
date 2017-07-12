<div class="gridster">
    <ul>
        <?php $i = 1 ?>
        <?php foreach ($this->_espCollection as $esp): ?>
            <li data-row="1" data-col="<?php echo $i; $i++; ?>" data-sizex="1" data-sizey="2">
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
                <?php
                include 'DhtTemplate.php';
                include 'RelayTemplate.php';
                include 'LedStripTemplate.php';
                ?>
            </li>
        <?php endforeach ?>
    </ul>
</div>