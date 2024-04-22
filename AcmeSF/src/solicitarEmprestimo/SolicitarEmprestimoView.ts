import { Emprestimo, EmprestimoJson } from "../emprestimo/Emprestimo";
import { FormaDePagamento } from "../formaDePagamento/FormaDePagamento";
import { carregarPaginaDeListarEmprestimos } from "../listarEmprestimos/listarEmprestimos.ts";
import { View } from "../util/View";
import { validarCPF } from "../util/cpfUtil";

export class SolicitarEmprestimoView extends View {
    private buscarPeloCPF: Function;
    constructor(buscarPeloCPF: Function) {
        super('solicitarEmprestimo');
        this.buscarPeloCPF = buscarPeloCPF;
    }

    public async exibirSolicitacaoDeEmprestimo(formasDePagamento: FormaDePagamento[]): Promise<void> {
        const inputCPF = <HTMLInputElement> document.getElementById('cpf');
        const inputValor = <HTMLInputElement> document.getElementById('valorEmprestimo');

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
            const invalidCpf = document.getElementById('invalidCpf');
            const inputClienteId = <HTMLInputElement> document.getElementById('inputClienteId');

            if (!target.value) {
                invalidCpf!.innerText = 'Por favor, insira o cpf do cliente';
                target.classList.remove('is-valid');
                target.classList.add('is-invalid');
            } else if (validarCPF(target.value)) {
                try {
                    const cliente = await this.buscarPeloCPF(target.value);
    
                    target.classList.remove('is-invalid');
                    target.classList.add('is-valid');

                    inputClienteId.innerText = cliente.id.toString();
    
                    const today = new Date();
                    const nascimento = new Date(cliente.dataNascimento);
    
                    let idade = today.getFullYear() - nascimento.getFullYear();
                    if (new Date(today.getFullYear(), today.getMonth(), today.getDate()) < new Date(today.getFullYear(), nascimento.getMonth(), nascimento.getDate()))
                        idade--;
    
                    inputCPF.value = `${inputCPF.value} | ${cliente.nome}, ${idade} anos`;
                } catch (error) {
                    inputClienteId.innerText = '';
                    invalidCpf!.innerText = 'Por favor, insira o CPF de um cliente já cadastrado';
                    target.classList.remove('is-valid');
                    target.classList.add('is-invalid');
                }
            } else {
                invalidCpf!.innerText = 'Por favor, insira um CPF válido';
                target.classList.remove('is-valid');
                target.classList.add('is-invalid');
            }
        });

        const select = <HTMLSelectElement>document.getElementById('formaDePagamento');
        
        // Preenche as opções de formas de pagamento
        for (const formaDePagamento of formasDePagamento) {
            const option = document.createElement('option');
            option.innerText = formaDePagamento.descricao;
            option.value = formaDePagamento.id.toString();
            select.appendChild(option);
        }

        select.addEventListener('change', (ev) => {
            this.atualizarParcelas(formasDePagamento);
        });

        inputValor.addEventListener('blur', (ev) => {
            this.atualizarParcelas(formasDePagamento);

            const invalidValor = document.getElementById('invalidValor');
            const valor = parseFloat(inputValor.value);

            if(Emprestimo.validarValor(valor)){
                inputValor.classList.add('is-valid');
                inputValor.classList.remove('is-invalid');
            } else {
                invalidValor!.innerText = valor ? 'Por favor, insira um valor entre R$ 500,00 e R$ 50.000,00' : 'Por favor, insira o valor do emprestimo';
                inputValor.classList.remove('is-valid');
                inputValor.classList.add('is-invalid');
            }
        });
    }

    private atualizarParcelas(formasDePagamento: FormaDePagamento[]) {
        const inputValor = <HTMLInputElement> document.getElementById('valorEmprestimo');
        const selectFormaDePagamento = <HTMLSelectElement>document.getElementById('formaDePagamento');

        const divParcelas = <HTMLDivElement> document.getElementById('parcelas');
        divParcelas.innerHTML = '';

        const formaDePagamentoId = Number(selectFormaDePagamento.value);
        const valor = parseFloat(inputValor.value);

        if (!formaDePagamentoId || !valor || !Emprestimo.validarValor(valor)) return;

        const formaDePagamento = <FormaDePagamento> formasDePagamento.find(f => f.id === formaDePagamentoId);

        const title = document.createElement('h3');
        title.innerText = 'Parcelas:';
        divParcelas.appendChild(title);

        const parcelas = Emprestimo.calcularParcelas(valor, formaDePagamento.meses);

        const ol = document.createElement('ol');

        const date = new Date();

        for (const parcela of parcelas) {
            const li = document.createElement('li');
            date.setDate(date.getDate() + 30);
            li.innerText = `R$${parcela} | Vencimento: ${date.toLocaleDateString()}`;
            ol.appendChild(li);
        }

        divParcelas.appendChild(ol);
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
            const clienteId = Number(inputClienteId.textContent);

            if (clienteId) {
                inputCPF.classList.add('is-valid');
                inputCPF.classList.remove('is-invalid');
            } else {
                dadosValidos = false;
                inputCPF.classList.remove('is-valid');
                inputCPF.classList.add('is-invalid');
            }
            /* CLIENTE - end */

            /* VALOR EMPRESTIMO - start */
            const valorEmprestimoInput = <HTMLInputElement> document.getElementById('valorEmprestimo');
            const invalidValor = document.getElementById('invalidValor');

            const valor = parseFloat(valorEmprestimoInput.value);
            
            if(Emprestimo.validarValor(valor)){
                valorEmprestimoInput.classList.add('is-valid');
                valorEmprestimoInput.classList.remove('is-invalid');
            } else {
                dadosValidos = false;
                invalidValor!.innerText = valor ? 'Por favor, insira um valor entre R$ 500,00 e R$ 50.000,00' : 'Por favor, insira o valor do emprestimo';
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