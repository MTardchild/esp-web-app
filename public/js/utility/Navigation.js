var Navigation = {
    toConfigView: function () {
        $('#dashboardView').hide(200);
        $('#configView').show(200);
        ConfigController.requestConfigView();
    },
    toDashboardView: function () {
        $('#configView').hide(200);
        $('#dashboardView').show(200);
        DashboardController.requestDashboardGrid();
    }
};