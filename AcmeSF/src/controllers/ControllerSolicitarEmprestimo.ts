import { Emprestimo } from "../models/Emprestimo";
import { clientesService } from "../services/ClientesService";
import { formasDePagamentoService } from "../services/FormasDePagamentoService";
import { SolicitarEmprestimoView } from "../views/SolicitarEmprestimoView";

export class ControllerSolicitarEmprestimo {

    private view: SolicitarEmprestimoView;

    constructor() {
        this.init();
    }
    
    public async init(): Promise<void> {
        this.view = new SolicitarEmprestimoView();

        this.view.exibirSolicitacaoDeEmprestimo(await clientesService.buscarTodos(), await formasDePagamentoService.buscarTodos());

        this.view.adicionarListenerParaSolicitacao((emprestimo: Emprestimo) => {
            // TODO: invocar emprestimosService.adicionar(emprestimo)
        });
    }
}