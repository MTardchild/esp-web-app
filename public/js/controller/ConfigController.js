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
                    }
                });
                $('.nameColumn').click(function (event) {
                    event.stopPropagation();
                    console.log(event);
                });

                ConfigController.getWifiNetworks();
                ConfigController.navigateToEspTableView();
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
            var dummy = JSON.parse('[["", "ssid", "mode", "channel", "rate", "signal", "random", "security"]]');
            ConfigController.addWifiRows(dummy);
            ConfigController.addWifiRows(networks);

            $('.buttonFlash').click(function () {
                console.log($(this)[0].id);
                $('#flashSelectedEsp').html($(this)[0].id.split('buttonFlash')[1]);
                $( "#flash-dialog-confirm" ).dialog({
                    resizable: false,
                    height: "auto",
                    width: 600,
                    modal: true,
                    buttons: {
                        "Flash": function() {
                            $( this ).dialog( "close" );
                        },
                        Cancel: function() {
                            $( this ).dialog( "close" );
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
            var flashTd = '<td><button class="buttonFlash" id="buttonFlash' + networks[i][1] + '">Flash</button><td>';
            var row = $('<tr>' + ssidTd + modeTd + channelTd + rateTd + signalTd + securityTd + flashTd + '</tr>');
            $('#configWifiTableBody').append(row);
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