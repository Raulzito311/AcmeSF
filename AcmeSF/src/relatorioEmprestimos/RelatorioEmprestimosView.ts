import { View } from "../util/View.ts";

export class RelatorioEmprestimosView extends View {

    constructor() {
        super('relatorioEmprestimos');
    }

    public async load(): Promise<void> {
        await super.load();

        const today = new Date();

        const inputInicio = <HTMLInputElement> document.getElementById('dataInicio');

        inputInicio.valueAsDate = new Date(today.getFullYear(), today.getMonth(), 1);

        const inputFim = <HTMLInputElement> document.getElementById('dataFim');

        inputFim.valueAsDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    }
    
}