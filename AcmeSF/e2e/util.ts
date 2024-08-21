import { Page } from "@playwright/test";

export async function logarNoSistema(page: Page, logarComoGerente = false) {
    await page.goto('http://localhost:5173/');

    await page.waitForTimeout(1000);

    if (logarComoGerente) {
        await page.fill('#login', 'admin');
        await page.fill('#senha', 'admin#');
    } else {
        await page.fill('#login', 'raul');
        await page.fill('#senha', '123456');
    }
    

    await page.click('#entrar');

    await page.waitForTimeout(3000);
}