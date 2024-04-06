import { ViewEmprestimo } from "../views/ViewEmprestimo";

export class ControllerEmprestimo {
    private view: ViewEmprestimo;
    constructor() {
        this.view = new ViewEmprestimo();
    }

    public init(): void {
        this.view.listarEmprestimos([]);
    }
}