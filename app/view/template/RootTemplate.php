<html>
    <head>
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
        <link rel="stylesheet" type="text/css" href="../lib/gridstack.css" />
        <link rel="stylesheet" type="text/css" href="css/main.css" />

        <script type="text/javascript"
                src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
                integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
                crossorigin="anonymous"></script>
        <script type="text/javascript" src="../lib/lodash.js"></script>
        <script type="text/javascript" src="../lib/jscolor.min.js"></script>
        <script type="text/javascript" src="../lib/gridstack.js"></script>
        <script type="text/javascript" src="../lib/gridstack.jQueryUI.js"></script>

        <script type="text/javascript" src="js/ajaxCalls.js"></script>
        <script type="text/javascript" src="js/colorConversion.js"></script>
        <script type="text/javascript" src="js/navigation.js"></script>
        <script type="text/javascript" src="js/grid.js"></script>
        <script type="text/javascript" src="js/configUi.js"></script>
        <script type="text/javascript" src="js/configDragDrop.js"></script>
    </head>
    <body>
        <?php
            include 'Navigation.php';
        ?>

        <div style="position: relative;">
            <div id="dashboardView">
                <div class="grid-stack">

                </div>
            </div>

            <div id="configView">

            </div>
        </div>


        <div class='toastMessage' style='display:none'></div>
    </body>
</html>