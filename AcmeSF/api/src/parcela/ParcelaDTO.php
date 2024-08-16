<?php

class ParcelaDTO {
	public readonly int $id;
	public readonly float $valor;
	public readonly ?int $emprestimoId;
	public readonly ?int $paga;
	public readonly ?string $dataVencimento;
	public readonly ?string $dataHoraPagamento;

	// Usuario Pagamento
	public readonly ?string $usuarioPagamento;
}

?>