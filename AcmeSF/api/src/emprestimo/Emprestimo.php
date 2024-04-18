<?php
class Emprestimo { // EmprestimoDTO
	public readonly int $id;
    public readonly int $clienteId;
	public readonly int $formaDePagamentoId;
	public readonly float $valorEmprestimo;
	public readonly string $dataHora;

	public function __construct(int $id = null, int $clienteId = null, int $formaDePagamentoId = null, float $valorEmprestimo = null, string $dataHora = null) {
		if (isset($id)) $this->id = $id;
		if (isset($clienteId)) $this->clienteId = $clienteId;
		if (isset($formaDePagamentoId)) $this->formaDePagamentoId = $formaDePagamentoId;
		if (isset($valorEmprestimo)) $this->valorEmprestimo = $valorEmprestimo;
		if (isset($dataHora)) $this->dataHora = $dataHora;
	}

	public function validarDados(): bool {
		return true;
	}
}
?>