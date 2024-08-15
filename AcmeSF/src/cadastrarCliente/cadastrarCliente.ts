import { ControllerCadastrarCliente } from "./ControllerCadastrarCliente";

export async function carregarPaginaDeCadastrarCliente(): Promise<ControllerCadastrarCliente> {
    const controller = new ControllerCadastrarCliente();
    
    await controller.init();

    return controller;
}