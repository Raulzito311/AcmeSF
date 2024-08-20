import { expect, test } from '@playwright/test';
import { logarNoSistema } from '../util';


test.describe( 'cadastrar cliente', () => {

    test( 'cadastrar cliente', async ({page}) => {
        await logarNoSistema(page);
    
        await page.click('#cadastrarCliente');

        await page.waitForTimeout(2000);
    
        await page.fill('#nome', 'Teste E2E');
        await page.keyboard.press('Tab');

        await page.fill('#cpf', '04387345721');
        await page.keyboard.press('Tab');

        await page.fill('#dataNascimento', '1974-04-11');
        await page.keyboard.press('Tab');

        await page.fill('#telefone', '(22) 99999-9999');
        await page.keyboard.press('Tab');

        await page.fill('#email', 'teste@gmail.com');
        await page.keyboard.press('Tab');

        await page.fill('#endereco', 'Rua dos Testes 1234');
        await page.keyboard.press('Tab');

        await page.fill('#limiteCredito', '50000');
        await page.keyboard.press('Tab');
    
        await page.click('#cadastrar'); // Aparentemente não está clicando no botão...

        await page.waitForTimeout(2000);

        await expect(page.locator('.alert-success')).toContainText('Cliente cadastrado com sucesso');
    });
});