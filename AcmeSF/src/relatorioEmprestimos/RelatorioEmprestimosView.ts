import { Chart, registerables } from "chart.js";
import { View } from "../util/View.ts";
import { RelatorioEmprestimo } from "../emprestimo/Emprestimo.ts";

export class RelatorioEmprestimosView extends View {

    constructor() {
        super('relatorioEmprestimos');
    }

    public adicionarListenerParaGerarRelatorio(buscarRelatorio: Function) {
        document.getElementById('formRelatorio')?.addEventListener('submit', async (event) => {
            event.preventDefault();
            document.getElementById('dados')?.classList.add('hidden');

            const inputInicio = <HTMLInputElement> document.getElementById('dataInicio');
            const inputFim = <HTMLInputElement> document.getElementById('dataFim');

            const relatorios: RelatorioEmprestimo[] = await buscarRelatorio(inputInicio.value, inputFim.value);

            const graficoRelatorio = <HTMLDivElement> document.getElementById('graficoRelatorio');
            graficoRelatorio.innerHTML = '';

            const resizeChart = () => {
                graficoRelatorio.style.height = `${(graficoRelatorio.clientWidth) / 2}px`;
            };

            const canvas = <HTMLCanvasElement> document.createElement('canvas');

            resizeChart();
            window.addEventListener('resize', () => { resizeChart(); });
            graficoRelatorio.appendChild(canvas);

            new Chart(canvas, {
                type: 'bar',
                data: {
                    labels: relatorios.map(relatorio => new Date(`${relatorio.data} 00:00:00-0300`).toLocaleDateString()),
                    datasets: [{
                        label: 'Valor Total de Empréstimos',
                        data: relatorios.map(relatorio => relatorio.valorTotalComJuros),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            const valorTotalComJuros = relatorios.map(relatorio => relatorio.valorTotalComJuros).reduce((a, b) => a + b);
            const mediaPeriodo = valorTotalComJuros / relatorios.map(relatorios => relatorios.totalEmprestimos).reduce((a, b) => a + b);

            document.getElementById('totalPeriodo')!.innerText = valorTotalComJuros.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            document.getElementById('mediaPeriodo')!.innerText = mediaPeriodo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            document.getElementById('mostrarDados')?.addEventListener('click', async (event) => {
                document.getElementById('dados')?.classList.add('hidden');

                const tbody = <HTMLTableSectionElement> document.querySelector('tbody');

                tbody.innerHTML = '';

                let id = 1;
                for (const relatorio of relatorios) {
                    const tr = document.createElement('tr');
                    tr.classList.add('row', 'justify-content-center');

                    const tdId = document.createElement('td');
                    tdId.classList.add('col-1');
                    tdId.innerText = (id++).toString();

                    const tdData = document.createElement('td');
                    tdData.classList.add('col-2');
                    tdData.innerText = new Date(relatorio.data).toLocaleDateString('pt-BR');

                    const tdTotal = document.createElement('td');
                    tdTotal.classList.add('col-2');
                    tdTotal.innerText = relatorio.valorTotalComJuros.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

                    tr.append(tdId, tdData, tdTotal);
                    tbody.appendChild(tr);
                }

                document.getElementById('dados')?.classList.remove('hidden');
            });

            document.getElementById('resumo')?.classList.remove('hidden');
            
        });
    }

    public async load(): Promise<void> {
        await super.load();

        Chart.register(...registerables);

        const today = new Date();

        const inputInicio = <HTMLInputElement> document.getElementById('dataInicio');

        inputInicio.valueAsDate = new Date(today.getFullYear(), today.getMonth(), 1);

        const inputFim = <HTMLInputElement> document.getElementById('dataFim');

        inputFim.valueAsDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    }
    
}