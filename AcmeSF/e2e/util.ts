import { Page } from "@playwright/test";

export async function logarNoSistema(page: Page) {
    await page.goto('http://localhost:5173/');

    await page.waitForTimeout(1000);

    await page.fill('#login', 'raul');
    await page.fill('#senha', '123456');

    await page.click('#entrar');

    await page.waitForTimeout(3000);
}