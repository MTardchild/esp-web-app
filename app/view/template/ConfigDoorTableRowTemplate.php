<?php
$doorCollection = $this->doorService->findAll();
foreach ($doorCollection as $door):
    ?>
    <tr>
        <td><?php echo $door->getId() ?></td>
        <td><?php echo $door->getName() ?></td>
        <td><?php echo $door->getRoom1()->getName() ?></td>
        <td><?php echo $door->getRoom2()->getName() ?></td>
    </tr>
<?php endforeach; ?>
