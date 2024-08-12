import { FormaDePagamento } from "./FormaDePagamento";
import { API } from "../util/API";
import { Service } from "../util/Service";

class FormasDePagamentoService implements Service<FormaDePagamento> {
    async buscarPeloId(id: number): Promise<FormaDePagamento> {
        const res = await fetch(`${API}/formasDePagamento/${id}`, { credentials: 'include' });
        if (!res.ok) {
            const text = (await res.text()).trim();
            throw `${text.length > 0 ? text : `${res.status} ${res.statusText}`}`;
        }

        const formaDePagamentoJson = await res.json();

        const formaDePagamento: FormaDePagamento = FormaDePagamento.of(formaDePagamentoJson);

        return formaDePagamento;
    }

    async buscarTodos(): Promise<FormaDePagamento[]> {
        const res = await fetch(`${API}/formasDePagamento`, { credentials: 'include' });
        if (!res.ok) {
            const text = (await res.text()).trim();
            throw `${text.length > 0 ? text : `${res.status} ${res.statusText}`}`;
        }

        const formasDePagamentoJson: any[] = await res.json();

        const formasDePagamento: FormaDePagamento[] = formasDePagamentoJson.map(f => FormaDePagamento.of(f));

        return formasDePagamento;
    }
}

export const formasDePagamentoService = new FormasDePagamentoService();