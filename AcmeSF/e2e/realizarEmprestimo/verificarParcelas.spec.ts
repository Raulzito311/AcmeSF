import { expect, test } from '@playwright/test';

test.describe( 'verifica parcelas', () => {
    test( 'verifica se mostra as parcelas', async ({page}) => {
        
        await page.goto('http://localhost:5173/');
    
        await page.click('#solicitar');

        await page.fill('#valorEmprestimo', '1000');
        await page.keyboard.press('Tab');
    
        await page.selectOption('#formaDePagamento', '1');

        const mensagem = await page.$('#parcelas');

        expect(mensagem).not.toBeNull();

        const text = await mensagem!.textContent();

        expect(text).toContain('Parcelas:');
    });
});


