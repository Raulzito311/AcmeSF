<?php
    require_once "vendor/autoload.php";

    describe("ControlerCliente", function(){
        beforeAll(function(){
            $conexao = new conexao();
            $sql = file_get_contents("dados.sql");
            $conexao->getConexao()->exec($sql);
            $conexao->encerrar();
        });
        it("carrega todos os clientes", function(){
            $controller = new controllerCliente();
            $clientes = $controller->buscarTodos();
            expect($clientes)->toBeAn('array');
            expect($clientes[0])->toBeAnInstanceOf('Cliente');

        });
        it("carrega cliente pelo id", function(){
            $controller = new controllerCliente();
            $cliente = $controller->buscarPeloId(1);
            expect($cliente)->toBeAnInstanceOf('Cliente');
            expect($cliente->getNome())->toBe("Rodrigo Jorge");
            expect($cliente->getdataNascimento())->toBeAnInstanceOf("DateTime");;
        });
        it("carrega cliente pelo id 2", function(){
            $controller = new controllerCliente();
            $cliente = $controller->buscarPeloId(2);
            expect($cliente)->toBeAnInstanceOf('Cliente');
            expect($cliente->getNome())->toBe("Raul Fernandes");
            expect($cliente->getdataNascimento())->toBeAnInstanceOf("DateTime");
        });
    });