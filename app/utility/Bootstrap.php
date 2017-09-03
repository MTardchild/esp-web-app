<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);
//error_reporting(E_ERROR | E_PARSE);

// Composer Libs (Auryn)
require_once("../app/vendor/autoload.php");

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

$gridLayout = null;
if (isset($_POST["GridLayout"])) {
    if (trim($_POST["GridLayout"]) != "") {
        $gridLayout = $_POST['GridLayout'];
    }
}

$injector->define('FrontController', [
    ':heartbeat' => $heartbeat,
    ':gridLayout' => $gridLayout]);
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