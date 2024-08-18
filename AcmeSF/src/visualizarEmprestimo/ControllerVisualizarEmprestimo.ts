import { Emprestimo } from "../emprestimo/Emprestimo";
import { emprestimosService } from "../emprestimo/EmprestimosService";
import { carregarPaginaDeLogin } from "../login/login";
import { showNav } from "../nav/nav";
import { Controller } from "../util/Controller";
import { VisualizarEmprestimoView } from "./VisualizarEmprestimoView";

export class ControllerVisualizarEmprestimo extends Controller {

    private emprestimo: Emprestimo;
    protected view: VisualizarEmprestimoView;

    constructor(emprestimo: Emprestimo) {
        super();
        this.emprestimo = emprestimo;
        this.view = new VisualizarEmprestimoView();
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