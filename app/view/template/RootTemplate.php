<html>
    <head>
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
        <link rel="stylesheet" type="text/css" href="../lib/gridstack.css" />
        <link rel="stylesheet" type="text/css" href="css/mainStyle.css" />
        <link rel="stylesheet" type="text/css" href="css/configViewStyle.css" />
        <link rel="stylesheet" type="text/css" href="css/dashboardViewStyle.css" />
        <link rel="stylesheet" type="text/css" href="css/loadingScreenStyle.css" />
        <link rel="stylesheet" type="text/css" href="css/navigationStyle.css" />
        <link rel="stylesheet" type="text/css" href="../lib/jquery-ui.min.css" />

        <script type="text/javascript" src="../lib/jquery-3.2.1.js"></script>
        <script type="text/javascript" src="../lib/jquery-ui.js"></script>
        <script type="text/javascript" src="../lib/lodash.js"></script>
        <script type="text/javascript" src="../lib/jscolor.min.js"></script>
        <script type="text/javascript" src="../lib/gridstack.js"></script>
        <script type="text/javascript" src="../lib/gridstack.jQueryUI.js"></script>
        <script type="text/javascript" src="../lib/jquery.ui.touch-punch.min.js"></script>
        <script type="text/javascript" src="../lib/jquery.finder.js"></script>

        <script type="text/javascript" src="js/controller/ConfigController.js"></script>
        <script type="text/javascript" src="js/controller/DashboardController.js"></script>
        <script type="text/javascript" src="js/controller/RulesController.js"></script>
        <script type="text/javascript" src="js/controller/ConfiguredEspConfigurationController.js"></script>
        <script type="text/javascript" src="js/controller/UnconfiguredEspConfigurationController.js"></script>

        <script type="text/javascript" src="js/utility/ColorConversion.js"></script>
        <script type="text/javascript" src="js/utility/Init.js"></script>
        <script type="text/javascript" src="js/utility/JQueryExtensions.js"></script>
        <script type="text/javascript" src="js/utility/Navigation.js"></script>
        <script type="text/javascript" src="js/utility/ArrayUtility.js"></script>
        <script type="text/javascript" src="js/utility/ConfigNavigation.js"></script>
    </head>
    <body>
        <?php
            include 'Navigation.php';
        ?>

        <div class="loading">
            <div id="dashboardView">
                <div class="grid-stack">

                </div>
            </div>

            <div id="configView" style="display: none;">

            </div>

            <div id="ruleView" style="display: none;">
                <?php include 'RuleTemplate.php' ?>
            </div>
        </div>


        <div class='toastMessage' style='display:none'></div>
    </body>
</html>
