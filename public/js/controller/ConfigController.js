var ConfigController = {
    espList: {},
    windowList: {},
    doorList: {},
    roomList: {},
    locationList: {},
    requestConfigView: function () {
        $.get("?route=ajax&action=getConfigView",
            function (data, status) {
                var configView = $('#configView');
                var parsedContent = $('<div></div>');
                parsedContent.html(data);
                configView.html(parsedContent);
                ConfigController.addConfiguredEspRowHandlers();
                ConfigController.addLocationRowHandlers();
                ConfigController.addRoomRowHandlers();
                ConfigController.addDoorRowHandlers();
                ConfigController.addWindowRowHandlers();
                $('.configDetail').hide();
                $('.droppable').droppable({
                    over: function () {
                        $(this).parent('tr').children().addClass("droppableHover");
                        $(this).parent('tr').next().find('tr').children().addClass("droppableHover");
                    },
                    out: function () {
                        $(this).parent('tr').children().removeClass("droppableHover");
                        $(this).parent('tr').next().find('tr').children().removeClass("droppableHover");
                    },
                    drop: function (event, ui) {
                        $(this).parent('tr').children().removeClass("droppableHover");
                        $(this).parent('tr').next().find('tr').children().removeClass("droppableHover");
                        var regex = new RegExp('[0-9]');
                        var espId = event.target.parentElement.id;
                        espId = regex.exec(espId)[0];
                        var typeId = ui.draggable[0].id;
                        ConfigController.addComponent(espId, typeId);
                    }
                });

                $('#configDraggableContainer').children().draggable({revert: true, revertDuration: 250});

                ConfigController.makeEditable('.configEspTableNameColumn');
                $('.configEspTableNameColumn').keypress(function (event) {
                    if (event.originalEvent.keyCode === 13) {
                        event.stopPropagation();
                        $(this).blur();
                        var selectedEspId = $(this).parent(2).children().first().text();
                        var selectedEsp = ArrayUtility.findSingleLayerTwo(ConfigController.espList, "esp", "id", selectedEspId);
                        selectedEsp.name = $(this).text();
                        $.post("", {EspUpdate: JSON.stringify(selectedEsp)}).done(function (data) {
                        });
                    }
                });

                ConfigController.makeEditable('.configDoorTableNameColumn');
                $('.configDoorTableNameColumn').keypress(function (event) {
                    if (event.originalEvent.keyCode === 13) {
                        event.stopPropagation();
                        $(this).blur();
                        var selectedDoorId = $(this).parent(2).children().first().text();
                        var selectedDoor = ArrayUtility.findSingle(ConfigController.doorList, "id", selectedDoorId);
                        selectedDoor.name = $(this).text();
                        $.post("", {DoorUpdate: JSON.stringify(selectedDoor)}).done(function (data) {
                        });
                    }
                });

                $.get("?route=ajax&action=getAllEsp", function(data, status) {
                    ConfigController.espList = JSON.parse(data);
                });

                $.get("?route=ajax&action=getWindows", function(data, status) {
                    ConfigController.windowList = JSON.parse(data);
                });

                $.get("?route=ajax&action=getRooms", function(data, status) {
                    ConfigController.roomList = JSON.parse(data);
                });

                $.get("?route=ajax&action=getDoors", function(data, status) {
                    ConfigController.doorList = JSON.parse(data);
                });

                $.get("?route=ajax&action=getLocations", function(data, status) {
                    ConfigController.locationList = JSON.parse(data);
                });

                $('.configEspTableLocationColumn').click(
                  function (event) {
                        var modifiedEsp = ArrayUtility.findSingleLayerTwo(
                        ConfigController.espList, "esp", "id",
                        $(event.target).parent().id().split("espRow")[1]);

                        event.stopPropagation();
                        $('#modifyLocationDialog_Id').val(modifiedEsp.location.id);
                        $('#modifyLocationDialog_Name').val(modifiedEsp.location.name);
                        $('#modifyLocationDialog_Room_Id').val(modifiedEsp.location.room.id);
                        $('#modifyLocationDialog_Room_Name').val(modifiedEsp.location.room.name);
                        $('#modifyLocationDialog_Window_Id').val(modifiedEsp.location.window.id);
                        $('#modifyLocationDialog_Window_Name').val(modifiedEsp.location.window.name);
                        $('#modifyLocationDialog_Door_Id').val(modifiedEsp.location.door.id);
                        $('#modifyLocationDialog_Door_Name').val(modifiedEsp.location.door.name);
                        ConfigController.populateRoomSelect('#modifyLocationDialog_Room_Room');
                        if (modifiedEsp.location.window.room != null) {
                            ConfigController.selectId('#modifyLocationDialog_Room_Room', modifiedEsp.location.window.room.id);
                            $('#modifyLocationDialog_AddWindow').fadeOut();
                            $('#modifyLocationDialog_Window').fadeIn();
                        } else {
                            $('#modifyLocationDialog_Window').fadeOut();
                            $('#modifyLocationDialog_AddWindow').fadeIn();
                        }

                        ConfigController.populateRoomSelect('#modifyLocationDialog_Door_Room1');
                        if (modifiedEsp.location.door.room1 != null)
                            ConfigController.selectId('#modifyLocationDialog_Door_Room1', modifiedEsp.location.door.room1.id);
                        ConfigController.populateRoomSelect('#modifyLocationDialog_Door_Room2');
                        if (modifiedEsp.location.door.room2 != null)
                            ConfigController.selectId('#modifyLocationDialog_Door_Room2', modifiedEsp.location.door.room2.id);
                        $("#modifyLocationDialog").dialog({
                            resizable: false,
                            height: "auto",
                            width: 600,
                            modal: true,
                            buttons: {
                                "Update": function() {
                                    modifiedEsp.location.name = $('#modifyLocationDialog_Name').val();
                                    if (modifiedEsp.location.room != null)
                                        modifiedEsp.location.room.name = $('#modifyLocationDialog_Room_Name').val();
                                    if (modifiedEsp.location.window.room != null)
                                        modifiedEsp.location.window.room.id = $('#modifyLocationDialog_Room_Room').val();
                                    if (modifiedEsp.location.window != null)
                                        modifiedEsp.location.window.name = $('#modifyLocationDialog_Window_Name').val();
                                    if (modifiedEsp.location.door != null)
                                        modifiedEsp.location.door.name = $('#modifyLocationDialog_Door_Name').val();
                                    if (modifiedEsp.location.door.room1 != null)
                                        modifiedEsp.location.door.room1.id = $('#modifyLocationDialog_Door_Room1').val();
                                    if (modifiedEsp.location.door.room2 != null)
                                        modifiedEsp.location.door.room2.id = $('#modifyLocationDialog_Door_Room2').val();
                                    $('#configEspTableLocationColumn' + modifiedEsp.id).text(modifiedEsp.location.name);
                                    
                                    if (modifiedEsp.location.window != null) {
                                        $.post("", {WindowUpdate: JSON.stringify(modifiedEsp.location.window)}).done(function (data) {
                                            //console.log(data);
                                        });
                                    }

                                    if (modifiedEsp.location.door != null) {
                                        $.post("", {DoorUpdate: JSON.stringify(modifiedEsp.location.door)}).done(function (data) {
                                            //console.log(data);
                                        });
                                    }

                                    if (modifiedEsp.location.room != null) {
                                        $.post("", {RoomUpdate: JSON.stringify(modifiedEsp.location.room)}).done(function (data) {
                                            //console.log(data);
                                        });
                                    }

                                    $.post("", {LocationUpdate: JSON.stringify(modifiedEsp.location)}).done(function (data) {
                                        //console.log(data);
                                    });
                                    $(this).dialog("close");
                                },
                                Cancel: function() {
                                    $(this).dialog("close");
                                }
                            }
                        });
                    }
                );

                $('#configViewWifiTableRefreshButton').click(function () {
                    ConfigController.getWifiNetworks();
                });

                ConfigController.getFirmwares();
                ConfigController.getWifiNetworks();
            }
        );
    },
    selectId: function(selector, id) {
        $(selector).val(id);
    },
    populateRoomSelect: function(selector) {
        $(selector).empty();
        $.each(ConfigController.roomList, function (i, room) {
            $(selector).append($('<option>', {
                value: room.id,
                text : room.name
            }));
        });
    },
    makeEditable: function(selector) {
        $(selector).prop('contentEditable', true);
        $(selector).click(function (event) {
            event.stopPropagation();
        });
    },
    addComponent: function (espId, componentTypeId) {
        $.get("?route=ajax&action=addComponent&esp=" + espId + "&type=" + componentTypeId,
            function (data, status) {
                var component = JSON.parse(data);
                component.name = component.name == null ? "" : component.name;

                switch (component.typeId) {
                    case 1:
                        $('#espRow' + component.espId + ' .devices').append('<img height="30" class="component' + component.id + '" src="img/temperature.png" />');
                        $('#espRow' + component.espId).next().find('tbody').append(
                            '<tr class="component' + component.id + '">' +
                            '<td><img height="30" src="img/temperature.png"></td>' +
                            '<td>' + component.name + '</td>' +
                            '<td class="deleteIcon" align="right"><img height="20" class="component' + component.id + '" src="img/delete.png" onclick="ConfigController.removeComponent(' + component.id + ')"/></td>' +
                            '</tr>'
                        );
                        break;
                    case 2:
                        $('#espRow' + component.espId + ' .devices').append('<img height="30" class="component' + component.id + '" src="img/switch.png" />');
                        $('#espRow' + component.espId).next().find('tbody').append(
                            '<tr class="component' + component.id + '">' +
                            '<td><img height="30" src="img/switch.png"></td>' +
                            '<td>' + component.name + '</td>' +
                            '<td class="deleteIcon" align="right"><img height="20" src="img/delete.png" onclick="ConfigController.removeComponent(' + component.id + ')"/></td>' +
                            '</tr>'
                        );
                        break;
                    case 3:
                        $('#espRow' + component.espId + ' .devices').append('<img height="30" class="component' + component.id + '" src="img/ledStrip.png" />');
                        $('#espRow' + component.espId).next().find('tbody').append(
                            '<tr class="component' + component.id + '">' +
                            '<td><img height="30" src="img/ledStrip.png"></td>' +
                            '<td>' + component.name + '</td>' +
                            '<td class="deleteIcon" align="right"><img height="20" src="img/delete.png" onclick="ConfigController.removeComponent(' + component.id + ')"/></td>' +
                            '</tr>'
                        );
                        break;
                }

                DashboardController.onComponentAdded(component.espId, component.id);
            }
        );
    },
    removeComponent: function (componentId) {
        $.get("?route=ajax&action=removeComponent&id=" + componentId,
            function (data, status) {
                var component = JSON.parse(data);
                component.name = component.name == null ? "" : component.name;

                $('.component' + componentId).remove();
            });
    },
    addConfiguredEspRowHandlers: function () {
        var rows = $('#configTable').find('.espRow');
        for (i = 0; i < rows.length; i++) {
            var currentRow = rows[i];
            var createClickHandler =
                function (row) {
                    return function () {
                        var cell = row.getElementsByTagName("td")[0];
                        var id = cell.innerHTML;
                        $("#configDetail" + id).toggle(400);
                    };
                };

            currentRow.onclick = createClickHandler(currentRow);
        }
    },
    addDoorRowHandlers: function() {

    },
    addWindowRowHandlers: function() {

    },
    addLocationRowHandlers: function() {

    },
    addRoomRowHandlers: function() {

    },
    getFirmwares: function() {
        $.get("?route=ajax&action=getFirmwares",
            function (data, status) {
                var firmwares = JSON.parse(data);
                var dropdownFirmwares = $("#firmwareDropDown");
                dropdownFirmwares.empty();
                for (i = 0; i < firmwares.length; ++i) {
                    dropdownFirmwares.append(
                        "<option value=\"" + firmwares[i].id + "\">" + firmwares[i].path + "</option>");
                }
            }
        );
    },
    bindFlashButtons: function() {
        $('.buttonFlash').click(
            function (event) {
                event.stopPropagation();
                var espId = $(this)[0].id.split('buttonFlash')[1];
                $('#flashSelectedEsp').html(espId);
                $( "#flash-dialog-confirm" ).dialog({
                    resizable: false,
                    height: "auto",
                    width: 600,
                    modal: true,
                    buttons: {
                        "Flash": function() {
                            var firmwareId = $('#firmwareDropDown :selected')[0].value;
                            $.get("?route=ajax&action=flash&firmware=" + firmwareId + "&esp=" + espId,
                                function (data, status) {
                                    console.log(data);
                                });
                            $(this).dialog("close");
                        },
                        Cancel: function() {
                            $(this).dialog("close");
                        }
                    }
                });
            }
        );
    },
    bindUpdateWifiButtons: function () {
        $('.buttonUpdateWifi').click(
            function (event) {
                event.stopPropagation();
                var espId = $(this)[0].id.split('buttonUpdateWifi')[1];
                $('#updateWifiSelectedEsp').html(espId);
                $('#updateWifiDialogConfirm').dialog({
                    resizable: false,
                    height: "auto",
                    width: 600,
                    modal: true,
                    buttons: {
                        "Update": function() {
                            var ssid = ('#updateWifiSsid').val();
                            var password = ('#updateWifiPassword').val();
                            var wifiCredentials = {ssid: ssid, password: password};
                            $.post("", {WifiCredentials: JSON.stringify(wifiCredentials)}).done(function (data) {

                            });
                        },
                        Cancel: function() {
                            $(this).dialog("close");
                        }
                    }
                });
            }
        );
    },
    getWifiNetworks: function () {
        $.get("?route=ajax&action=getWifiNetworks",
            function (data, status) {
                var networks = JSON.parse(data);
                var dummy = JSON.parse('[["", "esp_hwidshitz", "mode", "channel", "rate", "signal", "random", "security"]]');
                ConfigController.addWifiRows(networks);
                ConfigController.addWifiRows(dummy);
                ConfigController.bindFlashButtons();
                ConfigController.bindUpdateWifiButtons();
            }
        );
    },
    addWifiRows: function(networks) {
        var tableBody = $('#configWifiTableBody');
        tableBody.empty();
        for (i = 0; i < networks.length; ++i) {
            var ssidTd = '<td>' + networks[i][1] + '</td>';
            var modeTd = '<td>' + networks[i][2] + '</td>';
            var channelTd = '<td>' + networks[i][3] + '</td>';
            var rateTd = '<td>' + networks[i][4] + '</td>';
            var signalTd = '<td>' + networks[i][5] + '</td>';
            var securityTd = '<td>' + networks[i][7] + '</td>';
            var buttonUpdateWifi = '<button class="buttonUpdateWifi" id="buttonUpdateWifi' + networks[i][1] + '">Update Wifi</button>';
            var buttonFlash = '<button class="buttonFlash" id="buttonFlash' + networks[i][1] + '">Flash</button>';
            var buttonsTd = '<td align="right">' + buttonUpdateWifi + buttonFlash + '</td>';
            var row = $('<tr>' + ssidTd + modeTd + channelTd + rateTd + signalTd + securityTd + buttonsTd + '</tr>');
            tableBody.append(row);
        }
    },
    navigateToEspTableView: function () {
        ConfigController.fadeIdIn('#configViewEspTableView');
    },
    navigateToWifiTableView: function () {
        ConfigController.fadeIdIn('#configViewWifiTableView');
    },
    navigateToRoomTableView: function () {
        ConfigController.fadeIdIn('#configViewRoomTableView');
    },
    navigateToDoorTableView: function() {
        ConfigController.fadeIdIn('#configViewDoorTableView');
    },
    navigateToLocationTableView: function() {
        ConfigController.fadeIdIn('#configViewLocationTableView');
    },
    navigateToWindowTableView: function() {
        ConfigController.fadeIdIn('#configViewWindowTableView');
    },
    fadeIdIn: function(id) {
        if ('#configViewWifiTableView' == id)
            $('#configViewWifiTableView').fadeIn(250);
        else
            $('#configViewWifiTableView').fadeOut(250);

        if ('#configViewEspTableView' == id)
            $('#configViewEspTableView').fadeIn(250);
        else
            $('#configViewEspTableView').fadeOut(250);

        if ('#configViewRoomTableView' == id)
            $('#configViewRoomTableView').fadeIn(250);
        else
            $('#configViewRoomTableView').fadeOut(250);

        if ('#configViewDoorTableView' == id)
            $('#configViewDoorTableView').fadeIn(250);
        else
            $('#configViewDoorTableView').fadeOut(250);

        if ('#configViewLocationTableView' == id)
            $('#configViewLocationTableView').fadeIn(250);
        else
            $('#configViewLocationTableView').fadeOut(250);

        if ('#configViewWindowTableView' == id)
            $('#configViewWindowTableView').fadeIn(250);
        else
            $('#configViewWindowTableView').fadeOut(250);
    }
};
