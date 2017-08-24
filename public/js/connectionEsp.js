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

function hsvToRgb(h, s, v) {
    var r, g, b;
    var i;
    var f, p, q, t;

    // Make sure our arguments stay in-range
    h = Math.max(0, Math.min(360, h));
    s = Math.max(0, Math.min(100, s));
    v = Math.max(0, Math.min(100, v));

    // We accept saturation and value arguments from 0 to 100 because that's
    // how Photoshop represents those values. Internally, however, the
    // saturation and value are calculated from a range of 0 to 1. We make
    // That conversion here.
    s /= 100;
    v /= 100;

    if(s == 0) {
        // Achromatic (grey)
        r = g = b = v;
        return {
            r: r * 4095,
            g: g * 4095,
            b: b * 4095
        };
    }

    h /= 60; // sector 0 to 5
    i = Math.floor(h);
    f = h - i; // factorial part of h
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));

    switch(i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;

        case 1:
            r = q;
            g = v;
            b = p;
            break;

        case 2:
            r = p;
            g = v;
            b = t;
            break;

        case 3:
            r = p;
            g = q;
            b = v;
            break;

        case 4:
            r = t;
            g = p;
            b = v;
            break;

        default: // case 5:
            r = v;
            g = p;
            b = q;
    }

    return {
        r: r * 4095,
        g: g * 4095,
        b: b * 4095
    };
}

function navigateToDashboardView() {
    $('#configView').invisible();
    $('#dashboardView').visible();

    populateDashboardGrid();
}

function populateDashboardGrid() {
    $.get("?route=ajax&action=getDashboardView",
        function (data, status) {
            var grid = $('.grid-stack').data('gridstack');
            // grid.removeAll();
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

function navigateToConfigView() {
    $('#dashboardView').invisible();
    $('#configView').visible()
}