<?php

class Emprestimo {
	public function __construct(public readonly int $id, 
								public readonly Cliente $cliente, 
								public readonly FormaDePagamento $formaDePagamento, 
								public readonly float $valorEmprestimo, 
								public readonly string $dataHora) { }

    public static function of(EmprestimoDTO $body): Emprestimo {
		$emprestimo = new Emprestimo($body->id, Cliente::of($body), FormaDePagamento::of($body), $body->valorEmprestimo, $body->dataHora);

		return $emprestimo;
	}
}

?>