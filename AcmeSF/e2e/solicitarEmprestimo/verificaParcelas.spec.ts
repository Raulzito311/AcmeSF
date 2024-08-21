import { expect, test } from '@playwright/test';
import { logarNoSistema } from '../util';

test.beforeEach('vai para a página de solicitar emprestimo', async ({page}) => {
    await logarNoSistema(page);

    await page.click('#solicitar');

    await page.waitForTimeout(2000);
});

test.describe( 'verifica parcelas', () => {
    test( 'verifica se mostra as parcelas', async ({page}) => {
        await page.fill('#valorEmprestimo', '1000');
        await page.keyboard.press('Tab');
    
        await page.selectOption('#formaDePagamento', '5');

        await page.waitForTimeout(1000);

        await expect(page.locator('#parcelas')).toContainText('Parcelas:');
    });
});