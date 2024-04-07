<?php
    require_once "vendor/autoload.php";
    
    describe('Empréstimo', function() {
        describe('gerarParcelas', function() {
    
        it('gera o valor final corretamente', function() {
            $cliente = new Cliente(1, '074.628.985-95', 'Álvaro Silva', new DateTime('1983-04-22'));
            $formaDePagamento = new FormaDePagamento(3, '3 vezes', 3, 0.1);
            $emprestimo = new Emprestimo(1, $cliente, 1000.00, $formaDePagamento, new DateTime());
            $emprestimo->calcularParcelas();
    
            expect($emprestimo->getValorFinal())->toEqual(1100.00);
        });
    
        it('gera as parcelas corretamente', function() {
            $cliente = new Cliente(1, '074.628.985-95', 'Álvaro Silva', new DateTime('1983-04-22'));
            $formaDePagamento = new FormaDePagamento(3, '3 vezes', 3, 0.1);
            $emprestimo = new Emprestimo(1, $cliente, 1000.00, $formaDePagamento, new DateTime());
            $emprestimo->calcularParcelas();
            $parcelas = $emprestimo->getParcelas();
    
            expect($parcelas[0])->toEqual(366.67);
            expect($parcelas[1])->toEqual(366.67);
            expect($parcelas[2])->toEqual(366.66);
        });

        it('gera as parcelas corretamente 2', function() {
            $cliente = new Cliente(1, '074.628.985-95', 'Álvaro Silva', new DateTime('1983-04-22'));
            $formaDePagamento = new FormaDePagamento(3, '3 vezes', 3, 0.0);
            $emprestimo = new Emprestimo(1, $cliente, 100.00, $formaDePagamento, new DateTime());
            $emprestimo->calcularParcelas();
            $parcelas = $emprestimo->getParcelas();
    
            expect($parcelas[0])->toEqual(33.34);
            expect($parcelas[1])->toEqual(33.33);
            expect($parcelas[2])->toEqual(33.33);
        });
    
        });
    });
?>