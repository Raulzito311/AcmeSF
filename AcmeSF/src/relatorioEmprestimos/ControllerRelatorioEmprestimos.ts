import { emprestimosService } from "../emprestimo/EmprestimosService";
import { Controller } from "../util/Controller";
import { RelatorioEmprestimosView } from "./RelatorioEmprestimosView";

export class ControllerRelatorioEmprestimos extends Controller {

    protected view: RelatorioEmprestimosView;

    constructor() {
        super();
        this.view = new RelatorioEmprestimosView();
    }

    public async init(): Promise<void> {
        try {
            await this.view.load();

            // TODO: Adicionar listener para buscar emprestimos do período
        } catch (errorMessage) {
            this.alert(<string> errorMessage, 'danger');
        }
    }
}