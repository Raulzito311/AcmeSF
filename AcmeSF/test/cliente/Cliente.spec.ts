import { describe, it, expect } from 'vitest';
import { Cliente } from '../../src/cliente/Cliente';

describe('Cliente', () => {
    describe('Calcula idade do cliente corretamente', () => {

        it('quando aniversário já passou este ano', async () => {
            const today = new Date();
            const cliente = new Cliente(1, 'teste', 'teste', new Date(today.getFullYear() - 20, today.getMonth() - 1, today.getDate() - 1), 'teste', 'teste', 'teste', 50, 50);

            expect(cliente.idade).toBe(20);
        });

        it('quando aniversário ainda não passou este ano', async () => {
            const today = new Date();
            const cliente = new Cliente(1, 'teste', 'teste', new Date(today.getFullYear() - 20, today.getMonth() + 1, today.getDate() + 1), 'teste', 'teste', 'teste', 50, 50);

            expect(cliente.idade).toBe(19);
        });

    });
});