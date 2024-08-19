import { expect, test } from '@playwright/test';
import { logarNoSistema } from '../util';

test.describe( 'verificar tela de listagem', () => {

    test( 'verifica se cai na tela de listagem', async ({page}) => {
        await logarNoSistema(page);
    
        const mensagem = await page.$('h3');
        const botao = await page.$('#solicitar');

        expect(mensagem).not.toBeNull();
        expect(botao).not.toBeNull();

        const textoMensagem = await mensagem!.textContent();
        const textobotao = await botao!.textContent();

        expect(textoMensagem).toContain('Listagem de Empréstimos');
        expect(textobotao).toContain('Realizar Novo Empréstimo');
    });

    test( 'verifica se a tabela esta visisvel', async ({page}) => {
        await logarNoSistema(page);
    
        const tabela = await page.$('.table');

        expect(tabela).not.toBeNull();
        await expect(page.locator(".table")).toBeVisible();
    });
});