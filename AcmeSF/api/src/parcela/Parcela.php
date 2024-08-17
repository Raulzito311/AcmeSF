<?php

class Parcela {
	public readonly int $id;
	public readonly float $valor;
	public readonly ?int $emprestimoId;
	public readonly ?int $paga;
	public readonly ?string $dataVencimento;
	public readonly ?string $dataHoraPagamento;

	// Usuario Pagamento
	public readonly ?string $usuarioPagamento;

	public static function criarParcela(float $valor, string $dataVencimento, ?int $emprestimoId = null) {
		$parcela = new Parcela();

		$parcela->valor = $valor;
		$parcela->emprestimoId = $emprestimoId;
		$parcela->dataVencimento = $dataVencimento;
		$parcela->paga = 0;

		return $parcela;
	}
}

?>