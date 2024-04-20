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
		if (!isset($this->clienteId))
			throw new DataException('O cliente deve ser informado (cliente->id)');
		if (!isset($this->formaDePagamentoId))
			throw new DataException('A forma De pagamento deve ser informada (formaDePagamento->id)');
		if (!isset($this->valorEmprestimo))
			throw new DataException('O valor do emprestimo deve ser informado (valorEmprestimo)');
		if (!isset($this->dataHora))
			throw new DataException('A data e hora devem ser informadas (dataHora)');
	}

	public static function of(object $body): EmprestimoDTO {
		$dto = new EmprestimoDTO();
		
		if (isset($body->id)) {
			try {
				$dto->id = $body->id;
			} catch (\Throwable $ex) {
				throw new DataException('O id deve ser um número inteiro (id)', $ex);
			}
		}
		if (isset($body->cliente) && isset($body->cliente->id)) {
			try {
				$dto->clienteId = $body->cliente->id;
			} catch (\Throwable $ex) {
				throw new DataException('O id do cliente deve ser um número inteiro (cliente->id)', $ex);
			}
		}
		if (isset($body->formaDePagamento) && isset($body->formaDePagamento->id)) {
			try {
				$dto->formaDePagamentoId = $body->formaDePagamento->id;
			} catch (\Throwable $ex) {
				throw new DataException('O id da forma de pagamento deve ser um número inteiro (formaDePagamento->id)', $ex);
			}
		}
		if (isset($body->valorEmprestimo)) {
			try {
				$dto->valorEmprestimo = $body->valorEmprestimo;
				if ($dto->valorEmprestimo < 500 || $dto->valorEmprestimo > 50000)
					throw new Exception();
			} catch (\Throwable $ex) {
				throw new DataException('O valor do emprestimo deve ser um número decimal entre R$ 500,00 e R$ 50.000,00 (valorEmprestimo)', $ex);
			}
		}
		if (isset($body->dataHora)) {
			try {
				$dto->dataHora = $body->dataHora;
				if (!DateUtil::validateDate($dto->dataHora))
					throw new Exception();
			} catch (\Throwable $ex) {
				throw new DataException('A data e hora deve ser uma string válida no formato "ano-mês-dia hora:minuto:segundo" (dataHora)', $ex);
			}
		}

		return $dto;
	}
}

?>