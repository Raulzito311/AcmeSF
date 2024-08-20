import { authService } from "../auth/AuthService";
import { Permissao } from "../auth/Permissao";
import { carregarPaginaDeLogin } from "../login/login";
import { Controller } from "../util/Controller";
import { NavView } from "./NavView";

export class ControllerNav extends Controller {

    protected view: NavView;

    constructor() {
        super();
        this.view = new NavView(); // TODO: Checar se user tá logado
    }

    public async init(): Promise<void> {
        await this.view.load();

        try {
            const usuarioLogado = await authService.getUsuarioLogado();
    
            if (usuarioLogado.permissao === Permissao.GERENTE)
                this.view.liberarAcessoAoRelatorioDeEmprestimos();
        } catch (errorMessage) {
            console.log(errorMessage);
            
            carregarPaginaDeLogin();
        }

        this.view.adicionarListenerParaLogout(async () => {
            try {
                await authService.logout();
            } catch (errorMessage) {
                this.alert(<string> errorMessage, 'danger');
                return;
            }
                    
            await carregarPaginaDeLogin();
        });

        this.view.show();
    }

    public hide(): void {
        this.view.hide();
    }
}