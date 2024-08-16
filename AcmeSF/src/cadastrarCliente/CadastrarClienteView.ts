import { View } from "../util/View.ts";
import { validarCPF } from "../util/cpfUtil";
import { ClienteJson } from "../cliente/Cliente";

export class CadastrarClienteView extends View {
    constructor() {
        super('cadastrarCliente');
    }

    public async load(): Promise<void> {
        await super.load();

        const inputDataNascimento = <HTMLInputElement> document.getElementById('dataNascimento');

        inputDataNascimento.max = new Date().toLocaleDateString(new Intl.Locale('ja'));

        const inputCPF = <HTMLInputElement> document.getElementById('cpf');

        // Formata o cpf digitado
        inputCPF.addEventListener('input', function(event) {
            const target = <HTMLInputElement>event.target;
            
            target.value = target.value.replace(/\D/g, '') // Remove qualquer coisa que não seja número
                                    .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o terceiro dígito
                                    .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o sexto dígito
                                    .replace(/(\d{3})(\d)/, '$1-$2') // Adiciona traço após o nono dígito
                                    .replace(/(-\d{2})\d+$/, '$1'); // Impede entrada de mais de 11 dígitos
        });

        // Valida o cpf digitado
        inputCPF.addEventListener('blur', async (event) => {
            const target: HTMLInputElement = <HTMLInputElement> event.target;
            const invalidCpf = document.getElementById('invalidCpf');

            if (!target.value) {
                invalidCpf!.innerText = 'Por favor, insira o cpf do cliente';
                target.classList.remove('is-valid');
                target.classList.add('is-invalid');
            } else if (validarCPF(target.value)) {
                target.classList.remove('is-invalid');
                target.classList.add('is-valid');
            } else {
                invalidCpf!.innerText = 'Por favor, insira um CPF válido';
                target.classList.remove('is-valid');
                target.classList.add('is-invalid');
            }
        });
    }

    /**
     * @param solicitar Função que será chamada ao submeter o formulário para criação de cliente
     */
    public adicionarListenerParaCadastro(cadastrar: Function): void {
        document.getElementById('formCadastroCliente')?.addEventListener('submit', (event) => {
            event.preventDefault();

            const inputNome = <HTMLInputElement> document.getElementById('nome');
            const inputCPF = <HTMLInputElement> document.getElementById('cpf');
            const inputDataNascimento = <HTMLInputElement> document.getElementById('dataNascimento');
            const inputTelefone = <HTMLInputElement> document.getElementById('telefone');
            const inputEmail = <HTMLInputElement> document.getElementById('email');
            const inputEndereco = <HTMLInputElement> document.getElementById('endereco');
            const inputLimiteCredito = <HTMLInputElement> document.getElementById('limiteCredito');
            const limiteCredito = parseFloat(inputLimiteCredito.value);
            
            const cliente: ClienteJson = {
                nome: inputNome.value,
                cpf: inputCPF.value,
                dataNascimento: inputDataNascimento.value,
                telefone: inputTelefone.value,
                email: inputEmail.value,
                endereco: inputEndereco.value,
                limiteCredito: limiteCredito
            };

            cadastrar(cliente);
        }); 
    }
}