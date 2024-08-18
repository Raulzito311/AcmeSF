import { Credenciais } from "../auth/Credenciais.ts";
import { carregarPaginaDeCadastrarCliente } from "../cadastrarCliente/cadastrarCliente.ts";
import { Emprestimo } from "../emprestimo/Emprestimo.ts";
import { carregarPaginaDeListarEmprestimos } from "../listarEmprestimos/listarEmprestimos.ts";
import { carregarPaginaDeSolicitarEmprestimo } from "../solicitarEmprestimo/solicitarEmprestimo.ts";
import { View } from "../util/View.ts";

export class NavView extends View {

    private podeAcessarRelatorioEmprestimos: boolean;

    constructor(podeAcessarRelatorioEmprestimos: boolean) {
        super('nav', 'header');
        this.podeAcessarRelatorioEmprestimos = podeAcessarRelatorioEmprestimos;
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

        if (this.podeAcessarRelatorioEmprestimos) {
            const relatorioEmprestimos = <HTMLAnchorElement> document.getElementById('relatorioEmprestimos');
            relatorioEmprestimos.classList.remove('invisible');
            relatorioEmprestimos.addEventListener('click', () => {
                // carregarPaginaDeRelatorioDeEmprestimos();
            });
        }

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
    
}