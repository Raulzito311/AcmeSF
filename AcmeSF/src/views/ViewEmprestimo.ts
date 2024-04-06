import { Emprestimo } from "../models/Emprestimo";

export class ViewEmprestimo {

    public async carregarTabelaDeEmprestimos(): Promise<void> {
        const listagem = await fetch('./html/listaEmprestimos.html');
        const lista = await listagem.text();
    
        document.querySelector("main")!.innerHTML = lista;
    }

    public listarEmprestimos(emprestimos: Array<Emprestimo>): void {
        const tbody = document.querySelector('tbody');

        if (emprestimos.length == 0) {
            const tr = document.createElement('tr');

            const td = document.createElement('td');
            td.innerText = 'Não há empréstimos';
            td.className = 'semEmprestimos';

            tr.appendChild(td);
            tbody?.appendChild(tr);
            return;
        }

        for (const emprestimo of emprestimos) {
            const tr = document.createElement('tr');

            const tdData = document.createElement('td');
            tdData.innerText = emprestimo.dataHora.toDateString();

            const tdCliente = document.createElement('td');
            tdCliente.innerText = emprestimo.cliente.nome;

            const tdCPF = document.createElement('td');
            tdCPF.innerText = emprestimo.cliente.cpf;

            const tdValorEmprestimo = document.createElement('td');
            tdValorEmprestimo.innerText = emprestimo.valorEmprestimo.toFixed(2);

            const tdFormaDePagamento = document.createElement('td');
            tdFormaDePagamento.innerText = emprestimo.formaDePagamento.descricao;

            const tdValorFinal = document.createElement('td');
            tdValorFinal.innerText = emprestimo.valorFinal.toFixed(2);

            tr.append(tdData, tdCliente, tdCPF, tdValorEmprestimo, tdFormaDePagamento, tdValorFinal);
            tbody?.appendChild(tr);
        }
    }
    
}