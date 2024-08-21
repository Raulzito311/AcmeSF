import { expect, test } from '@playwright/test';
import { logarNoSistema } from '../util';

test.describe( 'verificar tela de relatório de empréstimos', () => {
    test.beforeEach('vai para a página de relatório de empréstimos', async ({page}) => {
        await logarNoSistema(page, true);

        await page.click('#relatorioEmprestimos');

        await page.waitForTimeout(1500);
    });

    test( 'verifica se redireciona para a página correta', async ({page}) => {
        await expect(page.locator('h3')).toContainText('Relatório de Empréstimos');
    });

    test( 'verifica se grafico está hidden', async ({page}) => {
        await expect(page.locator('#graficoRelatorio')).not.toBeVisible();
    });

    test( 'verifica se div resumo está hidden', async ({page}) => {
        await expect(page.locator('#resumo')).not.toBeVisible();
    });

    test( 'verifica se tabela de dados está hidden', async ({page}) => {
        await expect(page.locator('#dados')).not.toBeVisible();
    });

    test( 'exibe grafico e div resumo após gerar relatorio', async ({page}) => {
        await page.click('#gerarRelatorio');

        await page.waitForTimeout(2000);
        
        await expect(page.locator('#graficoRelatorio')).toBeVisible();
        await expect(page.locator('#resumo')).toBeVisible();
    });

    test( 'exibe tabela de dados após mostrar dados', async ({page}) => {
        await page.click('#gerarRelatorio');

        await page.waitForTimeout(2000);
    
        await page.click('#mostrarDados');
        
        await expect(page.locator('#dados')).toBeVisible();
    });
});