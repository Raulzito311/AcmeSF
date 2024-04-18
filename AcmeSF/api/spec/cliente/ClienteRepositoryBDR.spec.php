<?php
require_once "vendor/autoload.php";

describe('ClienteBDR', function() {
    beforeAll(function() {
        $sql = file_get_contents('dados.sql');
        Connection::get()->exec($sql);
    });
    it('Carrega Cliente pelo id', function() {
        $repo = new ClienteRepositoryBDR();
        $produto = $repo->buscarPeloId(1);
        expect($produto)->toBeAnInstanceOf(Cliente::class);
    });
    it('Carrega todos os Clientes', function() {
        $repo = new ClienteRepositoryBDR();
        $formasDePagamento = $repo->buscarTodos();
        expect($formasDePagamento)->toBeAn('array');
        expect($formasDePagamento[0])->toBeAnInstanceOf(Cliente::class);
    });
});
?>