import { expect, test } from '@playwright/test';
import { logarNoSistema } from '../util';

test.describe( 'validar valor', () => {
    test( 'valor vazio', async ({page}) => {
        await logarNoSistema(page);
    
        await page.click('#solicitar');

        await page.waitForTimeout(2000);

        await page.fill('#valorEmprestimo', '');
        await page.keyboard.press('Tab');
    
        const mensagem = await page.$('#invalidValor');

        expect(mensagem).not.toBeNull();

        const text = await mensagem!.textContent();

        expect(text).toContain('Por favor, insira o valor do emprestimo');
    });
    test( 'valor fora da margem aceita', async ({page}) => {
        await logarNoSistema(page);
    
        await page.click('#solicitar');
    
        await page.waitForTimeout(2000);

        await page.fill('#valorEmprestimo', '100');
        await page.keyboard.press('Tab');

        expect(page.locator('#invalidValor')).toContainText('Por favor, insira um valor entre R$ 500,00 e R$ 50.000,00');
    });

    test( 'valor fora da margem aceita 2', async ({page}) => {
        await logarNoSistema(page);
    
        await page.click('#solicitar');
    
        await page.waitForTimeout(2000);

        await page.fill('#valorEmprestimo', '-1');
        await page.keyboard.press('Tab');

        expect(page.locator('#invalidValor')).toContainText('Por favor, insira um valor entre R$ 500,00 e R$ 50.000,00');
    });

    test( 'valor fora da margem aceita 3', async ({page}) => {
        await logarNoSistema(page);
    
        await page.click('#solicitar');
    
        await page.waitForTimeout(2000);

        await page.fill('#valorEmprestimo', '100000');
        await page.keyboard.press('Tab');

        expect(page.locator('#invalidValor')).toContainText('Por favor, insira um valor entre R$ 500,00 e R$ 50.000,00');
    });
});