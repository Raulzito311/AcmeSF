import { expect, test } from '@playwright/test';


test.describe( 'Adicionar emprestimo', () => {

    test( 'cpf invalido', async ({page}) => {
        
        // Navegar para a página
        await page.goto('http://localhost:5173/');
    
        await page.click('#solicitar');
    
    
        // Inserir informações nos inputs
        await page.fill('#cpf', '111.111.111-11');
        await page.keyboard.press('Tab');
    
        const mensagem = await page.$('.invalid-feedback');

        expect(mensagem).not.toBeNull();

        const text = await mensagem!.textContent();

        expect(text).toContain('Por favor, insira um CPF válido');
    });

    test( 'cpf valido mas não pertence a nenhum cliente cadastrado', async ({page}) => {
        
        // Navegar para a página
        await page.goto('http://localhost:5173/');
    
        await page.click('#solicitar');
    
    
        // Inserir informações nos inputs
        await page.fill('#cpf', '987.084.260-74');
        await page.keyboard.press('Tab');
    
        const mensagem = await page.$('.invalid-feedback');

        expect(mensagem).not.toBeNull();

        const text = await mensagem!.textContent();

        expect(text).toContain('Por favor, insira o CPF de um cliente já cadastrado');
    });

});