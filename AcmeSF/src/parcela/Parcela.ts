export type Parcela = {
	id: number;
	valor: number;
	paga: number;
	dataVencimento: string|Date;
	dataHoraPagamento: string|Date;
	usuarioPagamento: string;
}