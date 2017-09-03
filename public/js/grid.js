jQuery.fn.visible = function() {
    return this.css('visibility', 'visible');
};

jQuery.fn.invisible = function() {
    return this.css('visibility', 'hidden');
};

jQuery.fn.visibilityToggle = function() {
    return this.css('visibility', function(i, visibility) {
        return (visibility == 'visible') ? 'hidden' : 'visible';
    });
};

jQuery.fn.exists = function () {
    return this.length !== 0;
};

$(document).ready(function() {
    requestDashboardGrid();
    var options = {
        cellHeight: 80,
        verticalMargin: 10
    };

    $('.grid-stack').gridstack(options);
});

saveGrid = function () {
    this.serializedData = _.map($('.grid-stack > .grid-stack-item:visible'), function (el) {
        el = $(el);
        var node = el.data('_gridstack_node');
        return {
            x: node.x,
            y: node.y,
            width: node.width,
            height: node.height
        };
    }, this);
    // console.log(JSON.stringify(this.serializedData, null, '    '));
    saveGridLayout(this.serializedData);
};

loadGrid = function (gridLayout) {
    var grid = $('.grid-stack').data('gridstack');
    grid.removeAll();
    var items = GridStackUI.Utils.sort(JSON.parse(gridLayout));
    _.each(items, function (node) {
        grid.addWidget($('<div><div class="grid-stack-item-content" /><div/>'),
            node.x, node.y, node.width, node.height);
    }, this);
    return false;
};