<?php
    require_once "vendor/autoload.php";
    
    describe('Empréstimo', function() {
        describe('gerarValorFinal', function() {
    
            it('gera o valor final corretamente', function() {
                $cliente = new Cliente(1, '07462898595', 'Rodrigo Jorge', new DateTime('1983-04-22'));
                $formaDePagamento = new FormaDePagamento(3, '3 vezes', 3, 0.1);
                $emprestimo = new Emprestimo(1, $cliente, 1000.00, $formaDePagamento, new DateTime());
                expect($emprestimo->getValorFinal())->toEqual(1100.00);
            });
            it('gera o valor final corretamente 2', function() {
                $cliente = new Cliente(2, '07462898595', 'Raul Fernandes', new DateTime('1983-04-22'));
                $formaDePagamento = new FormaDePagamento(3, '6 vezes', 6, 0.2);
                $emprestimo = new Emprestimo(1, $cliente, 1000.00, $formaDePagamento, new DateTime());
                expect($emprestimo->getValorFinal())->toEqual(1200.00);
            });     
        });
    });
?>