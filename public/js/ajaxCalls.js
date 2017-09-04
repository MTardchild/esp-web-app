var lastUdpSend = Date.now();

function toggleRelay(componentId) {
    $.get("?route=ajax&action=toggleRelay&id=" + componentId,
        onAjaxResponse);

    $('.toastMessage').text("Trying to toggle relay with identifier " + componentId + ".");
    $('.toastMessage').stop().fadeIn(400).delay(3000).fadeOut(400);
}

function onAjaxResponse(data, status) {
    $('.toastMessage').text(data);
    $('.toastMessage').stop().fadeIn(400).delay(3000).fadeOut(400);
}

function setWarmWhite(componentId, warmWhite) {
    $.get("?route=ajax&action=setWarmWhite&id=" + componentId + "&ww=" + warmWhite,
        onAjaxResponse);

    $('.toastMessage').text("Sent warm white value to led strip with ID " + componentId + ".");
    $('.toastMessage').stop().fadeIn(400).delay(3000).fadeOut(400);
}

function setColor(componentId, color) {
    var cleanRgb = hsvToRgb(color.hsv[0], color.hsv[1], color.hsv[2]);

    $.get("?route=ajax&action=setColor&id=" + componentId + "&r="
        + cleanRgb.r + "&g=" + cleanRgb.g + "&b=" + cleanRgb.b,
        onAjaxResponse);

    $('.toastMessage').text("Sent color value to led strip with ID " + componentId + ".");
    $('.toastMessage').stop().fadeIn(400).delay(3000).fadeOut(400);
}

function setColorUdp(componentId, color) {
    if (lastUdpSend + 200 < Date.now()) {
        lastUdpSend = Date.now();

        var cleanRgb = hsvToRgb(color.hsv[0], color.hsv[1], color.hsv[2]);
        var ww = $('#warmWhiteLedStrip' + componentId)[0].value;

        console.log(cleanRgb);

        $.get("?route=ajax&action=setColorUdp&id=" + componentId + "&r="
            + cleanRgb.r + "&g=" + cleanRgb.g + "&b=" + cleanRgb.b + "&ww=" + ww,
            onAjaxResponse);
    }
}

function requestDashboardGrid() {
    $.get("?route=ajax&action=getDashboardView",
        function (data, status) {
            var grid = $('.grid-stack').data('gridstack');
            var parsedContent = $('<div></div>');
            parsedContent.html(data);

            var espTiles = $('.grid-stack-item-content', parsedContent);
            $.get("?route=ajax&action=getGridLayout",
                function (data, status) {
                    var gridLayout = GridStackUI.Utils.sort(JSON.parse(data));

                    for (var i = 0; i < espTiles.length; ++i) {
                        var espTile = $('<div></div>');
                        espTile.html(espTiles[i]);
                        var id = espTile[0].firstChild.id;
                        var oldTile = $('#' + id);

                        if (oldTile.exists()) {
                            oldTile = oldTile[0].parentElement;
                            var attributes = oldTile.attributes;
                            grid.removeWidget(oldTile);
                            grid.addWidget(espTile, gridLayout[i].x,
                                gridLayout[i].y, gridLayout[i].width,
                                gridLayout[i].height);
                        } else {
                            grid.addWidget(espTile,
                                gridLayout[i].x, gridLayout[i].y,
                                gridLayout[i].width, gridLayout[i].height,
                                false);
                        }
                    }

                    jscolor.installByClassName("jscolor");
                    $('.grid-stack').off('change');
                    $('.grid-stack').on('change', function(event, items) {
                        saveGrid();
                    });
                }
            );
        }
    );
}

function requestConfigView() {
    $.get("?route=ajax&action=getConfigView",
        function (data, status) {
            var configView = $('#configView');
            var parsedContent = $('<div></div>');
            parsedContent.html(data);
            configView.html(parsedContent);
            addRowHandlers();
            $('.configDetail').hide();
            $('.droppable').droppable({
                over: function () {
                    $(this).parent('tr').children().addClass("droppableHover");
                    $(this).parent('tr').next().find('tr').children().addClass("droppableHover");
                },
                out: function() {
                    $(this).parent('tr').children().removeClass("droppableHover");
                    $(this).parent('tr').next().find('tr').children().removeClass("droppableHover");
                },
                drop: function(event, ui) {
                    $(this).parent('tr').children().removeClass("droppableHover");
                    $(this).parent('tr').next().find('tr').children().removeClass("droppableHover");
                    var regex = new RegExp('[0-9]');
                    var espId = event.target.parentElement.id;
                    espId = regex.exec(espId)[0];
                    var typeId = ui.draggable[0].id;
                    addComponent(espId, typeId);
                }
            });

            $('#configDraggableContainer').children().draggable({revert: true});

            $('.nameColumn').prop('contentEditable', true);
            $('.nameColumn').keypress(function(event){
                if (event.originalEvent.keyCode === 13) {
                    event.stopPropagation();
                }
            });
            $('.nameColumn').click(function (event) {
                event.stopPropagation();
                console.log(event);
            });
        }
    );
}

function addComponent(espId, componentTypeId) {
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
                        '<td class="deleteIcon" align="right"><img height="20" class="component' + component.id + '" src="img/delete.png" onclick="removeComponent(' + component.id + ')"/></td>' +
                        '</tr>'
                    );
                    break;
                case 2:
                    $('#espRow' + component.espId + ' .devices').append('<img height="30" class="component' + component.id + '" src="img/switch.png" />');
                    $('#espRow' + component.espId).next().find('tbody').append(
                        '<tr class="component' + component.id + '">' +
                        '<td><img height="30" src="img/switch.png"></td>' +
                        '<td>' + component.name + '</td>' +
                        '<td class="deleteIcon" align="right"><img height="20" src="img/delete.png" onclick="removeComponent(' + component.id + ')"/></td>' +
                        '</tr>'
                    );
                    break;
                case 3:
                    $('#espRow' + component.espId + ' .devices').append('<img height="30" class="component' + component.id + '" src="img/ledStrip.png" />');
                    $('#espRow' + component.espId).next().find('tbody').append(
                        '<tr class="component' + component.id + '">' +
                        '<td><img height="30" src="img/ledStrip.png"></td>' +
                        '<td>' + component.name + '</td>' +
                        '<td class="deleteIcon" align="right"><img height="20" src="img/delete.png" onclick="removeComponent(' + component.id + ')"/></td>' +
                        '</tr>'
                    );
                    break;
            }
        }
    );
}


function removeComponent(componentId) {
    $.get("?route=ajax&action=removeComponent&id=" + componentId,
        function (data, status) {
            var component = JSON.parse(data);
            component.name = component.name == null ? "" : component.name;

            $('.component' + componentId).remove();
        });
}

function saveGridLayout(gridLayout) {
    $.post("", {GridLayout: JSON.stringify(gridLayout)}).done(function(data) {
    });
}