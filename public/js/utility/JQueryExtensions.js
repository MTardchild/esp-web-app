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

jQuery.fn.moveUp = function() {
    $.each(this, function() {
        $(this).after($(this).prev());
    });
};

jQuery.fn.moveDown = function() {
    $.each(this, function() {
        $(this).before($(this).next());
    });
};