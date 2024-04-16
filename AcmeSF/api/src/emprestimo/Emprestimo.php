<?php
class Emprestimo {
	public readonly int $id;
    public readonly Cliente $cliente;
	public readonly FormaDePagamento $formaDePagamento;
	public readonly float $valorEmprestimo;
	public readonly DateTime $dataHora;

	function __construct(int $id, Cliente $cliente, float $valorEmprestimo, FormaDePagamento $formaDePagamento, DateTime $dataHora) {
		$this->id = $id;
		$this->cliente = $cliente;
		$this->valorEmprestimo = $valorEmprestimo;
		$this->formaDePagamento = $formaDePagamento;
		$this->dataHora = $dataHora; 
	}

}
?>