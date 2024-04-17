<?php
require_once "vendor/autoload.php";

describe('FormaDePagamentoRepositoryBDR', function() {
    beforeAll(function() {
        $sql = file_get_contents('dados.sql');
        Connection::get()->exec($sql);
    });
    it('Carrega uma Forma de Pagamento pelo id', function() {
        $repo = new FormaDePagamentoRepositoryBDR();
        $produto = $repo->buscarPeloId(1);
        expect($produto)->toBeAnInstanceOf(FormaDePagamento::class);
    });
    it('Carrega todas as Formas de Pagamento', function() {
        $repo = new FormaDePagamentoRepositoryBDR();
        $formasDePagamento = $repo->buscarTodos();
        expect($formasDePagamento)->toBeAn('array');
        expect($formasDePagamento)->not->toHaveLength(0);
        expect($formasDePagamento[0])->toBeAnInstanceOf(FormaDePagamento::class);
    });
});
?>