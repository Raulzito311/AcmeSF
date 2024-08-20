import { Emprestimo } from "../emprestimo/Emprestimo";
import { emprestimosService } from "../emprestimo/EmprestimosService";
import { carregarPaginaDeLogin } from "../login/login";
import { carregarNav } from "../nav/nav";
import { Controller } from "../util/Controller";
import { VisualizarEmprestimoView } from "./VisualizarEmprestimoView";

export class ControllerVisualizarEmprestimo extends Controller {

    private emprestimo: Emprestimo;
    protected view: VisualizarEmprestimoView;

    constructor(emprestimo: Emprestimo) {
        super();
        this.emprestimo = emprestimo;
        this.view = new VisualizarEmprestimoView(emprestimo);
    }

    public async init(): Promise<void> {
        try {
            const parcelas = await emprestimosService.buscarParcelasDoEmprestimo(this.emprestimo.id);

            await carregarNav();
            await this.view.load();
            this.view.listarParcelas(parcelas, async () => {
                try {
                    await emprestimosService.pagarParcelaDoEmprestimo(this.emprestimo.id);
                    await this.init();
                    this.alert('Parcela paga com sucesso', 'success');
                } catch (errorMessage) {
                    this.alert(<string> errorMessage, 'danger');
                }
            });
        } catch (errorMessage) {
            this.alert(<string> errorMessage, 'danger');
        }
    }
}