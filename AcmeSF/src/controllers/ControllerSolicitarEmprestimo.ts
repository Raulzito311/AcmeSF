import { clientesService } from "../services/ClientesService";
import { formasDePagamentoService } from "../services/FormasDePagamentoService";
import { SolicitarEmprestimoView } from "../views/SolicitarEmprestimoView";

export class ControllerSolicitarEmprestimo {

    private view: SolicitarEmprestimoView;

    constructor() {
        this.view = new SolicitarEmprestimoView();

        this.init();
    }

    public async init(): Promise<void> {
        this.view.exibirSolicitacaoDeEmprestimo(await clientesService.buscarTodos(), await formasDePagamentoService.buscarTodos());

        this.view.adicionarListenerParaSolicitacao(() => {}); // TODO: implementar função que será chamada para criar emprestimo
    }
}