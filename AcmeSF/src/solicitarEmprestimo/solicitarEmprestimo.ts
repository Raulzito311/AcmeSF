import { ControllerSolicitarEmprestimo } from "./ControllerSolicitarEmprestimo";

export async function carregarPaginaDeSolicitarEmprestimo(): Promise<ControllerSolicitarEmprestimo> {
    const controller = new ControllerSolicitarEmprestimo();
    
    await controller.init();

    return controller;
}