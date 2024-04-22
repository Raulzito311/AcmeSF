import { clientesService } from "../cliente/ClientesService";
import { EmprestimoJson } from "../emprestimo/Emprestimo";
import { emprestimosService } from "../emprestimo/EmprestimosService";
import { formasDePagamentoService } from "../formaDePagamento/FormasDePagamentoService";
import { carregarPaginaDeListarEmprestimos } from "../listarEmprestimos/listarEmprestimos";
import { Controller } from "../util/Controller";
import { SolicitarEmprestimoView } from "./SolicitarEmprestimoView";

export class ControllerSolicitarEmprestimo extends Controller {

    protected view: SolicitarEmprestimoView;

    constructor() {
        super();
        this.view = new SolicitarEmprestimoView(clientesService.buscarPeloCPF);
    }
    
    public async init(): Promise<void> {
        await this.view.load();
        
        this.view.exibirSolicitacaoDeEmprestimo(await formasDePagamentoService.buscarTodos());

        this.view.adicionarListenerParaSolicitacao(async (emprestimo: EmprestimoJson) => {
            try {
                await emprestimosService.adicionar(emprestimo);
            } catch (errorMessage) {
                this.view.alert(<string> errorMessage, 'danger');
            }
                    
            const controllerListar = await carregarPaginaDeListarEmprestimos();

            controllerListar.alert('Empréstimo realizado com sucesso', 'success');
        });
    }
}