import { describe, it, expect } from 'vitest';
import { Emprestimo } from '../../src/emprestimo/Emprestimo';
import { FormaDePagamento } from '../../src/formaDePagamento/FormaDePagamento';
import { Cliente } from '../../src/cliente/Cliente';

describe('Emprestimo', () => {
    describe('Valida Valor pelo metodo statico validar valor da classe e,prestimo', () => {

        it('Valor invalido', async () => {
            const isValid = Emprestimo.validarValor(-50);

            expect(isValid).toEqual(false);
        });

        it('Valor fora da margem permitida', async () => {
            const isValid = Emprestimo.validarValor(500000);

            expect(isValid).toEqual(false);
        });

        it('Valor valido', async () => {
            const isValid = Emprestimo.validarValor(2000);

            expect(isValid).toEqual(true);
        });

    });
});