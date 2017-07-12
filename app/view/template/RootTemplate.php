<html>
    <head>
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
        <link rel="stylesheet" type="text/css" href="../lib/jquery.gridster.min.css" />

        <link rel="stylesheet" type="text/css" href="css/main.css" />

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <script type="text/javascript" src="../lib/jquery.gridster.min.js"></script>
        <script type="text/javascript" src="../lib/jscolor.min.js"></script>

        <script type="text/javascript" src="js/connectionEsp.js"></script>
        <script type="text/javascript" src="js/gridster.js"></script>
    </head>
    <body>
        <?php
            include 'Navigation.php';
            include 'TileTemplate.php';
        ?>

        <script type="text/javascript">
            $(document).ready(function() {
                initializeGridster();
            });
        </script>

        <div class='toastMessage' style='display:none'></div>
    </body>
</html>