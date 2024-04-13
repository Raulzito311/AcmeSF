import { FormaDePagamento } from "../models/FormaDePagamento";
import { API } from "./API";
import { Service } from "./Service";

class FormasDePagamentoService implements Service<FormaDePagamento> {
    async buscarPeloId(id: number): Promise<FormaDePagamento> {
        const res = await fetch(`${API}/formasDePagamento?id=${id}`);
        if (!res.ok)
            throw new Error("API de formas de pagamento indisponível");

        const formasDePagamentoJson: any[] = await res.json();

        const formaDePagamento: FormaDePagamento = new FormaDePagamento(formasDePagamentoJson[0].id, formasDePagamentoJson[0].descricao, formasDePagamentoJson[0].meses, formasDePagamentoJson[0].juros);

        return formaDePagamento;
    }

    async buscarTodos(): Promise<FormaDePagamento[]> {
        const res = await fetch(`${API}/formasDePagamento`);
        if (!res.ok)
            throw new Error("API de formas de pagamento indisponível");

        const formasDePagamentoJson: any[] = await res.json();

        const formasDePagamento: FormaDePagamento[] = formasDePagamentoJson.map(f => new FormaDePagamento(f.id, f.descricao, f.meses, f.juros));

        return formasDePagamento;
    }
}

export const formasDePagamentoService = new FormasDePagamentoService();