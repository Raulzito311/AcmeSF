import { ControllerListarEmprestimos } from "./ControllerListarEmprestimos";

export function carregarPaginaDeListarEmprestimos() {
    const controller = new ControllerListarEmprestimos();
    
    controller.init();
}
