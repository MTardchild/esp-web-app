var RulesController = {
    initialize: function () {
        $('.ruleBuildingBlockItem').draggable({revert: true, revertDuration: 250});
        $('.ruleEditorItem').droppable({
            over: function () {
                $(this).addClass("droppableHover");
            },
            out: function () {
                $(this).removeClass("droppableHover");
            },
            drop: function (event, ui) {
                $(this).removeClass("droppableHover");
                $(this).append('');
            }
        });

        var container = $('.editorFinder')[0];
        var cont = $('.operatorFinder')[0];
        var data = [{
            label: 'Item 1',
            children: [{
                label: 'Item 1A',
                children: [{
                    label: 'Item 1A1'
                }]
            }, {
                label: 'Item 1B'
            }]
        }];
        var options = {};
        var data2 = [
            { label: '<' },
            { label: '<=' },
            { label: '==' },
            { label: '>=' },
            { label: '>'}
        ];

        var f = finder(container, data, options);
        var ff = finder(cont, data2, options);
    }
};