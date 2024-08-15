import { clientesService } from "../cliente/ClientesService";
import { EmprestimoJson } from "../emprestimo/Emprestimo";
import { emprestimosService } from "../emprestimo/EmprestimosService";
import { formasDePagamentoService } from "../formaDePagamento/FormasDePagamentoService";
import { carregarPaginaDeListarEmprestimos } from "../listarEmprestimos/listarEmprestimos";
import { Controller } from "../util/Controller";
import { CadastrarClienteView } from "../CadastrarClienteView";

export class ControllerCadastrarCliente extends Controller {

    protected view: CadastrarClienteView;

    constructor() {
        super();
        this.view = new SolicitarEmprestimoView(clientesService.buscarPeloCPF);
    }
    
    public async init(): Promise<void> {

        const formasdePagamento = await formasDePagamentoService.buscarTodos();

        await this.view.load();
        
        this.view.exibirSolicitacaoDeEmprestimo(formasdePagamento);

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
    }
}