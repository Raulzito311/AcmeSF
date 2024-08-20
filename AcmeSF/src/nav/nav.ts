import { ControllerNav } from "./ControllerNav";

export async function carregarNav(): Promise<ControllerNav> {
    const controller = new ControllerNav();
    
    await controller.init();

    return controller;
}

export function hideNav(): void {
    const controller = new ControllerNav();
    
    controller.hide();
}
