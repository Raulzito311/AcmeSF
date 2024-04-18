import { Cliente } from "../models/Cliente";
import { Emprestimo } from "../models/Emprestimo";
import { FormaDePagamento } from "../models/FormaDePagamento";
import { View } from "./View";
import { validarCPF } from "./util/cpfUtil";

export class SolicitarEmprestimoView extends View {
    private cliente : Cliente | null = null;
    constructor() {
        super('solicitarEmprestimo');
    }
    public async exibirSolicitacaoDeEmprestimo(clientes: Cliente[], formasDePagamento: FormaDePagamento[]): Promise<void> {
        const inputCPF: HTMLInputElement = <HTMLInputElement> document.getElementById('cpf');

        // Formata o cpf digitado
        inputCPF.addEventListener('input', function(event) {
            const target: HTMLInputElement = <HTMLInputElement>event.target;
            
            target.value = target.value.replace(/\D/g, '') // Remove qualquer coisa que não seja número
                                    .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o terceiro dígito
                                    .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o sexto dígito
                                    .replace(/(\d{3})(\d)/, '$1-$2') // Adiciona traço após o nono dígito
                                    .replace(/(-\d{2})\d+$/, '$1'); // Impede entrada de mais de 11 dígitos
        });

        // Valida o cliente
        inputCPF.addEventListener('blur', function (event) {
            const target: HTMLInputElement = <HTMLInputElement>event.target;
            const invalidCpf = document.getElementById('invalidCpf');
            const inputCliente = document.getElementById('cliente');

            if (!target.value) {
                inputCliente!.innerHTML = '';
                invalidCpf!.innerText = 'Por favor, insira o cpf do cliente';
                target.classList.remove('is-valid');
                target.classList.add('is-invalid');
            } else if (validarCPF(target.value)) {
                const cliente = clientes.find(cliente => cliente.cpf == target.value);
                if (cliente) {
                    //Cria o elemento input
                    const inputInvisivel = document.createElement('input');
                    inputInvisivel.setAttribute('type', 'text');
                    inputInvisivel.setAttribute('id', 'inputInvisivel');
                    inputInvisivel.style.display = 'none';
                    inputInvisivel.innerText = String(cliente.id);
                    document.body.appendChild(inputInvisivel);


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

                    inputCliente!.appendChild(span);
                } else {
                    inputCliente!.innerHTML = '';
                    invalidCpf!.innerText = 'Por favor, insira o CPF de um cliente já cadastrado';
                    target.classList.remove('is-valid');
                    target.classList.add('is-invalid');
                }
            } else {
                inputCliente!.innerHTML = '';
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
        let valor = 0;
        document.getElementById('formEmprestimo')?.addEventListener('submit', async (event) => {
            event.preventDefault();
            const selectElement = document.getElementById("formaDePagamento") as HTMLSelectElement;;
            var opcaoSelecionada = selectElement.options[selectElement.selectedIndex];
            var textoOpcaoSelecionada = opcaoSelecionada.textContent;

            if(textoOpcaoSelecionada){
                if(textoOpcaoSelecionada == "Escolher..."){
                    selectElement.classList.remove('is-valid');
                    selectElement.classList.add('is-invalid');
                }
                else{
                    selectElement.classList.add('is-valid');
                    selectElement.classList.remove('is-invalid');
                }
            }

            const valorEmprestimoInput = document.getElementById('valorEmprestimo') as HTMLInputElement;
            
            if (valorEmprestimoInput) {

                valor = parseFloat(valorEmprestimoInput.value);
                
                if(valor > 500 && valor < 50000){
                    valorEmprestimoInput.classList.add('is-valid');
                    valorEmprestimoInput.classList.remove('is-invalid');
                }
                else{
                    valorEmprestimoInput.classList.remove('is-valid');
                    valorEmprestimoInput.classList.add('is-invalid');
                }
            }
            });
            (async () => {
                const idCliente = document.getElementById("inputInvisivel")?.textContent;
                const selectElement = document.getElementById("formaDePagamento") as HTMLSelectElement;;
                var opcaoSelecionada = selectElement.options[selectElement.selectedIndex];
                const idFormaDePagamento = opcaoSelecionada.value; 
                // TODO: Preencher com os valores dos inputs
                const emprestimo = await Emprestimo.of({
                    clienteId : Number(idCliente),
                    formaDePagamentoId : Number(idFormaDePagamento),
                    valorEmprestimo : valor,
                    data : new Date()
                });
                console.log(emprestimo);
                solicitar(emprestimo);
            })(); 

            
    }

    
}