/**
 * ref: https://dicasdeprogramacao.com.br/algoritmo-para-validar-cpf/
 */
export function validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D+/g, '');
    if (cpf.length !== 11) return false;

    if (/^(\d)\1{10}$/.test(cpf)) 
        return false; // Verifica sequências iguais

    let soma: number = 0;
    let resto: number;

    for (let i: number = 0; i < 9; i++) 
        soma += parseInt(cpf.substring(i, i + 1)) * (10 - i);

    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) 
        resto = 0;

    if (resto !== parseInt(cpf.substring(9, 10))) 
        return false;

    soma = 0;

    for (let i = 0; i < 10; i++) 
        soma += parseInt(cpf.substring(i, i + 1)) * (11 - i);

    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) 
        resto = 0;

    if (resto !== parseInt(cpf.substring(10, 11))) 
        return false;

    return true;
}