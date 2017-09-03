function navigateToConfigView() {
    $('#dashboardView').hide(200);
    $('#configView').show(200);
    requestConfigView();
}

function navigateToDashboardView() {
    $('#configView').hide(200);
    $('#dashboardView').show(200);
    requestDashboardGrid();
}