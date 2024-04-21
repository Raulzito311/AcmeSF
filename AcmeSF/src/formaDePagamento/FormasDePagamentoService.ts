import { FormaDePagamento } from "./FormaDePagamento";
import { API } from "../util/API";
import { Service } from "../util/Service";

class FormasDePagamentoService implements Service<FormaDePagamento> {
    async buscarPeloId(id: number): Promise<FormaDePagamento> {
        const res = await fetch(`${API}/formasDePagamento/${id}`);
        if (!res.ok) {
            const text = await res.text();
            throw `${res.status} ${res.statusText}${text.length > 0 ? ` - ${text}` : ''}`;
        }

        const formaDePagamentoJson = await res.json();

        const formaDePagamento: FormaDePagamento = FormaDePagamento.of(formaDePagamentoJson);

        return formaDePagamento;
    }

    async buscarTodos(): Promise<FormaDePagamento[]> {
        const res = await fetch(`${API}/formasDePagamento`);
        if (!res.ok) {
            const text = await res.text();
            throw `${res.status} ${res.statusText}${text.length > 0 ? ` - ${text}` : ''}`;
        }

        const formasDePagamentoJson: any[] = await res.json();

        const formasDePagamento: FormaDePagamento[] = formasDePagamentoJson.map(f => FormaDePagamento.of(f));

        return formasDePagamento;
    }
}

export const formasDePagamentoService = new FormasDePagamentoService();