function drop(event) {
    event.preventDefault();
    var regex = new RegExp('[0-9]');
    var espId = event.target.parentElement.id;
    espId = regex.exec(espId)[0];
    var typeId = event.dataTransfer.getData("text");
    $(event.target).removeClass("droppable");
    addDroppedComponent(espId, typeId);
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

function addDroppedComponent(espId, componentTypeId) {
    addComponent(espId, componentTypeId);
}