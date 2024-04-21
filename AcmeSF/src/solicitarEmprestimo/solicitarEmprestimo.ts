import { ControllerSolicitarEmprestimo } from "./ControllerSolicitarEmprestimo";

export function carregarPaginaDeSolicitarEmprestimo() {
    const controller = new ControllerSolicitarEmprestimo();
    
    controller.init();
}