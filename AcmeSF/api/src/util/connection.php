<?php
require_once "vendor/autoload.php";

class Connection {
    private static ?PDO $pdo = null;

    private static function start(): void {
        try {
            $dbHost = getenv('DB_HOST');
            $dbUser = getenv('DB_USER');
            $dbPass = getenv('DB_PASS');
            
            self::$pdo = new PDO(
                "mysql:dbname=acmesf;host=$dbHost;charset=utf8",
                $dbUser,
                $dbPass,
                [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
            );
        } catch (PDOException $e) {
            throw new RepositoryException("Erro ao conectar com o banco de dados: " . $e->getMessage());
        }
    }

    public static function get(): PDO {
        if(self::$pdo == null){
            self::start();
        }
        return self::$pdo;
    }
}
?>