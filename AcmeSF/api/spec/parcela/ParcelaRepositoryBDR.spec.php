<?php
require_once "vendor/autoload.php";

describe('ParcelaRepositoryBDR', function() {
    beforeAll(function() {
        $sql = file_get_contents('dados.sql');
        Connection::get()->exec($sql);
    });
    it('retrieves a Parcela to pay for Emprestimo id', function() {
        $repo = new ParcelaRepositoryBDR();
        $parcela = $repo->buscarParcelaParaPagar(1);
        expect($parcela)->toBeAnInstanceOf(Parcela::class);
    });
    it('retrieves all Parcelas for Emprestimo id', function() {
        $repo = new ParcelaRepositoryBDR();
        $parcelas = $repo->buscarParcelasDoEmprestimo(1);
        
        expect($parcelas)->toBeAn('array');
        expect($parcelas)->not->toHaveLength(0);
        expect($parcelas[0])->toBeAnInstanceOf(Parcela::class);
    });
    it('pays a Parcela', function() { // Não vai aparecer no php my admin pq outros testes foram executados depois e os dados foram apagados
        $repo = new ParcelaRepositoryBDR();

        $res = $repo->pagarParcela(1, 3);
        
        expect($res)->toBeTruthy();
    });
    it('adds Parcelas', function() {
        $func = function() {
            $repo = new ParcelaRepositoryBDR();
            $parcelas = [Parcela::criarParcela(1000, '2024-08-21', 1), Parcela::criarParcela(1000, '2024-09-21', 1), Parcela::criarParcela(1000, '2024-10-21', 1)];
            $repo->adicionarParcelas($parcelas);
        };
        
        expect($func)->not->toThrow(new Exception(''));
    });
    it('throws DataException to invalid Emprestimo foreign key', function() {
        $func = function() {
            $repo = new ParcelaRepositoryBDR();
            $parcelas = [Parcela::criarParcela(1000, '2024-08-21', 1111), Parcela::criarParcela(1000, '2024-09-21', 1), Parcela::criarParcela(1000, '2024-10-21', 1)];
            $repo->adicionarParcelas($parcelas);
        };
        
        expect($func)->toThrow(new DataException(''));
    });
});
?>