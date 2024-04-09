import { Cliente } from "../models/Cliente";
import { Emprestimo } from "../models/Emprestimo";
import { FormaDePagamento } from "../models/FormaDePagamento";
import { View } from "./View";

export class ViewEmprestimo extends View {

    public async carregarListagemDeEmprestimos(): Promise<void> {
        await this.carregarConteudo('listaEmprestimos.html');
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

    public async carregarSolicitacaoDeEmprestimo(clientes: Cliente[], formasDePagamento: FormaDePagamento[]): Promise<void> {
        await this.carregarConteudo('solicitarEmprestimo.html');
        // TODO: mostrar opções de formas de pagamento e clientes
    }

    public adicionarListenerParaSolicitacao(solicitar: Function): void {
        document.getElementById('solicitar')?.addEventListener('click', () => {
            solicitar();
        });
    }
    
}