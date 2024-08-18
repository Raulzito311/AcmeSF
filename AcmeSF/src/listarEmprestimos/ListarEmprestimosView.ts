import { Emprestimo } from "../emprestimo/Emprestimo.ts";
import { carregarPaginaDeSolicitarEmprestimo } from "../solicitarEmprestimo/solicitarEmprestimo.ts";
import { View } from "../util/View.ts";
import { carregarPaginaDeVisualizarEmprestimo } from "../visualizarEmprestimo/visualizarEmprestimo.ts";

export class ListarEmprestimosView extends View {

    constructor() {
        super('listarEmprestimos');
    }

    public listarEmprestimos(emprestimos: Emprestimo[]): void {
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
            tr.classList.add('row', 'clicable-row');

            tr.addEventListener('click', () => {
                carregarPaginaDeVisualizarEmprestimo(emprestimo);
            });

            const tdData = document.createElement('td');
            tdData.className = 'col';
            tdData.innerText = emprestimo.dataHora.toLocaleString(new Intl.Locale('pt-BR'));

            const tdCliente = document.createElement('td');
            tdCliente.className = 'col';
            tdCliente.innerText = emprestimo.cliente.nome;

            const tdCPF = document.createElement('td');
            tdCPF.className = 'col';
            tdCPF.innerText = emprestimo.cliente.cpf;

            const tdValorEmprestimo = document.createElement('td');
            tdValorEmprestimo.className = 'col';
            tdValorEmprestimo.innerText = emprestimo.valorEmprestimo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            const tdFormaDePagamento = document.createElement('td');
            tdFormaDePagamento.className = 'col';
            tdFormaDePagamento.innerText = emprestimo.formaDePagamento.descricao;

            const tdValorFinal = document.createElement('td');
            tdValorFinal.className = 'col';
            tdValorFinal.innerText = (emprestimo.valorComJuros ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            tr.append(tdData, tdCliente, tdCPF, tdValorEmprestimo, tdFormaDePagamento, tdValorFinal);
            tbody?.appendChild(tr);
        }
    }

    public async load(): Promise<void> {
        await super.load();

        document.getElementById('solicitar')?.addEventListener('click', () => {
            carregarPaginaDeSolicitarEmprestimo();
        });
    }
    
}