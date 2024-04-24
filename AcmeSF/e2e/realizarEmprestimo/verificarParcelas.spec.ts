import { expect, test } from '@playwright/test';

test.describe( 'verifica parcelas', () => {
    test( 'verifica se mostra as parcelas', async ({page}) => {
        
        await page.goto('http://localhost:5173/');
    
        await page.click('#solicitar');
    
        const cpfInput = await page.$('#cpf');
        await cpfInput!.fill("063.556.107.74");
        await page.keyboard.press('Tab');
        await page.waitForTimeout(2000);

        await page.fill('#valorEmprestimo', '1000');
        await page.keyboard.press('Tab');
    
        await page.selectOption('#formaDePagamento', '1');
        await page.keyboard.press('Tab');

        const mensagem = await page.$('#parcelas');


        expect(mensagem).not.toBeNull();

        const text = await mensagem!.textContent();

        expect(text).toContain('Parcelas:');
    });
});


