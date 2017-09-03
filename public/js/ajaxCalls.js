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
                    var gridLayout = JSON.parse(data);

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
                                true);
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
        }
    );
}

function addComponent(espId, componentTypeId) {
    $.get("?route=ajax&action=addDevice",
        function (data, status) {

        }
    );
}

function saveGridLayout(gridLayout) {
    $.post("", {GridLayout: JSON.stringify(gridLayout)}).done(function(data) {
    });
}