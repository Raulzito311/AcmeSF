<?php
require_once "vendor/autoload.php";

describe('ClienteBDR', function() {
    beforeAll(function() {
        $sql = file_get_contents('dados.sql');
        Connection::get()->exec($sql);
    });
    it('Carrega Cliente pelo id', function() {
        $repo = new ClienteRepositoryBDR();
        $cliente = $repo->buscarPeloId(1);
        expect($cliente)->toBeAnInstanceOf(Cliente::class);
    });
    it('Carrega todos os Clientes', function() {
        $repo = new ClienteRepositoryBDR();
        $clientes = $repo->buscarTodos();
        expect($clientes)->toBeAn('array');
        expect($clientes[0])->toBeAnInstanceOf(Cliente::class);
    });
    it('Carrega Cliente pelo CPF', function() {
        $repo = new ClienteRepositoryBDR();
        $cliente = $repo->buscarPeloCPF('123.456.789-10');
        expect($cliente)->toBeAnInstanceOf(Cliente::class);
    });
});
?>