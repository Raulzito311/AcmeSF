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

        const emprestimo: Emprestimo = await Emprestimo.of(emprestimosJson[0]);

        return emprestimo;
    }

    async buscarTodos(): Promise<Emprestimo[]> {
        const res = await fetch(`${API}/emprestimos`);
        if (!res.ok)
            throw new Error("API de emprestimos indisponível");

        const emprestimosJson: any[] = await res.json();

        const emprestimos: Emprestimo[] = [];

        for (const e of emprestimosJson) {
            emprestimos.push(await Emprestimo.of(e));
        }

        return emprestimos;
    }

    async adicionar(emprestimo: Emprestimo){
        const res = await fetch(`${API}/emprestimos`, {
            method : "POST",
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(emprestimo)
        })
        if (!res.ok)
            throw new Error("API de emprestimos indisponível");
        else 
            alert("Emprestimo Cadastrado com sucesso");
    }

}

export const emprestimosService = new EmprestimosService();