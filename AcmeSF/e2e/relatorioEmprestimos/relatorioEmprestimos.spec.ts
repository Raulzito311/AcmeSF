import { expect, test } from '@playwright/test';
import { logarNoSistema } from '../util';

test.describe( 'verificar tela de relatório de empréstimos', () => {

    test( 'verifica se opção de relatório de emprestimos está disponivel para funcionario', async ({page}) => {
        await logarNoSistema(page);

        expect(page.locator('#relatorioEmprestimos')).not.toBeVisible();
    });

    test( 'verifica se opção de relatório de emprestimos está disponivel para gerente', async ({page}) => {
        await logarNoSistema(page, true);

        expect(page.locator('#relatorioEmprestimos')).toBeVisible();
    });

    test( 'verifica se redireciona para a página correta', async ({page}) => {
        await logarNoSistema(page, true);

        await page.click('#relatorioEmprestimos');

        expect(page.locator('h3')).toContainText('Relatório de Empréstimos');
    });

    test( 'verifica se grafico está hidden', async ({page}) => {
        await logarNoSistema(page, true);

        await page.click('#relatorioEmprestimos');

        expect(page.locator('#graficoRelatorio')).not.toBeVisible();
    });

    test( 'verifica se div resumo está hidden', async ({page}) => {
        await logarNoSistema(page, true);

        await page.click('#relatorioEmprestimos');

        expect(page.locator('#resumo')).not.toBeVisible();
    });

    test( 'verifica se tabela de dados está hidden', async ({page}) => {
        await logarNoSistema(page, true);

        await page.click('#relatorioEmprestimos');

        expect(page.locator('#dados')).not.toBeVisible();
    });

    test( 'exibe grafico e div resumo após gerar relatorio', async ({page}) => {
        await logarNoSistema(page, true);

        await page.click('#relatorioEmprestimos');
    
        await page.click('#gerarRelatorio');
        
        expect(page.locator('#graficoRelatorio')).toBeVisible();
        expect(page.locator('#resumo')).toBeVisible();
    });

    test( 'exibe tabela de dados após mostrar dados', async ({page}) => {
        await logarNoSistema(page, true);

        await page.click('#relatorioEmprestimos');
    
        await page.click('#gerarRelatorio');

        await page.waitForTimeout(2000);
    
        await page.click('#mostrarDados');
        
        expect(page.locator('#dados')).toBeVisible();
    });
});