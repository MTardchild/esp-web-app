<?php include 'ConfigSubNavigationTemplate.php'; ?>
<div id="configViewEspTableView" style="opacity: 100">
    <div class="configViewLeft">
        <table id="configTable">
            <thead>
            <tr>
                <th>Identifier</th>
                <th>ESP</th>
                <th>Location</th>
                <th>Devices</th>
            </tr>
            </thead>
            <?php
            $espCollection = $this->espService->findAll();
            foreach ($espCollection as $esp):
                ?>
                <tr class="espRow" id="espRow<?php echo $esp->getId(); ?>">
                    <td class="droppable"><?php echo $esp->getId(); ?></td>
                    <td class="droppable nameColumn"><?php echo $esp->getName(); ?></td>
                    <td class="droppable"><?php echo $esp->getLocation()->getName(); ?></td>
                    <td class="droppable devices">
                        <?php
                        foreach ($esp->getComponents() as $component) {
                            switch ($component->getTypeId()) {
                                case 1:
                                    echo "<img height='30' src='img/temperature.png' class='component" . $component->getId() . "' />";
                                    break;
                                case 2:
                                    echo "<img height='30' src='img/switch.png' class='component" . $component->getId() . "' />";
                                    break;
                                case 3:
                                    echo "<img height='30' src='img/ledStrip.png' class='component" . $component->getId() . "' />";
                                    break;
                            }
                        }
                        ?>
                    </td>
                </tr>
                <tr class="configDetail" id="configDetail<?php echo $esp->getId(); ?>">
                    <td colspan="4">
                        <table>
                            <thead>
                            <tr>
                                <th>Type</th>
                                <th>Name</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <?php foreach ($esp->getComponents() as $component): ?>
                                <tr class="component<?php echo $component->getId(); ?>">
                                    <td>
                                        <?php
                                        switch ($component->getTypeId()) {
                                            case 1:
                                                echo "<img height='30' src='img/temperature.png'>";
                                                break;
                                            case 2:
                                                echo "<img height='30' src='img/switch.png'>";
                                                break;
                                            case 3:
                                                echo "<img height='30' src='img/ledStrip.png'>";
                                                break;
                                        }
                                        ?>
                                    </td>
                                    <td>
                                        <?php echo $component->getName(); ?>
                                    </td>
                                    <td class="deleteIcon" align="right">
                                        <img height="20" src="img/delete.png"
                                             onclick="ConfigController.removeComponent(<?php echo $component->getId(); ?>)"/>
                                    </td>
                                </tr>
                            <?php endforeach ?>
                            </tbody>
                        </table>
                    </td>
                </tr>
            <?php endforeach ?>
        </table>
    </div>
    <div id="configDraggableContainer" class="configViewRight">
        <?php
        $componentCollection = $this->componentTypeService->findAll();
        foreach ($componentCollection as $component):
            ?>
            <div id="<?php echo $component->getId(); ?>"
                 class="draggableComponent <?php echo $component->getName(); ?>"></div>
        <?php endforeach ?>
    </div>
</div>
<div id="configViewWifiTableView" style="opacity: 100">
    <?php include 'ConfigWifiTableTemplate.php'; ?>
</div>
