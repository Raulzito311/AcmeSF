import { expect, test } from '@playwright/test';
import { logarNoSistema } from '../util';


test.describe( 'solicitar emprestimo', () => {

    test( 'solicitar emprestimo', async ({page}) => {
        await logarNoSistema(page);
    
        await page.click('#solicitar');

        await page.waitForTimeout(2000);
    
        await page.fill('#cpf', '06214836725');

        await page.waitForTimeout(1000);

        await page.fill('#valorEmprestimo', '4499.99');

        await page.waitForTimeout(1000);

        await page.focus('#formaDePagamento');

        await page.selectOption('#formaDePagamento', '5');

        await page.waitForTimeout(1000);
    
        await page.click('#realizarEmprestimo'); // Aparentemente não está clicando no botão...

        await page.waitForTimeout(2000);

        await expect(page.locator('.alert-success')).toContainText('Empréstimo realizado com sucesso');

        const firstRow = await page.locator('table tbody tr:nth-child(1) td').all();
        
        const nome = await firstRow[1].innerText();
        expect(nome).toContain('Raul Fernandes');

        const cpf = await firstRow[2].innerText();
        expect(cpf).toContain('062.148.367-25');

        const valorEmprestimo = await firstRow[3].innerText();
        expect(valorEmprestimo).toContain('4.499,99');

        const formaDePagamento = await firstRow[4].innerText();
        expect(formaDePagamento).toContain('5 vezes');

        const valorFinal = await firstRow[5].innerText();
        expect(valorFinal).toContain('4.837,49');
    });
});