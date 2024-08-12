import { ControllerLogin } from "./ControllerLogin";

export async function carregarPaginaDeLogin(): Promise<ControllerLogin> {
    const controller = new ControllerLogin();
    
    await controller.init();

    return controller;
}
