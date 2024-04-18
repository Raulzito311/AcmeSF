import { emprestimosService } from "../emprestimo/EmprestimosService";
import { ListarEmprestimosView } from "./ListarEmprestimosView";

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