import { ControllerListarEmprestimos } from "./ControllerListarEmprestimos";

export async function carregarPaginaDeListarEmprestimos(): Promise<ControllerListarEmprestimos> {
    const controller = new ControllerListarEmprestimos();
    
    await controller.init();

    return controller;
}
