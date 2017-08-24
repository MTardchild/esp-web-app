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
    var cleanRgb = hsvToRgb(color.hsv[0], color.hsv[1], color.hsv[2]);
    var ww = $('#warmWhiteLedStrip' + componentId)[0].value;

    $.get("?route=ajax&action=setColorUdp&id=" + componentId + "&r="
        + cleanRgb.r + "&g=" + cleanRgb.g + "&b=" + cleanRgb.b + "&ww=" + ww,
        onAjaxResponse);
}

function populateDashboardGrid() {
    $.get("?route=ajax&action=getDashboardView",
        function (data, status) {
            var grid = $('.grid-stack').data('gridstack');
            var parsedContent = $('<div></div>');
            parsedContent.html(data);
            var espTiles = $('.grid-stack-item-content', parsedContent);

            for (var i = 0; i < espTiles.length; ++i) {
                var espTile = $('<div></div>');
                espTile.html(espTiles[i]);
                var id = espTile[0].firstChild.id;
                var oldTile = $('#' + id);

                if (oldTile.exists()) {
                    oldTile = oldTile[0].parentElement;
                    var attributes = oldTile.attributes;
                    grid.removeWidget(oldTile);
                    grid.addWidget(espTile, attributes[0].nodeValue,
                        attributes[1].nodeValue, attributes[2].nodeValue,
                        attributes[3].nodeValue);
                } else {
                    grid.addWidget(espTile, 0, 0, 2, 8, true);
                }
            }

            jscolor.installByClassName("jscolor");
        }
    );
}