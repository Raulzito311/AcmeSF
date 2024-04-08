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
        await this.view.carregarTabelaDeEmprestimos();
        
        this.view.listarEmprestimos(await this.emprestimosRepo.buscarTodos());
    }
}