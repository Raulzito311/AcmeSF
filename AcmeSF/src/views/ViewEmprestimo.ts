import { Emprestimo } from "../models/Emprestimo";

export class ViewEmprestimo {
    public async listarEmprestimos(emprestimos: Array<Emprestimo>): Promise<void> {
        const listagem = await fetch('../../html/listaEmprestimos.html');
        const lista = await listagem.text();
    
        document.querySelector("main")!.innerHTML = lista;
        const tbody = document.querySelector('tbody');
    }
}