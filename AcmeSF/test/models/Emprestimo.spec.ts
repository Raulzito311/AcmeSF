import { describe, it, expect } from 'vitest';
import { Emprestimo } from '../../src/emprestimo/Emprestimo';
import { FormaDePagamento } from '../../src/formaDePagamento/FormaDePagamento';
import { Cliente } from '../../src/cliente/Cliente';

describe('Emprestimo', () => {
    describe('gerarValorFinal', () => {

        it('gera o valor final corretamente', async () => {
            const cliente = new Cliente(1, '074.628.985-95', 'Álvaro Silva', new Date('1983-04-22'));
            const formaDePagamento = new FormaDePagamento(1, '5 vezes', 5, 0.1);
            const emprestimo = new Emprestimo(1, cliente, 1000.00, formaDePagamento, new Date());

            expect(emprestimo.valorFinal).toEqual(1100.00);
        });

        it('gera o valor final corretamente', async () => {
            const cliente = new Cliente(1, '074.628.985-95', 'Álvaro Silva', new Date('1983-04-22'));
            const formaDePagamento = new FormaDePagamento(2, '4 vezes', 4, 0.2);
            const emprestimo = new Emprestimo(1, cliente, 1000.00, formaDePagamento, new Date());

            expect(emprestimo.valorFinal).toEqual(1200.00);
        });
    });
    describe('gerarParcelas', () => {

        it('gera as parcelas corretamente', async () => {
            const cliente = new Cliente(1, '074.628.985-95', 'Álvaro Silva', new Date('1983-04-22'));
            const formaDePagamento = new FormaDePagamento(3, '3 vezes', 3, 0.1);
            const emprestimo = new Emprestimo(1, cliente, 1000.00, formaDePagamento, new Date());

            expect(emprestimo.parcelas[0]).toEqual(366.67);
            expect(emprestimo.parcelas[1]).toEqual(366.67);
            expect(emprestimo.parcelas[2]).toEqual(366.66);
        });

        it('gera as parcelas corretamente', async () => {
            const cliente = new Cliente(1, '074.628.985-95', 'Álvaro Silva', new Date('1983-04-22'));
            const formaDePagamento = new FormaDePagamento(3, '4 vezes', 4, 0.15);
            const emprestimo = new Emprestimo(1, cliente, 2000.00, formaDePagamento, new Date());

            expect(emprestimo.parcelas[0]).toEqual(575.00);
            expect(emprestimo.parcelas[1]).toEqual(575.00);
            expect(emprestimo.parcelas[2]).toEqual(575.00);
            expect(emprestimo.parcelas[3]).toEqual(575.00);

        });

        it('gera as parcelas corretamente', async () => {
            const cliente = new Cliente(1, '074.628.985-95', 'Álvaro Silva', new Date('1983-04-22'));
            const formaDePagamento = new FormaDePagamento(3, '10 vezes', 10, 0.25);
            const emprestimo = new Emprestimo(1, cliente, 10000.00, formaDePagamento, new Date());

            expect(emprestimo.parcelas[0]).toEqual(1250.00);
            expect(emprestimo.parcelas[1]).toEqual(1250.00);
            expect(emprestimo.parcelas[2]).toEqual(1250.00);
            expect(emprestimo.parcelas[3]).toEqual(1250.00);
            expect(emprestimo.parcelas[4]).toEqual(1250.00);
            expect(emprestimo.parcelas[5]).toEqual(1250.00);
            expect(emprestimo.parcelas[6]).toEqual(1250.00);
            expect(emprestimo.parcelas[7]).toEqual(1250.00);
            expect(emprestimo.parcelas[8]).toEqual(1250.00);
            expect(emprestimo.parcelas[9]).toEqual(1250.00);

        });

    });
});