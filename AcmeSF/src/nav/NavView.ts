import { Credenciais } from "../auth/Credenciais.ts";
import { Emprestimo } from "../emprestimo/Emprestimo.ts";
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
    
}