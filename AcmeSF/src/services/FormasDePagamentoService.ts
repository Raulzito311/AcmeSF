import { FormaDePagamento } from "../models/FormaDePagamento";
import { API } from "./API";
import { Service } from "./Service";

class FormasDePagamentoService implements Service<FormaDePagamento> {
    async buscarPeloId(id: number): Promise<FormaDePagamento> {
        const res = await fetch(`${API}/formasDePagamento/${id}`);
        if (!res.ok)
            throw new Error("API de formas de pagamento indisponível");

        const formaDePagamentoJson = await res.json();

        const formaDePagamento: FormaDePagamento = FormaDePagamento.of(formaDePagamentoJson);

        return formaDePagamento;
    }

    async buscarTodos(): Promise<FormaDePagamento[]> {
        const res = await fetch(`${API}/formasDePagamento`);
        if (!res.ok)
            throw new Error("API de formas de pagamento indisponível");

        const formasDePagamentoJson: any[] = await res.json();

        const formasDePagamento: FormaDePagamento[] = formasDePagamentoJson.map(f => FormaDePagamento.of(f));

        return formasDePagamento;
    }
}

export const formasDePagamentoService = new FormasDePagamentoService();