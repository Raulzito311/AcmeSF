import { expect, test } from '@playwright/test';
import { logarNoSistema } from '../util';

test.describe( 'verificar tela de login', () => {

    test( 'verifica se cai na tela de login', async ({page}) => {
        await page.goto('http://localhost:5173/');

        await page.waitForTimeout(1000);

        const logo = await page.$('#main-logo');

        expect(logo).not.toBeNull();
    });

    test( 'Dá erro no tamanho da senha', async ({page}) => {
        await page.goto('http://localhost:5173/');

        await page.waitForTimeout(1000);

        await page.fill('#login', 'raul');
        await page.fill('#senha', '12345');

        await page.click('#entrar');

        await page.waitForTimeout(1000);

        expect(page.locator('#invalidSenha')).toBeVisible();

        expect(page.locator('#invalidSenha')).toContainText('A senha deve conter pelo menos 6 digitos');
    });

    test( 'Dá erro para senha errada', async ({page}) => {
        await page.goto('http://localhost:5173/');

        await page.waitForTimeout(1000);

        await page.fill('#login', 'raul');
        await page.fill('#senha', '1234567');

        await page.click('#entrar');

        await page.waitForTimeout(1000);

        expect(page.locator('.alert-danger')).toBeVisible();

        expect(page.locator('.alert-danger')).toContainText('Login ou senha inválidos');
    });

    test( 'faz login corretamente', async ({page}) => {
        await logarNoSistema(page);

        expect(page.locator('h3')).toContainText('Listagem de Empréstimos');
    });
});