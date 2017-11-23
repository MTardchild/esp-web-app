<div class="ruleOverview">
    <div class="ruleOverviewItem ruleOverviewItemSelected">Rule</div>
    <?php
        for ($i = 0; $i < 10; ++$i) {
            echo '<div class="ruleOverviewItem">Rule</div>';
        }
    ?>
</div>
<div class="ruleEditor">
    <div class="ruleEditorItem">
        <div class="editorConditionItem">
            <h3>CONDITION</h3>
            <div class="finderWrapper">
                <div class="editorFinder"></div>
                <div class="operatorFinder"></div>
                <div class="editorValueInputWrapper">
                    <label>
                        <input type="text">
                    </label>
                </div>
            </div>
            <div class="conditionDropZone"></div>
        </div>
    </div>
</div>
<div class="ruleBuildingBlockOverview">
    <?php
    for ($i = 0; $i < 5; ++$i) {
        echo '<div class="ruleBuildingBlockItem">Building Block</div>';
    }
    ?>
</div>