<?php
class Emprestimo {
    protected int $clienteId;
	protected float $valorEmprestimo;
	protected FormaDePagamento $formaDePagamento;
	public DateTime $dataHora;
	protected float $valorFinal;
	protected array $parcelas;
}
?>