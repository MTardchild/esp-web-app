var Navigation = {
    toConfigView: function () {
        ConfigController.requestConfigView();
        $('#dashboardView').fadeOut(250);
        $('#configView').fadeIn(250);
    },
    toDashboardView: function () {
        $('.grid-stack').off('change');
        DashboardController.requestDashboardGrid();
        $('#configView').fadeOut(250);
        $('#dashboardView').fadeIn(250);
    }
};