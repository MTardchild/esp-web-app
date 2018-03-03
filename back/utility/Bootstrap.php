<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);
//error_reporting(E_ERROR | E_PARSE);

//sleep(1);

// Composer Libs (Auryn)
require_once("../back/vendor/autoload.php");

// Autoloader for internal classes
require_once("AutoLoader.php");
spl_autoload_register('AutoLoader::load');

// Constants
define("COMPONENT_TYPE_DHT", 1);
define("COMPONENT_TYPE_RELAY", 2);
define("COMPONENT_TYPE_LED_STRIP", 3);

$injector = new Auryn\Injector;

$injector->define('PDO', [
    ':dsn' => 'mysql:dbname=espwebapp;host=127.0.0.1',
    ':username' => 'dbwriteaccess',
    ':passwd' => '123loveme']);
$injector->share('PDO');

$action = isset($_GET['action']) ? $_GET['action'] : NULL;
$routeName = isset($_GET['route']) ? $_GET['route'] : "";

$heartbeat = null;
if (isset($_POST["EspHeartbeat"])) {
    if (trim($_POST["EspHeartbeat"]) != "") {
        $heartbeat = $_POST['EspHeartbeat'];
    }
}

$wifiCredentials = null;
if (isset($_POST["WifiCredentials"])) {
    if (trim($_POST["WifiCredentials"]) != "") {
        $wifiCredentials = $_POST['WifiCredentials'];
    }
}

$locationUpdate = null;
if (isset($_POST["LocationUpdate"])) {
    if (trim($_POST["LocationUpdate"]) != "") {
        $locationUpdate = $_POST['LocationUpdate'];
    }
}

$doorUpdate = null;
if (isset($_POST["DoorUpdate"])) {
    if (trim($_POST["DoorUpdate"]) != "") {
        $doorUpdate = $_POST['DoorUpdate'];
    }
}

$espUpdate = null;
if (isset($_POST["EspUpdate"])) {
    if (trim($_POST["EspUpdate"]) != "") {
        $espUpdate = $_POST['EspUpdate'];
    }
}

$windowUpdate = null;
if (isset($_POST["WindowUpdate"])) {
    if (trim($_POST["WindowUpdate"]) != "") {
        $windowUpdate = $_POST['WindowUpdate'];
    }
}

$roomUpdate = null;
if (isset($_POST["RoomUpdate"])) {
    if (trim($_POST["RoomUpdate"]) != "") {
        $roomUpdate = $_POST['RoomUpdate'];
    }
}

$firmwareUpdate = null;
if (isset($_POST["FirmwareUpdate"])) {
    if (trim($_POST["FirmwareUpdate"]) != "") {
        $firmwareUpdate = $_POST['FirmwareUpdate'];
    }
}

$logUpdate = null;
if (isset($_POST["LogUpdate"])) {
    if (trim($_POST["LogUpdate"]) != "") {
        $logUpdate = $_POST['LogUpdate'];
    }
}

$injector->define('FrontController', [
    ':heartbeat' => $heartbeat,
    ':wifiCredentials' => $wifiCredentials,
    ':doorUpdate' => $doorUpdate,
    ':locationUpdate' => $locationUpdate,
    ':espUpdate' => $espUpdate,
    ':windowUpdate' => $windowUpdate,
    ':roomUpdate' => $roomUpdate,
    ':firmwareUpdate' => $firmwareUpdate,
    ':logUpdate' => $logUpdate]);
$injector->share('FrontController');
$injector->share('AjaxRequest');

$router = $injector->make('Router');
$componentNames = $router->getRoute($routeName);
$frontController = $injector->make('FrontController');
$frontController->setController($injector->make($componentNames->controller));
$frontController->setView($injector->make($componentNames->view));
if (!is_null($action)) {
    $query = parse_url("http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]")["query"];
    parse_str($query, $action);
    $frontController->executeAction($action);
}

echo $frontController->output();
