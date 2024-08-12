import { Credenciais } from "../auth/Credenciais.ts";
import { Emprestimo } from "../emprestimo/Emprestimo.ts";
import { carregarPaginaDeSolicitarEmprestimo } from "../solicitarEmprestimo/solicitarEmprestimo.ts";
import { View } from "../util/View.ts";

export class LoginView extends View {

    constructor() {
        super('login');
    }

    public adicionarListenerParaLogin(fazerLogin: Function): void {
        const form = <HTMLFormElement> document.getElementById('formLogin');
        form?.addEventListener('submit', (event) => {
            event.preventDefault();

            form.classList.add('was-validated')

            if (!form.checkValidity()) {
                document.getElementById('invalidSenha')!.innerText = 'A senha deve conter pelo menos 6 digitos';
                return;
            }
    

            const loginInput = <HTMLInputElement> document.getElementById('login');
            const senhaInput = <HTMLInputElement> document.getElementById('senha');

            const credenciais: Credenciais = {
                login: loginInput.value,
                senha: senhaInput.value
            };

            fazerLogin(credenciais);
        });
    }
    
}