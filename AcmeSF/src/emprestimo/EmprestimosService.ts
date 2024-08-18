import { Emprestimo, EmprestimoJson } from "./Emprestimo";
import { API } from "../util/API";
import { Service } from "../util/Service";
import { Parcela } from "../parcela/Parcela";

class EmprestimosService implements Service<Emprestimo> {
    async buscarPeloId(id: number): Promise<Emprestimo> {
        const res = await fetch(`${API}/emprestimos/${id}`, { credentials: 'include' });
        if (!res.ok) {
            const text = (await res.text()).trim();
            throw `${text.length > 0 ? text : `${res.status} ${res.statusText}`}`;
        }

        const emprestimoJson: any = await res.json();

        const emprestimo: Emprestimo = Emprestimo.of(emprestimoJson);

        return emprestimo;
    }

    async buscarTodos(): Promise<Emprestimo[]> {
        const res = await fetch(`${API}/emprestimos`, { credentials: 'include' });
        if (!res.ok) {
            const text = (await res.text()).trim();
            throw `${text.length > 0 ? text : `${res.status} ${res.statusText}`}`;
        }

        const emprestimosJson: any[] = await res.json();

        const emprestimos: Emprestimo[] = [];

        for (const e of emprestimosJson) {
            emprestimos.push(Emprestimo.of(e));
        }

        return emprestimos;
    }

    async adicionar(emprestimo: EmprestimoJson): Promise<void> {
        emprestimo.dataHora = emprestimo.dataHora.toLocaleString(new Intl.Locale('ja'));

        const params = {
            method : "POST",
            credentials: 'include' as RequestCredentials,
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(emprestimo)
        };
        
        const res = await fetch(`${API}/emprestimos`, params);
        if (!res.ok) {
            const text = (await res.text()).trim();
            throw `${text.length > 0 ? text : `${res.status} ${res.statusText}`}`;
        }
    }

    async buscarParcelasDoEmprestimo(id: number): Promise<Parcela[]> {
        const res = await fetch(`${API}/emprestimos/${id}/parcelas`, { credentials: 'include' });
        if (!res.ok) {
            const text = (await res.text()).trim();
            throw `${text.length > 0 ? text : `${res.status} ${res.statusText}`}`;
        }

        return await res.json();
    }

    async pagarParcelaDoEmprestimo(id: number): Promise<void> {
        const res = await fetch(`${API}/emprestimos/${id}/parcelas/pagar`, { method : 'PUT', credentials: 'include' });
        if (!res.ok) {
            const text = (await res.text()).trim();
            throw `${text.length > 0 ? text : `${res.status} ${res.statusText}`}`;
        }
    }

    async simularEmprestimo(valorEmprestimo: number, formaDePagamentoId: number): Promise<Parcela[]> {
        const params = {
            method : 'PUT',
            credentials: 'include' as RequestCredentials,
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                valorEmprestimo,
                formaDePagamentoId
            })
        };
        
        const res = await fetch(`${API}/emprestimos/simular`, params);
        if (!res.ok) {
            const text = (await res.text()).trim();
            throw `${text.length > 0 ? text : `${res.status} ${res.statusText}`}`;
        }

        return await res.json();
    }
}

export const emprestimosService = new EmprestimosService();