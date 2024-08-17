import { Cliente, ClienteJson } from "../cliente/Cliente";
import { FormaDePagamento, FormaDePagamentoJson } from "../formaDePagamento/FormaDePagamento";

export class Emprestimo {
	readonly id: number;
	readonly cliente: Cliente;
	readonly valorEmprestimo: number;
	readonly formaDePagamento: FormaDePagamento;
	readonly dataHora: Date;
	readonly valorComJuros: number|null;

	constructor(id: number, cliente: Cliente, valorEmprestimo: number, formaDePagamento: FormaDePagamento, dataHora: Date, valorComJuros: number|null = null) {
		this.id = id;
		this.cliente = cliente;
		this.valorEmprestimo = valorEmprestimo;
		this.formaDePagamento = formaDePagamento;
		this.dataHora = dataHora;
		this.valorComJuros = valorComJuros;
	}

	static of(json: EmprestimoJson): Emprestimo {
		const cliente = Cliente.of(json.cliente);
		const formaDePagamento = FormaDePagamento.of(json.formaDePagamento);

		return new this(json.id || -1, cliente, json.valorEmprestimo, formaDePagamento, new Date(json.dataHora), json.valorComJuros);
	}

	public static validarValor(valor: number): boolean {
		return valor >= 500 && valor <= 50000;
	}
}

export type EmprestimoJson = {
	id?: number;
	cliente: ClienteJson;
	formaDePagamento: FormaDePagamentoJson;
	valorEmprestimo: number;
	dataHora: string | Date;
	valorComJuros?: number;
}
