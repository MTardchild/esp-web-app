<?php include 'ConfigSubNavigationTemplate.php'; ?>
<div id="configViewEspTableView">
    <div class="configViewLeft">
        <?php include 'ConfigEspTable.php' ?>
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
    <?php include 'ConfigWifiTableButtonTemplate.php' ?>
</div>
<div id="modifyLocationDialog" title="Modify Location" style="display:none;">
    <div style="display: flex">
        <div class="inputWrapper idInput">
            Id
            <input id="modifyLocationDialog_Id" type="text" disabled>
        </div>
        <div class="inputWrapper">
            Name
            <input id="modifyLocationDialog_Name" type="text">
        </div>
    </div>
    <h4>Room</h4>
    <div style="display: flex">
        <div class="inputWrapper idInput">
            Id
            <input id="modifyLocationDialog_Room_Id" type="text" disabled>
        </div>
        <div class="inputWrapper">
            Name
            <input id="modifyLocationDialog_Room_Name" type="text">
        </div>
    </div>
    <h4>Window</h4>
    <div style="display: flex">
        <div class="inputWrapper idInput">
            Id
            <input id="modifyLocationDialog_Window_Id" type="text" disabled>
        </div>
        <div class="inputWrapper">
            Name
            <input id="modifyLocationDialog_Window_Id" type="text">
        </div>
        <div class="inputWrapper">
            Room
            <select  id="modifyLocationDialog_Room_Room">

            </select>
        </div>
    </div>
    <h4>Door</h4>
    <div style="display: flex">
        <div class="inputWrapper idInput">
            Id
            <input id="modifyLocationDialog_Door_Id" type="text" disabled>
        </div>
        <div class="inputWrapper">
            Name
            <input id="modifyLocationDialog_Door_Id" type="text">
        </div>
        <div class="inputWrapper">
            Room
            <select id="modifyLocationDialog_Door_Room1">
            </select>
        </div>
        <div class="inputWrapper">
            Room
            <select id="modifyLocationDialog_Door_Room2">

            </select>
        </div>
    </div>
</div>
