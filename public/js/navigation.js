function navigateToConfigView() {
    $('#dashboardView').invisible();
    $('#configView').visible()
}

function navigateToDashboardView() {
    $('#configView').invisible();
    $('#dashboardView').visible();

    populateDashboardGrid();
}