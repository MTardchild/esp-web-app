<div class="componentTile" id="component<?php echo $component->getId(); ?>">
    <?php include 'SortIconsTemplate.php'; ?>
    <p>
        <b>Component:</b>
        <span style="display: block; float: right;">
            LED-Strip
        </span>
        <p id="ledParagraph<?php echo $component->getId(); ?>">
            <input name="color" type="hidden" class="colorInput" id="colorLedStrip<?php echo $component->getId(); ?>"
                   value="<?php echo sprintf("%02x%02x%02x", $component->getRed()/16, $component->getGreen()/16, $component->getBlue()/16 ); ?>">
            <button class="jscolor {
                valueElement:'colorLedStrip<?php echo $component->getId(); ?>',
                onFineChange:'DashboardController.setColor(<?php echo $component->getId(); ?>, this)',
                closable:true,closeText:'Close'
            }">
                Change Color
            </button>
        </p>
        <p>
            <span style="display: block; margin-bottom: 10px">
                Warm White
            </span>
            <input id="warmWhiteLedStrip<?php echo $component->getId(); ?>"
                   type="range"
                   style="width: 100%; margin: 0;" min="0" max="4080" step="1" value="<?php echo $component->getWarmWhite(); ?>"
                   onchange="DashboardController.setWarmWhite(<?php echo $component->getId(); ?>, this.value)" />
        </p>
</div>
