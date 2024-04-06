import { Cliente } from "./Cliente";
import { FormaDePagamento } from "./FormaDePagamento";

export class Emprestimo {
	cliente: Cliente;
	valorEmprestimo: number;
	formaDePagamento: FormaDePagamento;
	dataHora: Date;
	valorFinal: number;
	parcelas: number[];

	constructor(cliente: Cliente,
				valorEmprestimo: number,
				formaDePagamento: FormaDePagamento,
				dataHora: Date) {
		this.cliente = cliente;
		this.valorEmprestimo = valorEmprestimo;
		this.formaDePagamento = formaDePagamento;
		this.dataHora = dataHora;

		this.parcelas = [];

		this.calcularValores();
	}

	private calcularValores(): void {
		this.valorFinal = this.valorEmprestimo + (this.valorEmprestimo * this.formaDePagamento.juros);

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
