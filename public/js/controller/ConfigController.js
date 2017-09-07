var ConfigController = {
    requestConfigView: function () {
        $.get("?route=ajax&action=getConfigView",
            function (data, status) {
                var configView = $('#configView');
                var parsedContent = $('<div></div>');
                parsedContent.html(data);
                configView.html(parsedContent);
                ConfigController.addRowHandlers();
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

                $('#configDraggableContainer').children().draggable({revert: true});

                $('.nameColumn').prop('contentEditable', true);
                $('.nameColumn').keypress(function (event) {
                    if (event.originalEvent.keyCode === 13) {
                        event.stopPropagation();
                        $(this).blur();
                    }
                });
                $('.nameColumn').click(function (event) {
                    event.stopPropagation();
                });

                ConfigController.getWifiNetworks();
            }
        );
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
    addRowHandlers: function () {
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
    getWifiNetworks: function () {
        $.get("?route=ajax&action=getWifiNetworks", function (data, status) {
            var networks = JSON.parse(data);
            var dummy = JSON.parse('[["", "esp_hwidshitz", "mode", "channel", "rate", "signal", "random", "security"]]');
            ConfigController.addWifiRows(dummy);
            ConfigController.addWifiRows(networks);
            $.get("?route=ajax&action=getFirmwares",
                function (data, status) {
                    var firmwares = JSON.parse(data);
                    for (i = 0; i < firmwares.length; ++i) {
                        $("#firmwareDropDown").append(
                            "<option value=\"" + firmwares[i].id + "\">" + firmwares[i].path + "</option>");
                    }
                });

            $('.buttonFlash').click(function (event) {
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
            });

            $('.configEspTableLocationColumn').click(function (event) {
                event.stopPropagation();
                $('#modifyLocationDialog').dialog({
                    resizable: false,
                    height: "auto",
                    width: 600,
                    modal: true,
                    buttons: {
                        "Flash": function() {
                            $(this).dialog("close");
                        },
                        Cancel: function() {
                            $(this).dialog("close");
                        }
                    }
                });
            });

            $('.buttonUpdateWifi').click(function (event) {
                event.stopPropagation();
                var espId = $(this)[0].id.split('buttonUpdateWifi')[1];
                $('#updateWifiSelectedEsp').html(espId);
                $( "#updateWifiDialogConfirm" ).dialog({
                    resizable: false,
                    height: "auto",
                    width: 600,
                    modal: true,
                    buttons: {
                        "Update": function() {
                            $(this).dialog("close");
                        },
                        Cancel: function() {
                            $(this).dialog("close");
                        }
                    }
                });
            });
        });
    },
    addWifiRows: function(networks) {
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
            // $('#configWifiTableBody').append(row);
        }
    },
    navigateToEspTableView: function () {
        $('#configViewEspTableView').fadeIn(250);
        $('#configViewWifiTableView').fadeOut(250);
    },
    navigateToWifiTableView: function () {
        $('#configViewEspTableView').fadeOut(250);
        $('#configViewWifiTableView').fadeIn(250);
    }
};