var Navigation = {
    toConfigView: function () {
        // ConfigController.requestConfigView();

        if ($('#ruleView').isDisplayed()) {
            $('#ruleView').fadeOut(250);
            $('#configView').fadeIn(250);
        } else if ($('#dashboardView').isDisplayed()) {
            $('#dashboardView').fadeOut(250);
            $('#configView').fadeIn(250);
        }
    },
    toDashboardView: function () {
        $('.grid-stack').off('change');
        // DashboardController.requestDashboardGrid();
        $('.loading').removeClass('loading');

        if ($('#ruleView').isDisplayed()) {
            $('#ruleView').fadeOut(250);
            $('#dashboardView').fadeIn(250);
        } else if ($('#configView').isDisplayed()) {
            $('#configView').fadeOut(250);
            $('#dashboardView').fadeIn(250);
        }
    },
    toRulesView: function () {
        if ($('#configView').isDisplayed()) {
            $('#configView').fadeOut(250);
            $('#ruleView').fadeIn(250);
        } else if ($('#dashboardView').isDisplayed()) {
            $('#dashboardView').fadeOut(250);
            $('#ruleView').fadeIn(250);
        }
    }
};