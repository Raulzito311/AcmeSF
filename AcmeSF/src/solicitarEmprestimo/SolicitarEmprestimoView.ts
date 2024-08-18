import { Emprestimo, EmprestimoJson } from "../emprestimo/Emprestimo";
import { FormaDePagamento } from "../formaDePagamento/FormaDePagamento";
import { View } from "../util/View";
import { validarCPF } from "../util/cpfUtil";
import { Parcela } from "../parcela/Parcela";
import { Cliente } from "../cliente/Cliente";

export class SolicitarEmprestimoView extends View {
    private buscarPeloCPF: Function;
    constructor(buscarPeloCPF: Function) {
        super('solicitarEmprestimo');
        this.buscarPeloCPF = buscarPeloCPF;
    }

    public async exibirSolicitacaoDeEmprestimo(formasDePagamento: FormaDePagamento[], simularEmprestimo: Function): Promise<void> {
        const select = <HTMLSelectElement>document.getElementById('formaDePagamento');
        
        // Preenche as opções de formas de pagamento
        for (const formaDePagamento of formasDePagamento) {
            const option = document.createElement('option');
            option.innerText = formaDePagamento.descricao;
            option.value = formaDePagamento.id.toString();
            select.appendChild(option);
        }

        const inputCPF = <HTMLInputElement> document.getElementById('cpf');
        const inputValor = <HTMLInputElement> document.getElementById('valorEmprestimo');
        const inputLimiteCredito = <HTMLInputElement> document.getElementById('inputLimiteCredito');

        // Formata o cpf digitado
        inputCPF.addEventListener('input', function(event) {
            const target = <HTMLInputElement>event.target;
            
            target.value = target.value.replace(/\D/g, '') // Remove qualquer coisa que não seja número
                                    .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o terceiro dígito
                                    .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o sexto dígito
                                    .replace(/(\d{3})(\d)/, '$1-$2') // Adiciona traço após o nono dígito
                                    .replace(/(-\d{2})\d+$/, '$1'); // Impede entrada de mais de 11 dígitos
        });

        // Formata o valor do emprestimo digitado
        inputValor.addEventListener('input', function(event) {
            const target = <HTMLInputElement> event.target;
            
            if (target.value.match(/(\d+\.\d{2}).+/))
                target.value = target.value.replace(/(\d+\.\d{2}).+/, '$1'); // Impede entrada de mais de 2 casas decimais
        });

        // Valida o cliente
        inputCPF.addEventListener('blur', async (event) => {
            const target: HTMLInputElement = <HTMLInputElement> event.target;
            const invalidCpf = <HTMLInputElement> document.getElementById('invalidCpf');
            const inputClienteId = <HTMLInputElement> document.getElementById('inputClienteId');

            if (!target.value) {
                inputClienteId.value = '';
                inputLimiteCredito.value = '';
                invalidCpf!.innerText = 'Por favor, insira o cpf do cliente';
                target.classList.remove('is-valid');
                target.classList.add('is-invalid');
            } else if (validarCPF(target.value)) {
                try {
                    const cliente: Cliente = await this.buscarPeloCPF(target.value);
    
                    target.classList.remove('is-invalid');
                    target.classList.add('is-valid');

                    inputClienteId.value = cliente.id.toString();
                    inputLimiteCredito.value = cliente.limiteCredito.toString();

                    this.atualizarParcelas(simularEmprestimo);
    
                    inputCPF.value = `${inputCPF.value} | ${cliente.nome}, ${cliente.idade} anos`;

                    const divLimiteCredito = <HTMLInputElement> document.getElementById('divLimiteCredito');
                    const limiteCredito = <HTMLInputElement> document.getElementById('limiteCredito');
                    const limiteCreditoMaximo = <HTMLInputElement> document.getElementById('limiteCreditoMaximo');
                    const porcentagemLimiteCredito = <HTMLInputElement> document.getElementById('porcentagemLimiteCredito');

                    limiteCredito.innerText = cliente.limiteCredito.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                    limiteCreditoMaximo.innerText = cliente.limiteCreditoMaximo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                    porcentagemLimiteCredito.innerText = parseFloat((cliente.limiteCredito / cliente.limiteCreditoMaximo * 100).toFixed(1)).toString();

                    if (Emprestimo.validarValor(cliente.limiteCredito)) {
                        divLimiteCredito.classList.add('valid');
                        divLimiteCredito.classList.remove('invalid');
                    } else {
                        divLimiteCredito.classList.add('invalid');
                        divLimiteCredito.classList.remove('valid');
                    }
                    
                    divLimiteCredito.classList.remove('invisible');
                } catch (error) {
                    inputClienteId.value = '';
                    inputLimiteCredito.value = '';
                    invalidCpf!.innerText = 'Por favor, insira o CPF de um cliente já cadastrado';
                    target.classList.remove('is-valid');
                    target.classList.add('is-invalid');
                }
            } else {
                inputClienteId.value = '';
                inputLimiteCredito.value = '';
                invalidCpf!.innerText = 'Por favor, insira um CPF válido';
                target.classList.remove('is-valid');
                target.classList.add('is-invalid');
            }
        });

        select.addEventListener('change', (ev) => {
            this.atualizarParcelas(simularEmprestimo);
        });

        inputValor.addEventListener('blur', async (ev) => {
            await this.atualizarParcelas(simularEmprestimo);

            const invalidValor = <HTMLInputElement> document.getElementById('invalidValor');
            const valor = parseFloat(inputValor.value);
            const limiteCredito = (Number(inputLimiteCredito.value) || 50000);
            

            if (Emprestimo.validarValor(valor)) {
                inputValor.classList.add('is-valid');
                inputValor.classList.remove('is-invalid');
            } else {
                invalidValor.innerText = valor ? 'Por favor, insira um valor entre R$ 500,00 e ' + limiteCredito.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'Por favor, insira o valor do emprestimo';
                inputValor.classList.remove('is-valid');
                inputValor.classList.add('is-invalid');
            }
        });
    }

