import { Emprestimo } from "../emprestimo/Emprestimo";
import { ControllerVisualizarEmprestimo } from "./ControllerVisualizarEmprestimo";

export async function carregarPaginaDeVisualizarEmprestimo(emprestimo: Emprestimo): Promise<ControllerVisualizarEmprestimo> {
    const controller = new ControllerVisualizarEmprestimo(emprestimo);
    
    await controller.init();

    return controller;
}
