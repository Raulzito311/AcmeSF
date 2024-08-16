<?php

class Parcela {
	// public readonly int $id;
	// public readonly Emprestimo $emprestimo;
	// public readonly float $valor;
	// public readonly bool $paga;
	// public readonly string $dataVencimento;
	// public readonly string $dataHoraPagamento;
	// public readonly Usuario $usuarioPagamento;

	public function __construct(public readonly int $id, 
								public readonly Emprestimo $emprestimo, 
								public readonly float $valor, 
								public readonly bool $paga, 
								public readonly string $dataVencimento, 
								public readonly ?string $dataHoraPagamento = null, 
								public readonly ?Usuario $usuarioPagamento = null) { }
}

?>