var UnconfiguredEspConfigurationController = {
    getWifiNetworks: function () {
        $.get("?route=ajax&action=getWifiNetworks",
            function (data, status) {
                var networks = JSON.parse(data);
                var dummy = JSON.parse('[["", "esp_hwidshitz", "mode", "channel", "rate", "signal", "random", "security"]]');
                UnconfiguredEspConfigurationController.addWifiRows(networks);
                UnconfiguredEspConfigurationController.addWifiRows(dummy);
                configViewModel.bindFlashButtons();
                configViewModel.bindUpdateWifiButtons();
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
    }
};
