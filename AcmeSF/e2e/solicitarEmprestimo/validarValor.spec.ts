import { expect, test } from '@playwright/test';
import { logarNoSistema } from '../util';

test.beforeEach('vai para a página de solicitar emprestimo', async ({page}) => {
    await logarNoSistema(page);

    await page.click('#solicitar');

    await page.waitForTimeout(2000);
});

test.describe( 'validar valor', () => {
    test( 'valor vazio', async ({page}) => {
        await page.fill('#valorEmprestimo', '');
        await page.keyboard.press('Tab');

        await expect(page.locator('#invalidValor')).toContainText('Por favor, insira o valor do emprestimo');
    });
    test( 'valor fora da margem aceita', async ({page}) => {
        await page.fill('#valorEmprestimo', '100');
        await page.keyboard.press('Tab');

        await expect(page.locator('#invalidValor')).toContainText('Por favor, insira um valor entre R$ 500,00 e R$ 50.000,00');
    });

    test( 'valor fora da margem aceita 2', async ({page}) => {
        await page.fill('#valorEmprestimo', '-1');
        await page.keyboard.press('Tab');

        await expect(page.locator('#invalidValor')).toContainText('Por favor, insira um valor entre R$ 500,00 e R$ 50.000,00');
    });

    test( 'valor fora da margem aceita 3', async ({page}) => {
        await page.fill('#valorEmprestimo', '100000');
        await page.keyboard.press('Tab');

        await expect(page.locator('#invalidValor')).toContainText('Por favor, insira um valor entre R$ 500,00 e R$ 50.000,00');
    });
});