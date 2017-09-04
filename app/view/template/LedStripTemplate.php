<?php foreach ($esp->getLedStripCollection() as $ledStrip): ?>
    <div class="componentTile">
        <p>
            <b>Component:</b>
            <span style="display: block; float: right;">
                LED-Strip
            </span>
            <p id="ledParagraph<?php echo $ledStrip->getId(); ?>">
                <input name="color" type="hidden" class="colorInput" id="colorLedStrip<?php echo $ledStrip->getId(); ?>"
                       value="<?php echo sprintf("%02x%02x%02x", $ledStrip->getRed()/16, $ledStrip->getGreen()/16, $ledStrip->getBlue()/16 ); ?>">
                <button class="jscolor {
                    valueElement:'colorLedStrip<?php echo $ledStrip->getId(); ?>',
                    onFineChange:'setColor(<?php echo $ledStrip->getId(); ?>, this)',
                    closable:true,closeText:'Close'
                }">
                    Change Color
                </button>
            </p>
            <p>
                <span style="display: block; margin-bottom: 10px">
                    Warm White
                </span>
                <input id="warmWhiteLedStrip<?php echo $ledStrip->getId(); ?>"
                       type="range"
                       style="width: 100%; margin: 0;" min="0" max="4080" step="1" value="<?php echo $ledStrip->getWarmWhite(); ?>"
                       onchange="setWarmWhite(<?php echo $ledStrip->getId(); ?>, this.value)" />
            </p>
    </div>
<?php endforeach ?>
