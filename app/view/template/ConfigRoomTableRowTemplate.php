<?php
$roomCollection = $this->roomService->findAll();
foreach ($roomCollection as $room):
    ?>
    <tr>
        <td><?php echo $room->getId() ?></td>
        <td><?php echo $room->getName() ?></td>
    </tr>
<?php endforeach; ?>
