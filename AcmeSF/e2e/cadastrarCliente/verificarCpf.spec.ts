import { expect, test } from '@playwright/test';
import { logarNoSistema } from '../util';


test.describe( 'validar cpf', () => {

    test( 'cpf invalido', async ({page}) => {
        await logarNoSistema(page);
    
        await page.click('#cadastrarCliente');

        await page.waitForTimeout(2000);
    
        await page.fill('#cpf', '99999999999');
        await page.keyboard.press('Tab');

        await page.waitForTimeout(2000);
    
        const mensagem = await page.$('#invalidCpf');

        expect(mensagem).not.toBeNull();

        const text = await mensagem!.textContent();

        expect(text).toContain('Por favor, insira um CPF válido');
    });

    test( 'Cpf vazio', async ({page}) => {
        await logarNoSistema(page);
    
        await page.click('#cadastrarCliente');

        await page.waitForTimeout(2000);
    
        const cpfInput = await page.$('#cpf');
        await cpfInput!.fill("");
        await page.keyboard.press('Tab');

        await page.waitForTimeout(2000);
    
        const mensagem = await page.$('#invalidCpf');

        expect(mensagem).not.toBeNull();

        const text = await mensagem!.textContent();

        expect(text).toContain('Por favor, insira o cpf do cliente');
    });
});