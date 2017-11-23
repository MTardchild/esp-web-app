<?php
$wifiCollection = $this->configurationService->getWifiNetworks();
foreach ($wifiCollection as $wifi):
    ?>
    <tr>
        <td>$wifi[1]</td>
        <td>$wifi[2]</td>
        <td>$wifi[3]</td>
        <td>$wifi[4]</td>
        <td>$wifi[5]</td>
        <td>$wifi[7]</td>
        <td align="right">
            <button class="buttonUpdateWifi" id="buttonUpdateWifi<?php echo $wifi[1] ?>">Update Wifi</button>
            <button class="buttonFlash" id="buttonFlash<?php echo $wifi[1] ?>">Flash</button>
        </td>
    </tr>
<?php endforeach; ?>