function navigateToConfigView() {
    $('#dashboardView').invisible();
    $('#configView').visible();
    requestConfigView();
}

function navigateToDashboardView() {
    $('#configView').invisible();
    $('#dashboardView').visible();
    requestDashboardGrid();
}