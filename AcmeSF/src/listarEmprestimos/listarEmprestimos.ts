import { ControllerListarEmprestimos } from "./ControllerListarEmprestimos";

export async function carregarPaginaDeListarEmprestimos() {
    const controller = new ControllerListarEmprestimos();
    
    controller.init();
}
