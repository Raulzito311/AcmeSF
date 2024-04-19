<?php

use phputil\traits\WithBuilder;

class EmprestimoDTO {

	use WithBuilder;

	public readonly int $id;
    public readonly int $clienteId;
	public readonly int $formaDePagamentoId;
	public readonly float $valorEmprestimo;
	public readonly string $dataHora;

	public function validarDados(): void {
		if ($this->valorEmprestimo < 500 || $this->valorEmprestimo > 50000)
			throw new RepositoryException("O valor do empréstimo deve ser entre R$ 500,00 e R$ 50.000,00", 400);
	}

	public static function of(object $body): EmprestimoDTO {
		$dto = new EmprestimoDTO();
		
		if (isset($body->id))
			$dto->id = $body->id;
		if (isset($body->cliente) && isset($body->cliente->id))
			$dto->clienteId = $body->cliente->id;
		if (isset($body->formaDePagamento) && isset($body->formaDePagamento->id))
			$dto->formaDePagamentoId = $body->formaDePagamento->id;
		if (isset($body->valorEmprestimo))
			$dto->valorEmprestimo = $body->valorEmprestimo;
		if (isset($body->dataHora))
			$dto->dataHora = $body->dataHora;

		return $dto;
	}
}

?>