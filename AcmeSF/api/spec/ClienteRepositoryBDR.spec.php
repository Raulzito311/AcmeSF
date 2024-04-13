<?php
    require_once "vendor/autoload.php";

    describe("ClienteRepositoryBDR", function(){
        beforeAll(function(){
            $this->pdo = new PDO("mysql:dbname=acmesf;host=localhost;charset=utf8",
                "root",
                "",
                [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
            );
            $sql = file_get_contents("dados.sql");
            $this->pdo->exec($sql);
        });
        it("carrega todos os clientes", function(){
            $repo = new clienteRepositoryBDR($this->pdo);
            $clientes = $repo->buscarTodos();
            expect($clientes)->toBeAn('array');
            expect($clientes[0])->toBeAnInstanceOf('Cliente');

        });
        it("carrega cliente pelo id", function(){
            $repo = new clienteRepositoryBDR($this->pdo);
            $cliente = $repo->buscarPeloId(1);
            expect($cliente)->toBeAnInstanceOf('Cliente');
            expect($cliente->getNome())->toBe("Rodrigo Jorge");
        });
    });