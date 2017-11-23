<?php
$windowCollection = $this->windowService->findAll();
foreach ($windowCollection as $window):
    ?>
    <tr>
        <td><?php echo $window->getId() ?></td>
        <td><?php echo $window->getName() ?></td>
        <td><?php echo $window->getRoom()->getName() ?></td>
    </tr>
<?php endforeach; ?>
