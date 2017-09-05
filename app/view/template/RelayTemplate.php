<?php foreach ($esp->getRelayCollection() as $relay): ?>
<div class="componentTile">
    <p>
        <b>Device:</b>
        <span style="display: block; float: right;">
            <?php echo $relay->getName(); ?>
        </span>
        <p>
            <button class="<?php if ($relay->getState() === true) { echo "relayOn"; } else { echo "relayOff"; } ?>"
                    onclick="DashboardController.toggleRelay(<?php echo $relay->getId(); ?>)"
                    type="button">
                Toggle
            </button>
        </p>
</div>
<?php endforeach ?>
