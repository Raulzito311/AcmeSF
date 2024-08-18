import { describe, it, expect } from 'vitest';
import { Emprestimo } from '../../src/emprestimo/Emprestimo';

describe('Emprestimo', () => {
    describe('Valida Valor pelo metodo statico validarValor() da classe Emprestimo', () => {

        it('Valor abaixo de 500', async () => {
            const isValid = Emprestimo.validarValor(-50);

            expect(isValid).toEqual(false);
        });

        it('Valor acima de 50000', async () => {
            const isValid = Emprestimo.validarValor(500000);

            expect(isValid).toEqual(false);
        });

        it('Valor valido', async () => {
            const isValid = Emprestimo.validarValor(2000);

            expect(isValid).toEqual(true);
        });

    });
});