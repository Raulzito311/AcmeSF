import { ControllerNav } from "./ControllerNav";

export async function carregarNav(): Promise<ControllerNav> {
    const controller = new ControllerNav();
    
    await controller.init();

    return controller;
}

export function showNav(): void {
    const controller = new ControllerNav();
    
    controller.show();
}

export function hideNav(): void {
    const controller = new ControllerNav();
    
    controller.hide();
}
