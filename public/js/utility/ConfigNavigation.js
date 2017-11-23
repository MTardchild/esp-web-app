var ConfigNavigation = {
    navigateToEspTableView: function () {
        ConfigNavigation.fadeIdIn('#configViewEspTableView');
    },
    navigateToWifiTableView: function () {
        ConfigNavigation.fadeIdIn('#configViewWifiTableView');
    },
    navigateToRoomTableView: function () {
        ConfigNavigation.fadeIdIn('#configViewRoomTableView');
    },
    navigateToDoorTableView: function() {
        ConfigNavigation.fadeIdIn('#configViewDoorTableView');
    },
    navigateToLocationTableView: function() {
        ConfigNavigation.fadeIdIn('#configViewLocationTableView');
    },
    navigateToWindowTableView: function() {
        ConfigNavigation.fadeIdIn('#configViewWindowTableView');
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
