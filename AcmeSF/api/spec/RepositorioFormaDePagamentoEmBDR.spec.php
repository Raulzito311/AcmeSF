<?php
    require_once "vendor/autoload.php";

    describe("RepositorioFormaDePagamentoEmBDR", function(){
        beforeAll(function(){
            $this->pdo = new PDO("mysql:dbname=acmesf;host=localhost;charset=utf8",
                "root",
                "",
                [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
            );
            $sql = file_get_contents("dados.sql");
            $this->pdo->exec($sql);
        });
        it("carrega todas as formas de Pagamento", function(){
            $repo = new RepositorioFormaDePagamentoEmBDR($this->pdo);
            $formasDePagamento = $repo->todasFormasDePagamentos();
            expect($formasDePagamento)->toBeAn('array');
            expect($formasDePagamento[0])->toBeAnInstanceOf('FormaDePagamento');

        });
    });
?>