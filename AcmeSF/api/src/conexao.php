<?php
require_once "vendor/autoload.php";

class conexao{
    public static ?PDO $conexao = null;

    function iniciar(){
        try {
            self::$conexao = new PDO(
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

    function encerrar(){
        self::$conexao = null;
    }

    function getConexao(){
        if(self::$conexao == null){
            $this->iniciar();
        }
        return self::$conexao;
    }
}
?>