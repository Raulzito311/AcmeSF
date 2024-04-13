import { Emprestimo } from "../models/Emprestimo";
import { API } from "./API";
import { clientesService } from "./ClientesService";
import { formasDePagamentoService } from "./FormasDePagamentoService";
import { Service } from "./Service";

class EmprestimosService implements Service<Emprestimo> {
    async buscarPeloId(id: number): Promise<Emprestimo> {
        const res = await fetch(`${API}/emprestimos?id=${id}`);
        if (!res.ok)
            throw new Error("API de emprestimos indisponível");

        const emprestimosJson: any[] = await res.json();

        const emprestimo: Emprestimo = new Emprestimo(
            emprestimosJson[0].id, 
            await clientesService.buscarPeloId(emprestimosJson[0].clienteId), 
            emprestimosJson[0].valorEmprestado, 
            await formasDePagamentoService.buscarPeloId(emprestimosJson[0].formaDePagamentoId), 
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
                                await clientesService.buscarPeloId(e.clienteId), 
                                e.valorEmprestado, 
                                await formasDePagamentoService.buscarPeloId(e.formaDePagamentoId), 
                                new Date(e.data)));
        }

        return emprestimos;
    }

    // TODO: Implementar função para adicionar um novo empréstimo

}

export const emprestimosService = new EmprestimosService();