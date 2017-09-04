<div class="configViewLeft">
    <table id="configTable">
        <thead>
        <tr>
            <th>ESP</th>
            <th>Location</th>
            <th>Devices</th>
        </tr>
        </thead>
        <?php
        $espCollection = $this->espService->getAllEsp();
        foreach ($espCollection as $esp):
            ?>
            <tr class="espRow" id="espRow<?php echo $esp->getId(); ?>">
                <td class="droppable"><?php echo $esp->getName(); ?></td>
                <td class="droppable"><?php echo $esp->getLocation()->getName(); ?></td>
                <td class="droppable">
                    <?php
                    foreach ($esp->getComponents() as $component) {
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
                    }
                    ?>
                </td>
            </tr>
            <tr class="configDetail" id="configDetail<?php echo $esp->getName(); ?>">
                <td colspan="4">
                    <table>
                        <thead>
                        <tr>
                            <th>Type</th>
                            <th>Name</th>
                        </tr>
                        </thead>
                        <?php foreach ($esp->getComponents() as $component): ?>
                            <tr>
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
                            </tr>
                        <?php endforeach ?>
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
