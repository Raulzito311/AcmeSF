import { Cliente } from "../models/Cliente";
import { Emprestimo } from "../models/Emprestimo";
import { FormaDePagamento } from "../models/FormaDePagamento";

export class View {
    private main: HTMLElement;

    constructor() {
        this.main = document.querySelector('main')!;
    }

    protected async carregarConteudo(path: string): Promise<void> {
        const conteudo = await fetch(`/src/views/html/${path}`);
        const html = await conteudo.text();
    
        this.main.innerHTML = html;
    }
    
}