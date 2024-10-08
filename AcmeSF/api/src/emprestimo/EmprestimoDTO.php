<?php

use phputil\traits\WithBuilder;

class EmprestimoDTO {

	use WithBuilder;

	public readonly int $id;
	public readonly float $valorEmprestimo;
	public readonly string $dataHora;

	// Cliente
    public readonly int $clienteId;
	public readonly string $cpf;
	public readonly string $nome;
	public readonly string $dataNascimento;
    public readonly string $telefone;
    public readonly string $email;
    public readonly string $endereco;
    public readonly float $limiteCredito;

	// Forma de Pagamento
	public readonly int $formaDePagamentoId;
	public readonly string $descricao;
	public readonly int $meses;
	public readonly float $juros;

	public static function of(object $body): EmprestimoDTO {
		$dto = new EmprestimoDTO();
		
		if (isset($body->id)) {
			try {
				$dto->id = $body->id;
			} catch (TypeError $ex) {
				throw new DataException('O id deve ser um número inteiro (id)', $ex);
			}
		}
		if (isset($body->cliente) && isset($body->cliente->id)) {
			try {
				$dto->clienteId = $body->cliente->id;
			} catch (TypeError $ex) {
				throw new DataException('O id do cliente deve ser um número inteiro (cliente->id)', $ex);
			}
		} else {
			throw new DataException('O cliente deve ser informado (cliente->id)');
		}
		if (isset($body->formaDePagamento) && isset($body->formaDePagamento->id)) {
			try {
				$dto->formaDePagamentoId = $body->formaDePagamento->id;
			} catch (TypeError $ex) {
				throw new DataException('O id da forma de pagamento deve ser um número inteiro (formaDePagamento->id)', $ex);
			}
		} else {
			throw new DataException('A forma De pagamento deve ser informada (formaDePagamento->id)');
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