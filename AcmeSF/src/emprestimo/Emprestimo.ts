import { clientesService } from "../cliente/ClientesService";
import { formasDePagamentoService } from "../formaDePagamento/FormasDePagamentoService";
import { Cliente, ClienteJson } from "../cliente/Cliente";
import { FormaDePagamento, FormaDePagamentoJson } from "../formaDePagamento/FormaDePagamento";

export class Emprestimo {
	readonly id: number;
	readonly cliente: Cliente;
	readonly valorEmprestimo: number;
	readonly formaDePagamento: FormaDePagamento;
	readonly dataHora: Date;
	readonly valorFinal: number;
	readonly parcelas: number[];

	constructor(id: number, cliente: Cliente, valorEmprestimo: number, formaDePagamento: FormaDePagamento, dataHora: Date) {
		this.id = id;
		this.cliente = cliente;
		this.valorEmprestimo = valorEmprestimo;
		this.formaDePagamento = formaDePagamento;
		this.dataHora = dataHora;

		this.valorFinal = this.valorEmprestimo + (this.valorEmprestimo * this.formaDePagamento.juros);

		this.parcelas = [];

		this.calcularParcelas();
	}

	static of(json: EmprestimoJson): Emprestimo {
		const cliente = Cliente.of(json.cliente);
		const formaDePagamento = FormaDePagamento.of(json.formaDePagamento);

		return new this(json.id || -1, cliente, json.valorEmprestimo, formaDePagamento, new Date(json.dataHora));
	}

	private calcularParcelas(): void {
		const valorParcela = Math.floor((this.valorFinal / this.formaDePagamento.meses) * 100) / 100;
		let centavosSobrando = Math.round((this.valorFinal - (valorParcela * this.formaDePagamento.meses)) * 100);

		for (let i = 0; i < this.formaDePagamento.meses; i++) {
			let valor = valorParcela;
			if (centavosSobrando > 0) {
				valor += 0.01;
				centavosSobrando--;
			}
			this.parcelas.push(Math.round(valor*100)/100);
		}
	}
}

export type EmprestimoJson = {
	id?: number;
	cliente: ClienteJson;
	formaDePagamento: FormaDePagamentoJson;
	valorEmprestimo: number;
	dataHora: string | Date;
}
