import { Emprestimo } from "../emprestimo/Emprestimo";
import { clientesService } from "../cliente/ClientesService";
import { emprestimosService } from "../emprestimo/EmprestimosService";
import { formasDePagamentoService } from "../formaDePagamento/FormasDePagamentoService";
import { SolicitarEmprestimoView } from "./SolicitarEmprestimoView";

export class ControllerSolicitarEmprestimo {

    private view: SolicitarEmprestimoView;

    constructor() {
        this.view = new SolicitarEmprestimoView();
    }
    
    public async init(): Promise<void> {
        this.view.exibirSolicitacaoDeEmprestimo(await clientesService.buscarTodos(), await formasDePagamentoService.buscarTodos());

        this.view.adicionarListenerParaSolicitacao((emprestimo: Emprestimo) => {
            emprestimosService.adicionar(emprestimo)
        });
    }
}