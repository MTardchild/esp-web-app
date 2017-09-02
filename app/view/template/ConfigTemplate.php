<div class="configViewLeft
">
    <table id="configTable">
        <thead>
        <tr>
            <th>ESP</th>
            <th>Location</th>
            <th>Devices</th>
        </tr>
        </thead>
        <?php
        $espCollection = $this->_espService->getAllEsp();
        foreach ($espCollection as $esp):
            ?>
            <tr class="espRow" id="espRow<?php echo $esp->getId(); ?>">
                <td><?php echo $esp->getName(); ?></td>
                <td><?php echo $esp->getLocation()->getName(); ?></td>
                <td ondrop="drop(event)"
                    ondragover="onDragOver(event)"
                    ondragenter="enterDropArea(event)"
                    ondragleave="leaveDropArea(event)">
                    <?php
                    foreach ($esp->getComponents() as $component) {
                        echo $component->getTypeId();
                    }
                    ?>
                </td>
            </tr>
            <tr class="configDetail" id="configDetail<?php echo $esp->getName(); ?>">
                <td colspan="4">
                    <table>
                        <?php foreach ($esp->getComponents() as $component): ?>
                            <tr>
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
<div class="configViewRight">
    <?php
    $componentCollection = $this->_componentTypeService->findAll();
    foreach ($componentCollection as $component):
    ?>
    <div ondragstart="drag(event)"
         draggable="true"
         id="<?php echo $component->getId(); ?>"
         class="draggableComponent"><?php echo $component->getName(); ?></div>
    <?php endforeach ?>
</div>
