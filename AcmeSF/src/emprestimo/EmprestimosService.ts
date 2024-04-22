import { Emprestimo, EmprestimoJson } from "./Emprestimo";
import { API } from "../util/API";
import { Service } from "../util/Service";

class EmprestimosService implements Service<Emprestimo> {
    async buscarPeloId(id: number): Promise<Emprestimo> {
        const res = await fetch(`${API}/emprestimos/${id}`);
        if (!res.ok) {
            const text = (await res.text()).trim();
            throw `${res.status} ${res.statusText}${text.length > 0 ? ` - ${text}` : ''}`;
        }

        const emprestimoJson: any = await res.json();

        const emprestimo: Emprestimo = Emprestimo.of(emprestimoJson);

        return emprestimo;
    }

    async buscarTodos(): Promise<Emprestimo[]> {
        const res = await fetch(`${API}/emprestimos`);
        if (!res.ok) {
            const text = (await res.text()).trim();
            throw `${res.status} ${res.statusText}${text.length > 0 ? ` - ${text}` : ''}`;
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
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(emprestimo)
        };
        
        const res = await fetch(`${API}/emprestimos`, params);
        if (!res.ok) {
            const text = (await res.text()).trim();
            throw `${res.status} ${res.statusText}${text.length > 0 ? ` - ${text}` : ''}`;
        }
    }
}

export const emprestimosService = new EmprestimosService();