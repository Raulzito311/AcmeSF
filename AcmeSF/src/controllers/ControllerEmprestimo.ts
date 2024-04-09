import { ClientesRepository } from "../repositories/ClientesRepository";
import { EmprestimosRepository } from "../repositories/EmprestimosRepository";
import { FormasDePagamentoRepository } from "../repositories/FormasDePagamentoRepository";
import { ViewEmprestimo } from "../views/ViewEmprestimo";

export class ControllerEmprestimo {

    private view: ViewEmprestimo;

    private clientesRepo: ClientesRepository;
    private emprestimosRepo: EmprestimosRepository;
    private formasDePagamentoRepo: FormasDePagamentoRepository;

    constructor() {
        this.view = new ViewEmprestimo();
        this.clientesRepo = new ClientesRepository();
        this.formasDePagamentoRepo = new FormasDePagamentoRepository();
        this.emprestimosRepo = new EmprestimosRepository(this.clientesRepo, this.formasDePagamentoRepo);
    }

    public async init(): Promise<void> {
        await this.view.carregarListagemDeEmprestimos();

        this.view.adicionarListenerParaSolicitacao(this.carregarSolicitacaoDeEmprestimo.bind(this));
        
        this.view.listarEmprestimos(await this.emprestimosRepo.buscarTodos());
    }

    public async carregarSolicitacaoDeEmprestimo(): Promise<void> {
        this.view.carregarSolicitacaoDeEmprestimo(await this.clientesRepo.buscarTodos(), await this.formasDePagamentoRepo.buscarTodos());
    }
}