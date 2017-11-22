<?php
$doorCollection = $this->doorService->findAll();
foreach ($doorCollection as $door):
    ?>
    <tr>
        <td class="configDoorTableIdColumn"><?php echo $door->getId() ?></td>
        <td class="configDoorTableNameColumn"><?php echo $door->getName() ?></td>
        <td class="configDoorTableRoom1Column"><?php echo $door->getRoom1()->getName() ?></td>
        <td class="configDoorTableRoom2Column"><?php echo $door->getRoom2()->getName() ?></td>
    </tr>
<?php endforeach; ?>
