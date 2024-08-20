import { Credenciais } from "../auth/Credenciais.ts";
import { carregarPaginaDeCadastrarCliente } from "../cadastrarCliente/cadastrarCliente.ts";
import { Emprestimo } from "../emprestimo/Emprestimo.ts";
import { carregarPaginaDeListarEmprestimos } from "../listarEmprestimos/listarEmprestimos.ts";
import { carregarPaginaDeRelatorioDeEmprestimos } from "../relatorioEmprestimos/relatorioEmprestimos.ts";
import { carregarPaginaDeSolicitarEmprestimo } from "../solicitarEmprestimo/solicitarEmprestimo.ts";
import { View } from "../util/View.ts";

export class NavView extends View {

    constructor() {
        super('nav', 'header');
    }

    public adicionarListenerParaLogout(fazerLogout: Function): void {
        const logoutButton = <HTMLButtonElement> document.getElementById('logout');
        logoutButton?.addEventListener('click', (event) => {
            fazerLogout();
        });
    }
    
    public show(): void {
        document.querySelector('header')?.classList.remove('hidden');
    }

    public hide(): void {
        document.querySelector('header')?.classList.add('hidden');
    }
    
    public async load(): Promise<void> {
        await super.load();

        document.getElementById('logo')?.addEventListener('click', () => {
            carregarPaginaDeListarEmprestimos();
        });
        
        document.getElementById('listarEmprestimos')?.addEventListener('click', () => {
            carregarPaginaDeListarEmprestimos();
        });

        document.getElementById('cadastrarCliente')?.addEventListener('click', () => {
            carregarPaginaDeCadastrarCliente();
        });
    }

    public liberarAcessoAoRelatorioDeEmprestimos() {
        const relatorioEmprestimos = <HTMLAnchorElement> document.getElementById('relatorioEmprestimos');
        relatorioEmprestimos.classList.remove('invisible');
        relatorioEmprestimos.addEventListener('click', () => {
            carregarPaginaDeRelatorioDeEmprestimos();
        });
    }
    
}