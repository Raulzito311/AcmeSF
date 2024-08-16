import { ClienteJson } from "../cliente/Cliente";
import { clientesService } from "../cliente/ClientesService";
import { carregarPaginaDeListarEmprestimos } from "../listarEmprestimos/listarEmprestimos";
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

        this.view.adicionarListenerParaCadastro(async (cliente: ClienteJson) => {
            try {
                await clientesService.adicionar(cliente);
            } catch (errorMessage) {
                this.alert(<string> errorMessage, 'danger');
                return;
            }
                    
            const controllerListar = await carregarPaginaDeListarEmprestimos();

            controllerListar.alert('Cliente cadastrado com sucesso', 'success');
        });
    }
}