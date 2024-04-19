<?php

class Emprestimo {
	public function __construct(public readonly int $id, 
								public readonly Cliente $cliente, 
								public readonly FormaDePagamento $formaDePagamento, 
								public readonly float $valorEmprestimo, 
								public readonly string $dataHora) { }
}

?>