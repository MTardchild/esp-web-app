<?php
$locationCollection = $this->locationService->findAll();
foreach ($locationCollection as $location):
    ?>
    <tr>
        <td><?php echo $location->getId() ?></td>
        <td><?php echo $location->getName() ?></td>
        <td><?php echo $location->getRoom()->getName() ?></td>
        <td><?php echo $location->getDoor()->getName() ?></td>
        <td><?php echo $location->getWindow()->getName() ?></td>
    </tr>
<?php endforeach; ?>
