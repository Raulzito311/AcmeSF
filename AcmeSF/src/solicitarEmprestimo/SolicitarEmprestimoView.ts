import { EmprestimoJson } from "../emprestimo/Emprestimo";
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
            const target = <HTMLInputElement>event.target;
            
            if (target.value.match(/(\d+\.\d{2}).+/))
                target.value = target.value.replace(/(\d+\.\d{2}).+/, '$1'); // Impede entrada de mais de 2 casas decimais
        });

        // Valida o cliente
        inputCPF.addEventListener('blur', async (event) => {
            const target: HTMLInputElement = <HTMLInputElement> event.target;
            const invalidCpf = document.getElementById('invalidCpf');
            const divCliente = document.getElementById('cliente');
            const inputClienteId = <HTMLInputElement> document.getElementById('inputClienteId');

            if (!target.value) {
                divCliente!.innerHTML = '';
                invalidCpf!.innerText = 'Por favor, insira o cpf do cliente';
                target.classList.remove('is-valid');
                target.classList.add('is-invalid');
            } else if (validarCPF(target.value)) {
                try {
                    const cliente = await this.buscarPeloCPF(target.value);

                    //Cria o elemento input
                    inputClienteId.innerText = cliente.id.toString();
    
                    target.classList.remove('is-invalid');
                    target.classList.add('is-valid');
    
                    let span = document.getElementById("input-group-text")
    
                    if(span === null){
                        span = document.createElement('span');
                        span.classList.add('input-group-text');
                        span.id = "input-group-text";
                        span.classList.add('p-3');
                    }
    
                    const today = new Date();
                    const nascimento = new Date(cliente.dataNascimento);
    
                    let idade = today.getFullYear() - nascimento.getFullYear();
                    if (new Date(today.getFullYear(), today.getMonth(), today.getDate()) < new Date(today.getFullYear(), nascimento.getMonth(), nascimento.getDate()))
                        idade--;
    
                    span.innerText = `${cliente.nome} | ${idade} anos`;
    
                    divCliente!.appendChild(span);
                } catch (error) {
                    inputClienteId.innerText = '';
                    divCliente!.innerHTML = '';
                    invalidCpf!.innerText = 'Por favor, insira o CPF de um cliente já cadastrado';
                    target.classList.remove('is-valid');
                    target.classList.add('is-invalid');
                }
            } else {
                divCliente!.innerHTML = '';
                invalidCpf!.innerText = 'Por favor, insira um CPF válido';
                target.classList.remove('is-valid');
                target.classList.add('is-invalid');
            }
        });

        // Preenche as opções de formas de pagamento
        const select: HTMLSelectElement = <HTMLSelectElement>document.getElementById('formaDePagamento');

        for (const formaDePagamento of formasDePagamento) {
            const option: HTMLOptionElement = document.createElement('option');
            option.innerText = formaDePagamento.descricao;
            option.value = formaDePagamento.id.toString();
            select.appendChild(option);
        }
    }

    /**
     * @param solicitar Função que será chamada ao submeter a solicitação de empréstimo
     */
    public adicionarListenerParaSolicitacao(solicitar: Function): void {
        document.getElementById('formEmprestimo')?.addEventListener('submit', async (event) => {
            event.preventDefault();

            let dadosValidos = true;

            /* CLIENTE - start */
            const inputCPF = <HTMLInputElement> document.getElementById('cpf');
            const inputClienteId = document.getElementById('inputClienteId') as HTMLInputElement;
            const clienteId = Number(inputClienteId.textContent);

            if (clienteId || isNaN(clienteId)) {
                inputCPF.classList.add('is-valid');
                inputCPF.classList.remove('is-invalid');
            } else {
                dadosValidos = false;
                inputCPF.classList.remove('is-valid');
                inputCPF.classList.add('is-invalid');
            }
            /* CLIENTE - end */

            /* VALOR EMPRESTIMO - start */
            const valorEmprestimoInput = document.getElementById('valorEmprestimo') as HTMLInputElement;
            const invalidValor = document.getElementById('invalidValor');

            const valor = parseFloat(valorEmprestimoInput.value);
            
            if(valor >= 500 && valor <= 50000){
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
            const selectElement = document.getElementById("formaDePagamento") as HTMLSelectElement;
            const formaDePagamentoId = Number(selectElement.value);

            if(formaDePagamentoId || isNaN(formaDePagamentoId)) {
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

                try {
                    await solicitar(emprestimo);
                    
                    carregarPaginaDeListarEmprestimos();
                } catch (errorMessage) {
                    alert(errorMessage);
                }
            }
        }); 
    }

    
}