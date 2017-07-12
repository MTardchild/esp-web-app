function initializeGridster() {
    var widget_base_x = 320;
    var widget_base_y = 100;

    // Calculate a height for each of the blocks.
    $(".gridster > ul > li").each(function (i) {
        var height = $(this).height();
        var units = Math.ceil(height / widget_base_y);
        $(this).attr('data-sizey', units);
    });

    $(".gridster").css("width", 2 * (widget_base_x + 30) + 20);

    $(".gridster ul").gridster({
        widget_margins: [20, 20],
        widget_base_dimensions: [widget_base_x, widget_base_y],
        min_cols: 2
    });
}