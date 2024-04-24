import { expect, test } from '@playwright/test';


test.describe( 'realizar emprestimo', () => {

    test( 'realizar emprestimo', async ({page}) => {

        await page.goto('http://localhost:5173/');

        await page.waitForTimeout(2000);
    
        await page.click('#solicitar');

        await page.waitForTimeout(2000);
    
        await page.fill('#cpf', '06214836725');
        await page.fill('#valorEmprestimo', '4499.99');
        await page.selectOption('#formaDePagamento', '5');

        await page.waitForTimeout(1000);
    
        await page.click('#realizarEmprestimo');

        await page.waitForTimeout(1500);
    
        const alert = await page.$('.alert');

        expect(alert).not.toBeNull();

        const text = await alert!.textContent();

        expect(text).toContain('Empréstimo realizado com sucesso');
    });
});