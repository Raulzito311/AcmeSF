import { emprestimosService } from "../emprestimo/EmprestimosService";
import { ListarEmprestimosView } from "./ListarEmprestimosView";

export class ControllerListarEmprestimos {

    private view: ListarEmprestimosView;

    constructor() {
        this.view = new ListarEmprestimosView();
    }

    public async init(): Promise<void> {
        await this.view.load();
        
        this.view.listarEmprestimos(await emprestimosService.buscarTodos());
    }
}