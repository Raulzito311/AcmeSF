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

            this.view.adicionarListenerParaGerarRelatorio(async (dataInicio: string, dataFim: string) => {
                return await emprestimosService.buscarRelatorio(dataInicio, dataFim);
            });
        } catch (errorMessage) {
            this.alert(<string> errorMessage, 'danger');
        }
    }
}