import { ViewEmprestimo } from "../views/ViewEmprestimo";

export class ControllerEmprestimo {
    private view: ViewEmprestimo;
    constructor() {
        this.view = new ViewEmprestimo();
    }

    public async init(): Promise<void> {
        await this.view.carregarTabelaDeEmprestimos();
        
        this.view.listarEmprestimos([]);
    }
}