    private async atualizarParcelas(simularEmprestimo: Function) {
        const inputValor = <HTMLInputElement> document.getElementById('valorEmprestimo');
        const selectFormaDePagamento = <HTMLSelectElement>document.getElementById('formaDePagamento');

        const divParcelas = <HTMLDivElement> document.getElementById('parcelas');
        divParcelas.innerHTML = '';

        const formaDePagamentoId = Number(selectFormaDePagamento.value);
        const valorEmprestimo = parseFloat(inputValor.value);
        
        const inputValorFinal = <HTMLInputElement> document.getElementById('inputValorFinal');

        inputValorFinal.value = '';

        if (!formaDePagamentoId || !valorEmprestimo || !Emprestimo.validarValor(valorEmprestimo)) return;
        
        const parcelas = await simularEmprestimo(valorEmprestimo, formaDePagamentoId);

        const title = document.createElement('h3');
        title.innerText = 'Parcelas:';
        divParcelas.appendChild(title);

        const ol = document.createElement('ol');

        for (const parcela of parcelas) {
            const li = document.createElement('li');
            li.innerText = `${parcela.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} | Vencimento: ${(new Date(parcela.dataVencimento)).toLocaleDateString()}`;
            ol.appendChild(li);
        }

        divParcelas.appendChild(ol);

        const valorFinal = parcelas.map((parcela: Parcela) => parcela.valor).reduce((a: number, b: number) => a + b);

        inputValorFinal.value = valorFinal;

        const inputLimiteCredito = <HTMLInputElement> document.getElementById('inputLimiteCredito');
        const limiteCredito = (Number(inputLimiteCredito.value) || 50000);

        const p = document.createElement('p');
        p.innerHTML = `<i style="color: ${valorFinal > limiteCredito ? 'red' : 'green'}">Valor Final: ${valorFinal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</i>`;

        divParcelas.appendChild(p);
    }

    /**
     * @param solicitar Função que será chamada ao submeter a solicitação de empréstimo
     */
    public adicionarListenerParaSolicitacao(solicitar: Function): void {
        document.getElementById('formEmprestimo')?.addEventListener('submit', (event) => {
            event.preventDefault();

            let dadosValidos = true;

            /* CLIENTE - start */
            const inputCPF = <HTMLInputElement> document.getElementById('cpf');
            const inputClienteId = document.getElementById('inputClienteId') as HTMLInputElement;
            const inputLimiteCredito = document.getElementById('inputLimiteCredito') as HTMLInputElement;
            const clienteId = Number(inputClienteId.value);

            if (clienteId) {
                inputCPF.classList.add('is-valid');
                inputCPF.classList.remove('is-invalid');
            } else {
                dadosValidos = false;
                document.getElementById('invalidCpf')!.innerText = 'Por favor, insira o cpf do cliente';
                inputCPF.classList.remove('is-valid');
                inputCPF.classList.add('is-invalid');
            }
            /* CLIENTE - end */

            /* VALOR EMPRESTIMO - start */
            const valorEmprestimoInput = <HTMLInputElement> document.getElementById('valorEmprestimo');
            const inputValorFinal = <HTMLInputElement> document.getElementById('inputValorFinal');
            const invalidValor = document.getElementById('invalidValor');

            const valor = parseFloat(valorEmprestimoInput.value);
            const valorFinal = (Number(inputValorFinal.value) || valor);
            const limiteCredito = (Number(inputLimiteCredito.value) || 50000);
            
            if(Emprestimo.validarValor(valor) && valorFinal <= limiteCredito){
                valorEmprestimoInput.classList.add('is-valid');
                valorEmprestimoInput.classList.remove('is-invalid');
            } else {
                dadosValidos = false;
                invalidValor!.innerText = valor ? (valor <= limiteCredito ? 'O valor do empréstimo com juros deve ser menor ou igual ao limite de crédito do cliente.' : 'Por favor, insira um valor entre R$ 500,00 e ' + limiteCredito.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })) : 'Por favor, insira o valor do emprestimo';
                valorEmprestimoInput.classList.remove('is-valid');
                valorEmprestimoInput.classList.add('is-invalid');
            }
            /* VALOR EMPRESTIMO - end */

            /* FORMA DE PAGAMENTO - start */
            const selectElement = <HTMLSelectElement> document.getElementById("formaDePagamento");
            const formaDePagamentoId = Number(selectElement.value);

            if(formaDePagamentoId) {
                selectElement.classList.add('is-valid');
                selectElement.classList.remove('is-invalid');
            } else {
                dadosValidos = false;
                document.getElementById('invalidFormaDePagamento')!.innerText = 'Por favor, selecione uma forma de pagamento';
                selectElement.classList.remove('is-valid');
                selectElement.classList.add('is-invalid');
            }
            /* FORMA DE PAGAMENTO - end */
            
            if (dadosValidos) {
                const emprestimo: EmprestimoJson = {
                    cliente: {
                        id: clienteId
                    },
                    formaDePagamento: {
                        id: formaDePagamentoId
                    },
                    valorEmprestimo: valor,
                    dataHora: new Date()
                };

                solicitar(emprestimo);
            }
        }); 
    }

    
}