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

        const firstRow = await page.locator('table tbody tr:nth-child(1) td').all();
        
        const nome = await firstRow[1].innerText();
        expect(nome).toContain('Raul Fernandes');

        const cpf = await firstRow[2].innerText();
        expect(cpf).toContain('062.148.367-25');

        const valorEmprestimo = await firstRow[3].innerText();
        expect(valorEmprestimo).toContain('4499.99');

        const formaDePagamento = await firstRow[4].innerText();
        expect(formaDePagamento).toContain('5 vezes');

        const valorFinal = await firstRow[5].innerText();
        expect(valorFinal).toContain('4837.49');
    });
});