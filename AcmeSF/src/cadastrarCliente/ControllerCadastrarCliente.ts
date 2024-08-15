import { Controller } from "../util/Controller";
import { CadastrarClienteView } from "./CadastrarClienteView";

export class ControllerCadastrarCliente extends Controller {

    protected view: CadastrarClienteView;

    constructor() {
        super();
        this.view = new CadastrarClienteView();
    }
    
    public async init(): Promise<void> {
        await this.view.load();
    }
}