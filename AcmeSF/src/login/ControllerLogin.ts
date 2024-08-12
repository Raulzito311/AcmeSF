import { authService } from "../auth/AuthService";
import { Credenciais } from "../auth/Credenciais";
import { carregarPaginaDeListarEmprestimos } from "../listarEmprestimos/listarEmprestimos";
import { Controller } from "../util/Controller";
import { LoginView } from "./LoginView";

export class ControllerLogin extends Controller {

    protected view: LoginView;

    constructor() {
        super();
        this.view = new LoginView();
    }

    public async init(): Promise<void> {
        await this.view.load();

        this.view.adicionarListenerParaLogin(async (credenciais: Credenciais) => {
            try {
                await authService.login(credenciais);
            } catch (errorMessage) {
                this.view.alert(<string> errorMessage, 'danger');
                return;
            }
                    
            await carregarPaginaDeListarEmprestimos();
        });
    }
}