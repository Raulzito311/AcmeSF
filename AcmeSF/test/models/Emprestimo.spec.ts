import { describe, it, expect } from 'vitest';
import { Emprestimo } from '../../src/models/Emprestimo';
import { FormaDePagamento } from '../../src/models/FormaDePagamento';

describe('Emprestimo', () => {
    describe('gerarParcelas', () => {

        it('gera o valor final corretamente', async () => {
            const formaDePagamento: FormaDePagamento = {
                "id": 3,
                "descricao": "3 vezes",
                "meses": 3,
                "juros": 0.10
            };
            const emprestimo = new Emprestimo(1, 1000.00, formaDePagamento, new Date());

            expect(emprestimo.valorFinal).toEqual(1100.00);
        });

        it('gera as parcelas corretamente', async () => {
            const formaDePagamento: FormaDePagamento = {
                "id": 3,
                "descricao": "3 vezes",
                "meses": 3,
                "juros": 0.10
            };
            const emprestimo = new Emprestimo(1, 1000.00, formaDePagamento, new Date());

            expect(emprestimo.parcelas[0]).toEqual(366.67);
            expect(emprestimo.parcelas[1]).toEqual(366.67);
            expect(emprestimo.parcelas[2]).toEqual(366.66);
        });

    });
});