var ConfigController = {
    espList: {},
    windowList: {},
    doorList: {},
    roomList: {},
    locationList: {},
    firmwareList: {},
    requestConfigView: function () {
        $.get("?route=ajax&action=getConfigView",
            function (data, status) {
                var configView = $('#configView');
                var parsedContent = $('<div></div>');
                parsedContent.html(data);
                configView.html(parsedContent);
                ConfiguredEspConfigurationController.addConfiguredEspRowHandlers();
                $('.configDetail').hide();

                ConfiguredEspConfigurationController.initializeDragDrop();
                ConfigController.makeAllEditable();
                ConfigController.getData();
                ConfigController.initializeModifyLocationPopup();
                ConfigController.getFirmwares();
                UnconfiguredEspConfigurationController.getWifiNetworks();

                $('#configViewWifiTableRefreshButton').click(function () {
                    UnconfiguredEspConfigurationController.getWifiNetworks();
                });
            }
        );
    },
    initializeModifyLocationPopup: function() {
        $('.configEspTableLocationColumn').click(
          function (event) {
                event.stopPropagation();
                var modifiedEsp = ArrayUtility.findSingleLayerTwo(
                ConfigController.espList, "esp", "id",
                $(event.target).parent().id().split("espRow")[1]);
                ConfigController.initializeModifyLocationPopupFields(modifiedEsp);

                $("#modifyLocationDialog").dialog({
                    resizable: false,
                    height: "auto",
                    width: 600,
                    modal: true,
                    buttons: {
                        "Update": function() {
                            ConfigController.updateLocation(modifiedEsp);
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
    initializeModifyLocationPopupFields: function(modifiedEsp) {
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
    },
    updateLocation: function(modifiedEsp) {
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
    },
    getData: function() {
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

        $.get("?route=ajax&action=getFirmwares", function(data, status) {
            ConfigController.firmwareList = JSON.parse(data);
        });
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
    makeAllEditable: function() {
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
    },
    makeEditable: function(selector) {
        $(selector).prop('contentEditable', true);
        $(selector).click(function (event) {
            event.stopPropagation();
        });
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
};
