import { authService } from "../auth/AuthService";
import { carregarPaginaDeLogin } from "../login/login";
import { Controller } from "../util/Controller";
import { NavView } from "./NavView";

export class ControllerNav extends Controller {

    protected view: NavView;

    constructor() {
        super();
        this.view = new NavView();
    }

    public async init(): Promise<void> {
        await this.view.load();

        this.view.adicionarListenerParaLogout(async () => {
            try {
                await authService.logout();
            } catch (errorMessage) {
                this.alert(<string> errorMessage, 'danger');
                return;
            }
                    
            await carregarPaginaDeLogin();
        });
    }

    public show(): void {
        this.view.show();
    }

    public hide(): void {
        this.view.hide();
    }
}