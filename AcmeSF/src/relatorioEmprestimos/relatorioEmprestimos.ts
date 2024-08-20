import { Emprestimo } from "../emprestimo/Emprestimo";
import { ControllerRelatorioEmprestimos } from "./ControllerRelatorioEmprestimos";

export async function carregarPaginaDeRelatorioDeEmprestimos(): Promise<ControllerRelatorioEmprestimos> {
    const controller = new ControllerRelatorioEmprestimos();
    
    await controller.init();

    return controller;
}
