<html>
    <head>
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
        <link rel="stylesheet" type="text/css" href="../lib/gridstack.css" />
        <link rel="stylesheet" type="text/css" href="../lib/jqColor.css" />
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

        <script type="text/javascript" src="js/connectionEsp.js"></script>
    </head>
    <body>
        <?php
            include 'Navigation.php';
        ?>

        <div id="dashboardView">
            <div class="grid-stack">

            </div>
        </div>

        <div id="configView">

        </div>

<!--         This should be moved to a separate file-->
        <script type="text/javascript">
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
            }

            $(document).ready(function() {
                populateDashboardGrid();
                var options = {
                    cellHeight: 80,
                    verticalMargin: 10
                };

                $('.grid-stack').gridstack(options);
            });
        </script>

        <div class='toastMessage' style='display:none'></div>
    </body>
</html>