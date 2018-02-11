<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
        <link rel="stylesheet" type="text/css" href="../lib/gridstack.css" />
        <link rel="stylesheet" type="text/css" href="css/mainStyle.css" />
        <link rel="stylesheet" type="text/css" href="css/configViewStyle.css" />
        <link rel="stylesheet" type="text/css" href="css/dashboardViewStyle.css" />
        <link rel="stylesheet" type="text/css" href="css/loadingScreenStyle.css" />
        <link rel="stylesheet" type="text/css" href="css/navigationStyle.css" />
        <link rel="stylesheet" type="text/css" href="../lib/jquery-ui.min.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
        <link rel="stylesheet" type="text/css" href="../lib/bootstrap-colorpicker.min.css" />

        <script type="text/javascript" src="../lib/jquery-3.2.1.js"></script>
        <script type="text/javascript" src="../lib/jquery-ui.js"></script>
        <script type="text/javascript" src="../lib/lodash.js"></script>
        <script type="text/javascript" src="../lib/jscolor.min.js"></script>
        <script type="text/javascript" src="../lib/gridstack.js"></script>
        <script type="text/javascript" src="../lib/gridstack.jQueryUI.js"></script>
        <script type="text/javascript" src="../lib/jquery.ui.touch-punch.min.js"></script>
        <script type="text/javascript" src="../lib/jquery.finder.js"></script>
        <script type="text/javascript" src="../lib/knockout-3.4.2.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        <script type="text/javascript" src="../lib/bootstrap-colorpicker.min.js"></script>
        <script type="text/javascript" src="../lib/jquery.knob.min.js"></script>
        <script type="text/javascript" src="../lib/knockout.mapping.js"></script>


        <script type="text/javascript" src="js/controller/ConfigController.js"></script>
        <script type="text/javascript" src="js/controller/DashboardController.js"></script>
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
                <div class="card-columns" style="margin: 0px 10px">
                    <div data-bind="foreach: esps" >
                        <div class="card">
                            <div class="card-body">
                                <span data-bind="text: ip"> </span><h5 class="card-title" data-bind="text: name"></h5>
                                <hr>
                                <div data-bind="foreach: components">
                                    <div data-bind="if: typeId==1">
                                        <span>Temperature: </span><span data-bind="text: temperature"></span><br>
                                        <span>Humidity: </span><span data-bind="text: humidity"></span>
                                    </div>
                                    <div data-bind="if: typeId==2">
                                        <span data-bind="text: name"></span>
                                        <label class="switch" style="float: right;">
                                            <input type="checkbox" data-bind="checked: state">
                                            <span class="slider round"></span>
                                        </label>
                                    </div>
                                    <div data-bind="if: typeId==3">
                                        <input type="text" class="form-control input-lg" value=""/>
                                        <p>
                                        <div class="container">
                                            <div class="row">
                                                <div class="col-sm">
                                                    <input type="text" data-bind="value: red" class="redColorDial">
                                                </div>
                                                <div class="col-sm">
                                                    <input type="text" data-bind="value: green" class="greenColorDial">
                                                </div>
                                                <div class="col-sm">
                                                    <input type="text"data-bind="value: blue" class="blueColorDial">
                                                </div>
                                                <div class="col-sm">
                                                    <input type="text" data-bind="value: warmWhite" class="warmWhiteDial">
                                                </div>
                                            </div>
                                        </div>
                                        </p>
                                    </div>
                                    <hr>
                                </div>
                                <small class="text-muted">Last updated 3 mins ago</small></p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div id="configView" style="display: none;">

            </div>

            <div id="ruleView" style="display: none;">
            </div>
        </div>

        <div class='toastMessage' style='display:none'></div>
    <script>
        ko.applyBindings(new DashboardViewModel(), document.getElementById('dashboardView'));
        ko.applyBindings(new ConfigViewModel(), document.getElementById('configView'));
    </script>
    </body>
</html>
