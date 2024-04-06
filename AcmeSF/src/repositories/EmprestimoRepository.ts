import { Emprestimo } from "../models/Emprestimo";
import { API } from "./API";
import { ClienteRepository } from "./ClienteRepository";
import { FormaDePagamentoRepository } from "./FormaDePagamentoRepository";
import { Repository } from "./Repository";

export class EmprestimoRepository implements Repository<Emprestimo> {
    readonly clientes: ClienteRepository;
    readonly formasDePagamento: FormaDePagamentoRepository;

    constructor(clientes: ClienteRepository, formasDePagamento: FormaDePagamentoRepository) {
        this.clientes = clientes;
        this.formasDePagamento = formasDePagamento;
    }

    async buscarPeloId(id: number): Promise<Emprestimo> {
        const res = await fetch(`${API}/emprestimos?id=${id}`);
        if (!res.ok)
            throw new Error("API de emprestimos indisponível");

        const emprestimosJson: any[] = await res.json();

        const emprestimo: Emprestimo = new Emprestimo(
            emprestimosJson[0].id, 
            await this.clientes.buscarPeloId(emprestimosJson[0].clienteId), 
            emprestimosJson[0].valorEmprestado, 
            await this.formasDePagamento.buscarPeloId(emprestimosJson[0].formaDePagamentoId), 
            new Date(emprestimosJson[0].data));

        return emprestimo;
    }

    async buscarTodos(): Promise<Emprestimo[]> {
        const res = await fetch(`${API}/emprestimos`);
        if (!res.ok)
            throw new Error("API de emprestimos indisponível");

        const emprestimosJson: any[] = await res.json();

        const emprestimos: Emprestimo[] = [];

        for (const e of emprestimosJson) {
            emprestimos.push(new Emprestimo(
                                e.id, 
                                await this.clientes.buscarPeloId(e.clienteId), 
                                e.valorEmprestado, 
                                await this.formasDePagamento.buscarPeloId(e.formaDePagamentoId), 
                                new Date(e.data)));
        }

        return emprestimos;
    }

}