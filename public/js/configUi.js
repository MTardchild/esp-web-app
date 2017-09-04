function addRowHandlers() {
    var rows = $('#configTable').find('.espRow');
    for (i = 0; i < rows.length; i++) {
        var currentRow = rows[i];
        var createClickHandler =
            function(row)
            {
                return function() {
                    var cell = row.getElementsByTagName("td")[0];
                    var id = cell.innerHTML;
                    $("#configDetail" + id).toggle(400);
                };
            };

        currentRow.onclick = createClickHandler(currentRow);
    }
}