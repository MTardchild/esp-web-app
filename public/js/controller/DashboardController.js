var DashboardController = {
    lastUdpSend: Date.now(),
    showToast: function (message) {
        $('.toastMessage').text(message);
        $('.toastMessage').stop().fadeIn(400).delay(3000).fadeOut(400);
    },
    toggleRelay: function (componentId) {

        $.get("?route=ajax&action=toggleRelay&id=" + componentId,
            function (data, status) {
                DashboardController.onRelayToggled(data, status);
            });

        this.showToast("Trying to toggle relay with identifier " + componentId + ".");
    },
    onRelayToggled: function (data, status) {
        this.showToast("Relay toggled.");
    },
    setWarmWhite: function (componentId, warmWhite) {
        $.get("?route=ajax&action=setWarmWhite&id=" + componentId + "&ww=" + warmWhite,
            function (data, status) {
                DashboardController.onWarmWhiteSet(data, status);
            });

        this.showToast("Sent warm white value to led strip with ID " + componentId + ".");
    },
    onWarmWhiteSet: function (data, status) {
        this.showToast("Warm white set.");
    },
    setColor: function (componentId, color) {
        var cleanRgb = ColorConversion.hsvToRgb(color.hsv[0], color.hsv[1], color.hsv[2]);

        $.get("?route=ajax&action=setColor&id=" + componentId + "&r="
            + cleanRgb.r + "&g=" + cleanRgb.g + "&b=" + cleanRgb.b,
            function (data, status) {
                DashboardController.onColorSet(data, status);
            });


        this.showToast("Sent color value to led strip with ID " + componentId + ".");
    },
    onColorSet: function (data, status) {
        this.showToast("Color set.");
    },
    setColorUdp: function (componentId, color) {
        if (lastUdpSend + 200 < Date.now()) {
            lastUdpSend = Date.now();

            var cleanRgb = hsvToRgb(color.hsv[0], color.hsv[1], color.hsv[2]);
            var ww = $('#warmWhiteLedStrip' + componentId)[0].value;

            console.log(cleanRgb);

            $.get("?route=ajax&action=setColorUdp&id=" + componentId + "&r="
                + cleanRgb.r + "&g=" + cleanRgb.g + "&b=" + cleanRgb.b + "&ww=" + ww,
                function (data, status) {
                    DashboardController.onColorSet(data, status);
                }
            );
        }
    },
    requestDashboardGrid: function () {
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

                        $.get("?route=ajax&action=getComponentOrder",
                            function (data, status) {
                                var fullComponentOrder = JSON.parse(data);
                                DashboardController.loadComponentOrder(fullComponentOrder);
                                var root = $('.loading').removeClass('loading');
                                root.addClass('root');
                                $('#dashboardView').visible();

                                jscolor.installByClassName("jscolor");
                                $('.grid-stack').off('change');
                                $('.grid-stack').on('change', function (event, items) {
                                    DashboardController.saveGrid();
                                });
                                $('.arrowDown').click(function () {
                                    $(this).parents('.componentTile').moveDown();
                                    DashboardController.saveComponentOrder();
                                });
                                $('.arrowUp').click(function () {
                                    $(this).parents('.componentTile').moveUp();
                                    DashboardController.saveComponentOrder();
                                });
                            }
                        );
                    }
                );
            }
        );
    },
    saveComponentOrder: function() {
        var fullComponentOrder = [];
        $('.grid-stack-item').each(function (index) {
            var components = $(this).find('.componentTile');
            var componentOrder = [];

            for (i = 0; i < components.length; ++i) {
                componentOrder.push(components[i].id);
            }

            fullComponentOrder.push(componentOrder);
        });

        $.post("", {ComponentOrder: JSON.stringify(fullComponentOrder)}).done(function (data) {

        });
    },
    loadComponentOrder: function(fullComponentOrder) {
        $('.grid-stack-item').each(function (index) {
            var components = $(this).find('.componentTile');

            for (i = 0; i < components.length; ++i) {
                components[i].remove();
            }

            for (i = 0; i < fullComponentOrder[index].length; ++i) {
                for (j = 0; j < components.length; ++j) {
                    if (components[j].id === fullComponentOrder[index][i]) {
                        $(this).find('.espInfo').append(components[j]);
                    }
                }
            }
        });
    },
    saveGrid: function () {
        this.serializedData = _.map($('.grid-stack > .grid-stack-item:visible'), function (el) {
            el = $(el);
            var node = el.data('_gridstack_node');
            return {
                x: node.x,
                y: node.y,
                width: node.width,
                height: node.height
            };
        }, this);

        $.post("", {GridLayout: JSON.stringify(this.serializedData)}).done(function (data) {

        });
    }
};