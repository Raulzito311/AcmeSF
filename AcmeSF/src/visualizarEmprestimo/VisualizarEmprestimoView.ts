import { Emprestimo } from "../emprestimo/Emprestimo.ts";
import { Parcela } from "../parcela/Parcela.ts";
import { carregarPaginaDeSolicitarEmprestimo } from "../solicitarEmprestimo/solicitarEmprestimo.ts";
import { View } from "../util/View.ts";

export class VisualizarEmprestimoView extends View {

    private emprestimo: Emprestimo;

    constructor(emprestimo: Emprestimo) {
        super('visualizarEmprestimo');
        this.emprestimo = emprestimo;
    }

    public listarParcelas(parcelas: Parcela[], pagarParcela: Function): void {
        const tbody = document.querySelector('tbody');

        let id = 1;
        let primeiraParcelaEmAberto = true;
        for (const parcela of parcelas) {
            let parcelaEmAberto = parcela.paga === 0;
            const tr = document.createElement('tr');
            tr.className = 'row';

            const tdId = document.createElement('td');
            tdId.className = 'col-1';
            tdId.innerText = (id++).toString();

            const tdValor = document.createElement('td');
            tdValor.className = 'col';
            tdValor.innerText = parcela.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            const tdPaga = document.createElement('td');
            tdPaga.className = 'col';

            if (parcelaEmAberto) {
                const btnPagar = document.createElement('button');
                btnPagar.classList.add('btn', 'btn-outline-success');
                btnPagar.innerText = 'Pagar';
                
                if (parcelaEmAberto && primeiraParcelaEmAberto) {
                    primeiraParcelaEmAberto = false;
                    btnPagar.addEventListener('click', () => {
                        pagarParcela();
                    });
                } else {
                    btnPagar.addEventListener('click', () => {
                        this.alert('Outra(s) parcela(s) em aberto deve(m) ser paga(s) antes', 'danger');
                    });
                }
                tdPaga.appendChild(btnPagar);
            } else {
                tdPaga.innerText = 'Paga';
            }

            const tdDataVencimento = document.createElement('td');
            tdDataVencimento.className = 'col';
            tdDataVencimento.innerText = new Date(parcela.dataVencimento).toLocaleDateString(new Intl.Locale('pt-BR'));

            const tdUsuario = document.createElement('td');
            tdUsuario.className = 'col';
            tdUsuario.innerText = parcela.usuarioPagamento || '-';

            const tdDataHoraPagamento = document.createElement('td');
            tdDataHoraPagamento.className = 'col';
            tdDataHoraPagamento.innerText = parcela.dataHoraPagamento ? new Date(parcela.dataHoraPagamento).toLocaleString(new Intl.Locale('pt-BR')) : '-';

            tr.append(tdId, tdValor, tdDataVencimento, tdPaga, tdUsuario, tdDataHoraPagamento);
            tbody?.appendChild(tr);
        }
    }

    public async load(): Promise<void> {
        await super.load();

        document.getElementById('valorEmprestimo')!.innerText = this.emprestimo.valorEmprestimo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        document.getElementById('valorComJuros')!.innerText = this.emprestimo.valorComJuros!.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        document.getElementById('dataEmprestimo')!.innerText = this.emprestimo.dataHora.toLocaleDateString(new Intl.Locale('pt-BR'));
        document.getElementById('cliente')!.innerText = `${this.emprestimo.cliente.nome}, ${this.emprestimo.cliente.idade} anos`;
        document.getElementById('formaDePagamento')!.innerText = `${this.emprestimo.formaDePagamento.descricao} | ${100 * this.emprestimo.formaDePagamento.juros}% de juros`;
    }
    
}