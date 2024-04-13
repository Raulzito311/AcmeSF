<?php
    require_once "vendor/autoload.php";

    describe("FormaDePagamentoRepositoryBDR", function(){
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
            $repo = new FormaDePagamentoRepositoryBDR($this->pdo);
            $formasDePagamento = $repo->buscarTodos();
            expect($formasDePagamento)->toBeAn('array');
            expect($formasDePagamento[0])->toBeAnInstanceOf('FormaDePagamento');

        });
        it("carrega forma de pagamento pelo id", function(){
            $repo = new FormaDePagamentoRepositoryBDR($this->pdo);
            $formaDePagamento = $repo->buscarPeloId(1);
            expect($formaDePagamento)->toBeAnInstanceOf('FormaDePagamento');
            expect($formaDePagamento->getDescricao())->toBe("3 vezes sem juros");
        });
    });
?>