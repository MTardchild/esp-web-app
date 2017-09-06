<?php
class AutoLoader {
    public static function load($className) {
        self::loadRouterNamespace($className);
        self::loadModelNamespace($className);
        self::loadViewNamespace($className);
        self::loadControllerNamespace($className);
        self::loadUtilityNamespace($className);
    }

    private static function loadRouterNamespace($className) {
        $pathDirectory = join(DIRECTORY_SEPARATOR, array(__DIR__, '..', 'router', ''));
        self::requireIfExistent($pathDirectory, $className);
    }

    private static function loadModelNamespace($className) {
        self::loadDomainNamespace($className);
        self::loadDomainAbstractNamespace($className);
        self::loadMapperNamespace($className);
        self::loadMapperComponentsNamespace($className);
        self::loadMapperInterfaceNamespace($className);
        self::loadServiceNamespace($className);
        self::loadServiceComponentsNamespace($className);
        self::loadServiceInterfaceNamespace($className);
    }

    private static function loadViewNamespace($className) {
        $pathDirectory = join(DIRECTORY_SEPARATOR, array(__DIR__, '..', 'view', 'view',''));
        self::requireIfExistent($pathDirectory, $className);
    }

    private static function loadControllerNamespace($className) {
        $pathDirectory = join(DIRECTORY_SEPARATOR, array(__DIR__, '..', 'controller', ''));
        self::requireIfExistent($pathDirectory, $className);
    }

    private static function loadUtilityNamespace($className) {
        $pathDirectory = join(DIRECTORY_SEPARATOR, array(__DIR__, '..', 'utility', ''));
        self::requireIfExistent($pathDirectory, $className);
    }

    private static function loadDomainNamespace($className) {
        $pathDirectory = join(DIRECTORY_SEPARATOR, array(__DIR__, '..', 'model', 'domain', ''));
        self::requireIfExistent($pathDirectory, $className);
    }

    private static function loadDomainAbstractNamespace($className) {
        $pathDirectory = join(DIRECTORY_SEPARATOR, array(__DIR__, '..', 'model', 'domain', 'baseclass', ''));
        self::requireIfExistent($pathDirectory, $className);
    }

    private static function loadMapperNamespace($className) {
        $pathDirectory = join(DIRECTORY_SEPARATOR, array(__DIR__, '..', 'model', 'mapper', ''));
        self::requireIfExistent($pathDirectory, $className);
    }

    private static function loadMapperInterfaceNamespace($className) {
        $pathDirectory = join(DIRECTORY_SEPARATOR, array(__DIR__, '..', 'model', 'mapper', 'interface', ''));
        self::requireIfExistent($pathDirectory, $className);
    }

    private static function loadMapperComponentsNamespace($className) {
        $pathDirectory = join(DIRECTORY_SEPARATOR, array(__DIR__, '..', 'model', 'mapper', 'component', ''));
        self::requireIfExistent($pathDirectory, $className);
    }

    private static function loadServiceNamespace($className) {
        $pathDirectory = join(DIRECTORY_SEPARATOR, array(__DIR__, '..', 'model', 'service', ''));
        self::requireIfExistent($pathDirectory, $className);
    }

    private static function loadServiceInterfaceNamespace($className) {
        $pathDirectory = join(DIRECTORY_SEPARATOR, array(__DIR__, '..', 'model', 'service', 'interface', ''));
        self::requireIfExistent($pathDirectory, $className);
    }

    private static function loadServiceComponentsNamespace($className) {
        $pathDirectory = join(DIRECTORY_SEPARATOR, array(__DIR__, '..', 'model', 'service', 'component', ''));
        self::requireIfExistent($pathDirectory, $className);
    }

    private static function requireIfExistent($pathDirectory, $className) {
        $pathClass = $pathDirectory . $className . ".php";

        if (file_exists($pathClass)) {
            require_once($pathClass);
        }
    }
}
