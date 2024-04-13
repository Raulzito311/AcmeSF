import { emprestimosService } from "../services/EmprestimosService";
import { ListarEmprestimosView } from "../views/ListarEmprestimosView";

export class ControllerListarEmprestimos {

    private view: ListarEmprestimosView;

    constructor() {
        this.view = new ListarEmprestimosView();

        this.init();
    }

    public async init(): Promise<void> {
        this.view.listarEmprestimos(await emprestimosService.buscarTodos());
    }
}