import { expect, test } from '@playwright/test';
import { logarNoSistema } from '../util';

test.describe( 'verifica parcelas', () => {
    test( 'verifica se mostra as parcelas', async ({page}) => {
        await logarNoSistema(page);
    
        await page.click('#solicitar');

        await page.fill('#valorEmprestimo', '1000');
        await page.keyboard.press('Tab');
    
        await page.selectOption('#formaDePagamento', '5');

        await page.waitForTimeout(1000);

        expect(page.locator('#parcelas')).toContainText('Valor Final: R$ 1.075,00');
    });
});


