import { Cliente } from "../models/Cliente";
import { Emprestimo } from "../models/Emprestimo";
import { FormaDePagamento } from "../models/FormaDePagamento";
import { View } from "./View";
import { validarCPF } from "./util/cpfUtil";

export class SolicitarEmprestimoView extends View {

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
                    target.classList.remove('is-invalid');
                    target.classList.add('is-valid');

                    const span = document.createElement('span');
                    span.classList.add('input-group-text');
                    span.classList.add('p-3');

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
        document.getElementById('formEmprestimo')?.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            // TODO: garantir que valor e forma de pagamento foram validados

            // TODO: Preencher com os valores dos inputs
            /*const emprestimo = await Emprestimo.of({
                clienteId: 0,
                formaDePagamentoId: 0,
                valorEmprestimo: 0,
                data: new Date()
            });*/

            //solicitar(emprestimo);// TODO: enviar objeto de Emprestimo
        });
    }
    
}