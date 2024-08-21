<?php
require_once "vendor/autoload.php";

describe('Emprestimo', function() {
    it("calculates ValorComJuros correctly", function() {

        $emprestimo = new Emprestimo(1, new Cliente(), (new FormaDePagamento())->withJuros(0.1), '2024-08-21 17:31:22', 1000);
        
        expect($emprestimo->valorComJuros)->toBe(1100.00);
    });

    it("creates Parcelas correctly", function() {

        $parcelas = Emprestimo::calcularParcelas(10000, (new FormaDePagamento())->withJuros(0.1)->withMeses(3));
        
        expect($parcelas)->toBeAn('array');
        expect(count($parcelas))->toBe(3);
        expect($parcelas[0])->toBeAnInstanceOf(Parcela::class);
        expect($parcelas[0]->valor)->toBe(3666.67);
        expect($parcelas[1])->toBeAnInstanceOf(Parcela::class);
        expect($parcelas[1]->valor)->toBe(3666.67);
        expect($parcelas[2])->toBeAnInstanceOf(Parcela::class);
        expect($parcelas[2]->valor)->toBe(3666.66);
    });
});
?>