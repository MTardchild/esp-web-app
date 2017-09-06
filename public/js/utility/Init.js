$(document).ready(function () {
    $('body').attr("spellcheck", false);

    Navigation.toDashboardView();
    var options = {
        cellHeight: 80,
        verticalMargin: 10
    };

    $('.grid-stack').gridstack(options);
});