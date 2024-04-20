<?php
require_once "vendor/autoload.php";

class Connection {
    private static ?PDO $pdo = null;

    private static function start() {
        try {
            self::$pdo = new PDO(
                "mysql:dbname=acmesf;host=localhost;charset=utf8",
                "root",
                "",
                [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
            );
        } catch (PDOException $e) {
            throw new RepositoryException("Erro ao conectar com o banco de dados: " . $e->getMessage());
            die();
        }
    }

    public static function get() {
        if(self::$pdo == null){
            self::start();
        }
        return self::$pdo;
    }
}
?>