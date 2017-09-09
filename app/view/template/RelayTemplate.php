<div class="componentRow">
    <div class="componentTile" id="component<?php echo $component->getId(); ?>">
        <?php include 'SortIconsTemplate.php'; ?>
        <p>
            <b>Device:</b>
            <span style="display: block; float: right;">
                <?php echo $component->getName(); ?>
            </span>
            <p>
                <button class="<?php if ($component->getState() === true) { echo "relayOn"; } else { echo "relayOff"; } ?>"
                        onclick="DashboardController.toggleRelay(<?php echo $component->getId(); ?>)"
                        type="button">
                    Toggle
                </button>
            </p>
    </div>
</div>
