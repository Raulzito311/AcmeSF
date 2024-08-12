<?php
require_once "vendor/autoload.php";

describe('ClienteRepositoryBDR', function() {
    beforeAll(function() {
        $sql = file_get_contents('dados.sql');
        Connection::get()->exec($sql);
    });
    it('retrieves Cliente by id', function() {
        $repo = new ClienteRepositoryBDR();
        $cliente = $repo->buscarPeloId(1);
        expect($cliente)->toBeAnInstanceOf(Cliente::class);
    });
    it('retrieves all Clientes', function() {
        $repo = new ClienteRepositoryBDR();
        $clientes = $repo->buscarTodos();
        expect($clientes)->toBeAn('array');
        expect($clientes[0])->toBeAnInstanceOf(Cliente::class);
    });
    it('retrieves Cliente by CPF', function() {
        $repo = new ClienteRepositoryBDR();
        $cliente = $repo->buscarPeloCPF('062.148.367-25');
        expect($cliente)->toBeAnInstanceOf(Cliente::class);
    });
});
?>