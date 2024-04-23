import { emprestimosService } from "../emprestimo/EmprestimosService";
import { Controller } from "../util/Controller";
import { ListarEmprestimosView } from "./ListarEmprestimosView";

export class ControllerListarEmprestimos extends Controller {

    protected view: ListarEmprestimosView;

    constructor() {
        super();
        this.view = new ListarEmprestimosView();
    }

    public async init(): Promise<void> {
        await this.view.load();
        
        try {
            this.view.listarEmprestimos(await emprestimosService.buscarTodos());
        } catch (errorMessage) {
            this.view.listarEmprestimos([]);
            this.view.alert(<string> errorMessage, 'danger', false);
        }
    }
}