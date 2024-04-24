import { expect, test } from '@playwright/test';


test.describe( 'validar cpf', () => {

    test( 'cpf invalido', async ({page}) => {

        await page.goto('http://localhost:5173/');
    
        await page.click('#solicitar');

        await page.waitForTimeout(2000);
    
        await page.fill('#cpf', '99999999999');
        await page.keyboard.press('Tab');

        await page.waitForTimeout(2000);
    
        const mensagem = await page.$('#invalidCpf');

        expect(mensagem).not.toBeNull();

        const text = await mensagem!.textContent();

        expect(text).toContain('Por favor, insira um CPF válido');
    });

    test( 'cpf valido mas não pertence a nenhum cliente cadastrado', async ({page}) => {

        await page.goto('http://localhost:5173/');
    
        await page.click('#solicitar');

        await page.waitForTimeout(2000);

        await page.fill('#cpf', '987.084.260-74');
        await page.keyboard.press('Tab');

        await page.waitForTimeout(2000);
    
        const mensagem = await page.$('#invalidCpf');

        expect(mensagem).not.toBeNull();

        const text = await mensagem!.textContent();

        expect(text).toContain('Por favor, insira o CPF de um cliente já cadastrado');
    });

    test( 'Cpf vazio', async ({page}) => {
        
        await page.goto('http://localhost:5173/');
    
        await page.click('#solicitar');

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