import { describe, it, expect } from 'vitest';
import * as cpfUtil from '../../../src/util/cpfUtil';

describe('cpfUtil', () => {
    describe('validarCPF', () => {

        it('retorna true para cpf válido', async () => {
            expect(cpfUtil.validarCPF('182.198.228-21')).toBeTruthy();
        });

        it('retorna false para cpf inválido', async () => {
            expect(cpfUtil.validarCPF('738.728.764-83')).toBeFalsy();
        });

        it('retorna false para cpf com numeros repetidos', async () => {
            expect(cpfUtil.validarCPF('222.222.222-22')).toBeFalsy();
        });

    });
});