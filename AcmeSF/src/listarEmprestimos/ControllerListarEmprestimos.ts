import { emprestimosService } from "../emprestimo/EmprestimosService";
import { carregarPaginaDeLogin } from "../login/login";
import { showNav } from "../nav/nav";
import { Controller } from "../util/Controller";
import { ListarEmprestimosView } from "./ListarEmprestimosView";

export class ControllerListarEmprestimos extends Controller {

    protected view: ListarEmprestimosView;

    constructor() {
        super();
        this.view = new ListarEmprestimosView();
    }

    public async init(): Promise<void> {
        try {
            const emprestimos = await emprestimosService.buscarTodos();

            showNav();
            await this.view.load();
            this.view.listarEmprestimos(emprestimos);
        } catch (errorMessage) {
            console.log(errorMessage);
            
            carregarPaginaDeLogin();
        }
    }
}