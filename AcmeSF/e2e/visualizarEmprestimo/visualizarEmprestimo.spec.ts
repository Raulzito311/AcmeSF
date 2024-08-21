import { expect, test } from '@playwright/test';
import { logarNoSistema } from '../util';

test.describe( 'verificar tela de visualização de empréstimo', () => {
    test.beforeEach('vai para a página de visualizar empréstimo', async ({page}) => {
        await logarNoSistema(page);

        await page.click('table tbody tr:nth-child(1)');

        await page.waitForTimeout(2000);
    });

    test( 'verifica se carrega a tela de visualização de emprestimo', async ({page}) => {
        await expect(page.locator('h3')).toContainText('Visualizar Empréstimo');
    });

    test( 'verifica se a tabela esta visisvel', async ({page}) => {
        await expect(page.locator(".table")).toBeVisible();
    });

    test( 'verifica se permite pagar parcela fora da ordem', async ({page}) => {
        const botoesPagar = await page.locator('table tbody tr td:nth-child(4) button').all();

        if (botoesPagar.length > 1) {
            await botoesPagar[botoesPagar.length - 1].click();

            await expect(page.locator('.alert-danger')).toContainText('Outra(s) parcela(s) em aberto deve(m) ser paga(s) antes');
        }
    });

    test( 'verifica pagamento da primeira parcela em aberto', async ({page}) => {
        const botoesPagar = await page.locator('table tbody tr td:nth-child(4) button').all();

        if (botoesPagar.length > 0) {
            await botoesPagar[0].click();

            await expect(page.locator('.alert-success')).toContainText('Parcela paga com sucesso');
        }
    });
});