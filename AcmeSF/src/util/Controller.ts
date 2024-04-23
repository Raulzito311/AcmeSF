import { View } from "./View";

export class Controller {
    protected view: View;

    public alert(message: string, type: string, shouldDisapear: boolean = true): void {
        this.view.alert(message, type, shouldDisapear);
    }
}