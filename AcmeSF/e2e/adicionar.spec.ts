import { expect, test } from '@playwright/test';


test.describe( 'validar cpf', () => {

    test( 'cpf invalido', async ({page}) => {

        await page.goto('http://localhost:5173/');
    
        await page.click('#solicitar');
    
        const cpfInput = await page.$('#cpf');
        await cpfInput!.fill("999.999.999-99");
        await page.keyboard.press('Tab');
    
        const mensagem = await page.$('#invalidCpf');

        expect(mensagem).not.toBeNull();

        const text = await mensagem!.textContent();

        expect(text).toContain('Por favor, insira um CPF válido');
    });

    test( 'cpf valido mas não pertence a nenhum cliente cadastrado', async ({page}) => {

        await page.goto('http://localhost:5173/');
    
        await page.click('#solicitar');

        const cpfInput = await page.$('#cpf');
        await cpfInput!.fill("987.084.260-74");
        await page.keyboard.press('Tab');
        await page.waitForTimeout(2000);
    
        const mensagem = await page.$('#invalidCpf');

        expect(mensagem).not.toBeNull();

        const text = await mensagem!.textContent();

        expect(text).toContain('Por favor, insira o CPF de um cliente já cadastrado');
    });

    test( 'Cpf vazio', async ({page}) => {
        
        await page.goto('http://localhost:5173/');
    
        await page.click('#solicitar');
    
        const cpfInput = await page.$('#cpf');
        await cpfInput!.fill("");
        await page.keyboard.press('Tab');
    
        const mensagem = await page.$('#invalidCpf');

        expect(mensagem).not.toBeNull();

        const text = await mensagem!.textContent();

        expect(text).toContain('Por favor, insira o cpf do cliente');
    });
});

test.describe( 'validar valor', () => {
    test( 'valor vazio', async ({page}) => {
        
        await page.goto('http://localhost:5173/');
    
        await page.click('#solicitar');
    
        const cpfInput = await page.$('#cpf');
        await cpfInput!.fill("063.556.107.74");
        await page.keyboard.press('Tab');
        await page.waitForTimeout(2000);

        await page.fill('#valorEmprestimo', '');
        await page.keyboard.press('Tab');
    
        const mensagem = await page.$('#invalidValor');

        expect(mensagem).not.toBeNull();

        const text = await mensagem!.textContent();

        expect(text).toContain('Por favor, insira o valor do emprestimo');
    });
    test( 'valor fora da margem aceita', async ({page}) => {
        
        await page.goto('http://localhost:5173/');
    
        await page.click('#solicitar');
    
        const cpfInput = await page.$('#cpf');
        await cpfInput!.fill("063.556.107.74");
        await page.keyboard.press('Tab');
        await page.waitForTimeout(2000);

        await page.fill('#valorEmprestimo', '100');
        await page.keyboard.press('Tab');
    
        const mensagem = await page.$('#invalidValor');

        expect(mensagem).not.toBeNull();

        const text = await mensagem!.textContent();

        expect(text).toContain('Por favor, insira um valor entre R$ 500,00 e R$ 50.000,00');
    });

    test( 'valor fora da margem aceita 2', async ({page}) => {
        
        await page.goto('http://localhost:5173/');
    
        await page.click('#solicitar');
    
        const cpfInput = await page.$('#cpf');
        await cpfInput!.fill("063.556.107.74");
        await page.keyboard.press('Tab');
        await page.waitForTimeout(2000);

        await page.fill('#valorEmprestimo', '-1');
        await page.keyboard.press('Tab');
    
        const mensagem = await page.$('#invalidValor');

        expect(mensagem).not.toBeNull();

        const text = await mensagem!.textContent();

        expect(text).toContain('Por favor, insira um valor entre R$ 500,00 e R$ 50.000,00');
    });

    test( 'valor fora da margem aceita 3', async ({page}) => {
        
        await page.goto('http://localhost:5173/');
    
        await page.click('#solicitar');
    
        const cpfInput = await page.$('#cpf');
        await cpfInput!.fill("063.556.107.74");
        await page.keyboard.press('Tab');
        await page.waitForTimeout(2000);

        await page.fill('#valorEmprestimo', '100000');
        await page.keyboard.press('Tab');
    
        const mensagem = await page.$('#invalidValor');

        expect(mensagem).not.toBeNull();

        const text = await mensagem!.textContent();

        expect(text).toContain('Por favor, insira um valor entre R$ 500,00 e R$ 50.000,00');
    });
});


