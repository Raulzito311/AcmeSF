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

        const formasdePagamento = await formasDePagamentoService.buscarTodos();

        await this.view.load();

        this.view.adicionarListenerParaSolicitacao(async (emprestimo: EmprestimoJson) => {
            try {
                await emprestimosService.adicionar(emprestimo);
            } catch (errorMessage) {
                this.alert(<string> errorMessage, 'danger');
                return;
            }
                    
            const controllerListar = await carregarPaginaDeListarEmprestimos();

            controllerListar.alert('Empréstimo realizado com sucesso', 'success');
        });
        
        this.view.exibirSolicitacaoDeEmprestimo(formasdePagamento, async (valorEmprestimo: number, formaDePagamentoId: number) => {
            try {
                return await emprestimosService.simularEmprestimo(valorEmprestimo, formaDePagamentoId);
            } catch (errorMessage) {
                this.alert(<string> errorMessage, 'danger');
                return [];
            }
        });
    }
}