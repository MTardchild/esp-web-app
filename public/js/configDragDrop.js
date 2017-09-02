function drop(event) {
    event.preventDefault();
    var typeId = event.dataTransfer.getData("text");
    $(event.target).removeClass("droppable");
    addDroppedComponent(typeId);
}

function enterDropArea(event) {
    event.preventDefault();
    $(event.target).addClass("droppable");
}

function leaveDropArea(event) {
    event.preventDefault();
    $(event.target).removeClass("droppable");
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function onDragOver(event) {
    event.preventDefault();
}

function addDroppedComponent(typeId) {
    switch (typeId) {
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
    }
}