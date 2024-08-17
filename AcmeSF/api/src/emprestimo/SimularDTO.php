<?php

use phputil\traits\WithBuilder;

class SimularDTO {

	use WithBuilder;

	public readonly int $formaDePagamentoId;
	public readonly float $valorEmprestimo;

	public static function of(object $body): SimularDTO {
		$dto = new SimularDTO();

		if (isset($body->formaDePagamentoId)) {
			try {
				$dto->formaDePagamentoId = $body->formaDePagamentoId;
			} catch (TypeError $ex) {
				throw new DataException('O id da forma de pagamento deve ser um número inteiro (formaDePagamentoId)', $ex);
			}
		} else {
			throw new DataException('A forma De pagamento deve ser informada (formaDePagamentoId)');
		}
		if (isset($body->valorEmprestimo)) {
			try {
				$dto->valorEmprestimo = $body->valorEmprestimo;
				if ($dto->valorEmprestimo < 500 || $dto->valorEmprestimo > 50000)
					throw new Exception();
			} catch (TypeError | Exception $ex) {
				throw new DataException('O valor do emprestimo deve ser um número decimal entre R$ 500,00 e R$ 50.000,00 (valorEmprestimo)', $ex);
			}
		} else {
			throw new DataException('O valor do emprestimo deve ser informado (valorEmprestimo)');
		}

		return $dto;
	}
}

?>