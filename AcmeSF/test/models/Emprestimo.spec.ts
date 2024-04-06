import { describe, it, expect } from 'vitest';
import { Emprestimo } from '../../src/models/Emprestimo';
import { FormaDePagamento } from '../../src/models/FormaDePagamento';
import { Cliente } from '../../src/models/Cliente';

describe('Emprestimo', () => {
    describe('gerarParcelas', () => {

        it('gera o valor final corretamente', async () => {
            const cliente = new Cliente(1, '074.628.985-95', 'Álvaro Silva', new Date('1983-04-22'));
            const formaDePagamento = new FormaDePagamento(3, '3 vezes', 3, 0.1);
            const emprestimo = new Emprestimo(1, cliente, 1000.00, formaDePagamento, new Date());

            expect(emprestimo.valorFinal).toEqual(1100.00);
        });

        it('gera as parcelas corretamente', async () => {
            const cliente = new Cliente(1, '074.628.985-95', 'Álvaro Silva', new Date('1983-04-22'));
            const formaDePagamento = new FormaDePagamento(3, '3 vezes', 3, 0.1);
            const emprestimo = new Emprestimo(1, cliente, 1000.00, formaDePagamento, new Date());

            expect(emprestimo.parcelas[0]).toEqual(366.67);
            expect(emprestimo.parcelas[1]).toEqual(366.67);
            expect(emprestimo.parcelas[2]).toEqual(366.66);
        });

    });
});