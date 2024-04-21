import { clientesService } from "../cliente/ClientesService";
import { EmprestimoJson } from "../emprestimo/Emprestimo";
import { emprestimosService } from "../emprestimo/EmprestimosService";
import { formasDePagamentoService } from "../formaDePagamento/FormasDePagamentoService";
import { SolicitarEmprestimoView } from "./SolicitarEmprestimoView";

export class ControllerSolicitarEmprestimo {

    private view: SolicitarEmprestimoView;

    constructor() {
        this.view = new SolicitarEmprestimoView(clientesService.buscarPeloCPF);
    }
    
    public async init(): Promise<void> {
        this.view.exibirSolicitacaoDeEmprestimo(await formasDePagamentoService.buscarTodos());

        this.view.adicionarListenerParaSolicitacao(async (emprestimo: EmprestimoJson) => {
            await emprestimosService.adicionar(emprestimo);
        });
    }
}