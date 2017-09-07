<?php include 'ConfigSubNavigationTemplate.php'; ?>
<div id="configViewEspTableView">
    <div class="configViewLeft">
        <table id="configTable">
            <thead>
                <tr>
                    <th>Identifier</th>
                    <th>Hardware Identifier</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Devices</th>
                    <th></th>
                </tr>
            </thead>
            <?php
            $espCollection = $this->espService->findAll();
            foreach ($espCollection as $esp):
            ?>
                <tr class="espRow" id="espRow<?php echo $esp->getId(); ?>">
                    <td class="droppable configEspTableIdColumn"><?php echo $esp->getId(); ?></td>
                    <td class="droppable configEspTableHwIdColumn"><?php echo $esp->getHwId(); ?></td>
                    <td class="droppable nameColumn"><?php echo $esp->getName(); ?></td>
                    <td class="droppable configEspTableLocationColumn"><?php echo $esp->getLocation()->getName(); ?></td>
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
                    <td align="right">
                        <button class="buttonUpdateWifi" id="buttonUpdateWifi<?php echo $esp->getHwId(); ?>">Update Wifi</button>
                    </td>
                </tr>
                <tr class="configDetail" id="configDetail<?php echo $esp->getId(); ?>">
                    <td colspan="6">
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
<div id="configViewWifiTableView" style="display:none;">
    <?php include 'ConfigWifiTableTemplate.php'; ?>
</div>
<div id="modifyLocationDialog" title="Modify Location" style="display:none;">
    <p>
        <div class="textboxModifyLocation">
            Id
            <input type="text" disabled>
        </div>
        <div class="textboxModifyLocation">
            Name
            <input type="text">
        </div>
    </p>
    <h4>Room</h4>
    <p>
    <div class="textboxModifyLocation">
        Id
        <input type="text" disabled>
    </div>
    <div class="textboxModifyLocation">
        Name
        <input type="text">
    </div>
    </p>
    <h4>Window</h4>
    <p>
    <div class="textboxModifyLocation">
        Id
        <input type="text" disabled>
    </div>
    <div class="textboxModifyLocation">
        Name
        <input type="text">
    </div>
    <div class="">
        Room
        <select>

        </select>
    </div>
    </p>
    <h4>Door</h4>
    <p>
    <div class="textboxModifyLocation">
        Id
        <input type="text" disabled>
    </div>
    <div class="textboxModifyLocation">
        Name
        <input type="text">
    </div>
    <div class="">
        Room
        <select>

        </select>
    </div>
    <div class="">
        Room
        <select>

        </select>
    </div>
    </p>
</div>