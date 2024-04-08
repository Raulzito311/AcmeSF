import { Emprestimo } from "../models/Emprestimo";

export class ViewEmprestimo {

    public async carregarTabelaDeEmprestimos(): Promise<void> {
        const listagem = await fetch('/src/views/html/listaEmprestimos.html');
        const lista = await listagem.text();
    
        document.querySelector("main")!.innerHTML = lista;
    }

    public listarEmprestimos(emprestimos: Array<Emprestimo>): void {
        const tbody = document.querySelector('tbody');

        if (emprestimos.length == 0) {
            const tr = document.createElement('tr');
            tr.className = 'row';

            const td = document.createElement('td');
            td.innerText = 'Não há empréstimos';
            td.classList.add('col', 'semEmprestimos');

            tr.appendChild(td);
            tbody?.appendChild(tr);
            return;
        }

        for (const emprestimo of emprestimos) {
            const tr = document.createElement('tr');
            tr.className = 'row';

            const tdData = document.createElement('td');
            tdData.className = 'col';
            tdData.innerText = emprestimo.dataHora.toDateString();

            const tdCliente = document.createElement('td');
            tdCliente.className = 'col';
            tdCliente.innerText = emprestimo.cliente.nome;

            const tdCPF = document.createElement('td');
            tdCPF.className = 'col';
            tdCPF.innerText = emprestimo.cliente.cpf;

            const tdValorEmprestimo = document.createElement('td');
            tdValorEmprestimo.className = 'col';
            tdValorEmprestimo.innerText = emprestimo.valorEmprestimo.toFixed(2);

            const tdFormaDePagamento = document.createElement('td');
            tdFormaDePagamento.className = 'col';
            tdFormaDePagamento.innerText = emprestimo.formaDePagamento.descricao;

            const tdValorFinal = document.createElement('td');
            tdValorFinal.className = 'col';
            tdValorFinal.innerText = emprestimo.valorFinal.toFixed(2);

            tr.append(tdData, tdCliente, tdCPF, tdValorEmprestimo, tdFormaDePagamento, tdValorFinal);
            tbody?.appendChild(tr);
        }
    }
    
}