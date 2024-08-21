import { expect, test } from '@playwright/test';
import { logarNoSistema } from '../util';

test.describe( 'verificar acesso ao relatório de empréstimos', () => {

    test( 'verifica acesso de funcionario', async ({page}) => {
        await logarNoSistema(page);

        await expect(page.locator('#relatorioEmprestimos')).not.toBeVisible();
    });

    test( 'verifica acesso de gerente', async ({page}) => {
        await logarNoSistema(page, true);

        await expect(page.locator('#relatorioEmprestimos')).toBeVisible();
    });
});