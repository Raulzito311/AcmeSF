<?php
    require_once "vendor/autoload.php";

    describe("ControllerFormaDePagamento", function(){
        beforeAll(function(){
            $conexao = new conexao();;
            $sql = file_get_contents("dados.sql");
            $conexao->getConexao()->exec($sql);
            $conexao->encerrar();
        });
        it("carrega todas as formas de Pagamento", function(){
            $controller = new ControllerFormaDePagamento();
            $formasDePagamento = $controller->buscarTodos();
            expect($formasDePagamento)->toBeAn('array');
            expect($formasDePagamento[0])->toBeAnInstanceOf('FormaDePagamento');

        });
        it("carrega forma de pagamento pelo id", function(){
            $controller = new ControllerFormaDePagamento();
            $formaDePagamento = $controller->buscarPeloId(1);
            expect($formaDePagamento)->toBeAnInstanceOf('FormaDePagamento');
            expect($formaDePagamento->getDescricao())->toBe("3 vezes sem juros");
        });
    });
?>