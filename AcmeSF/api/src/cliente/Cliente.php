<?php

class Cliente{
    public readonly int $id;
    public readonly string $cpf;
    public readonly string $nome;
    public readonly string $dataNascimento;
    public readonly string $telefone;
    public readonly string $email;
    public readonly string $endereco;
    public readonly float $limiteCredito;
    public readonly float $limiteCreditoMaximo;

    public static function of(EmprestimoDTO $body): Cliente {
		$cliente = new Cliente();

        $cliente->id = $body->clienteId;
        $cliente->cpf = $body->cpf;
        $cliente->nome = $body->nome;
        $cliente->dataNascimento = $body->dataNascimento;
        $cliente->telefone = $body->telefone;
        $cliente->email = $body->email;
        $cliente->endereco = $body->endereco;
        $cliente->limiteCredito = $body->limiteCredito;
        $cliente->limiteCreditoMaximo = $body->limiteCredito;

		return $cliente;
	}

    public static function ofObj(object $body): Cliente {
		$cliente = new Cliente();

        if (isset($body->id)) {
			try {
				$cliente->id = $body->id;
			} catch (TypeError $ex) {
				throw new DataException('O id deve ser um número inteiro (id)', $ex);
			}
		}
		if (isset($body->cpf)) {
			try {
                if (!StringUtil::validateCpf($body->cpf))
					throw new Exception();
				$cliente->cpf = $body->cpf;
			} catch (TypeError | Exception $ex) {
				throw new DataException('O cpf deve ser uma string válida no formato "000.000.000-00" (cpf)', $ex);
			}
		} else {
			throw new DataException('O cpf deve ser informado (cpf)');
		}
		if (isset($body->nome)) {
			try {
				$cliente->nome = $body->nome;
			} catch (TypeError | Exception $ex) {
				throw new DataException('O nome deve ser uma string válida (nome)', $ex);
			}
		} else {
			throw new DataException('O nome deve ser informado (nome)');
		}
		if (isset($body->dataNascimento)) {
			try {
				if (!StringUtil::validateDate($body->dataNascimento))
					throw new Exception();
				$cliente->dataNascimento = $body->dataNascimento;
			} catch (TypeError | Exception $ex) {
				throw new DataException('A data de nascimento deve ser uma string válida no formato "ano-mês-dia" (dataHora)', $ex);
			}
		} else {
			throw new DataException('A data e hora devem ser informadas (dataHora)');
		}
		if (isset($body->telefone)) {
			try {
				$cliente->telefone = $body->telefone;
			} catch (TypeError | Exception $ex) {
				throw new DataException('O telefone deve ser uma string válida (telefone)', $ex);
			}
		} else {
			throw new DataException('O telefone deve ser informado (telefone)');
		}
		if (isset($body->email)) {
			try {
				if (!StringUtil::validateEmail($body->email))
					throw new Exception();
				$cliente->email = $body->email;
			} catch (TypeError | Exception $ex) {
				throw new DataException('O email deve ser uma string válida no formato "****@***.**" (email)', $ex);
			}
		} else {
			throw new DataException('O email deve ser informado (email)');
		}
		if (isset($body->endereco)) {
			try {
				$cliente->endereco = $body->endereco;
			} catch (TypeError | Exception $ex) {
				throw new DataException('O endereco deve ser uma string válida (endereco)', $ex);
			}
		} else {
			throw new DataException('O endereco deve ser informado (endereco)');
		}
		if (isset($body->limiteCredito)) {
			try {
				$cliente->limiteCredito = $body->limiteCredito;
				$cliente->limiteCreditoMaximo = $body->limiteCredito;
			} catch (TypeError | Exception $ex) {
				throw new DataException('O limite de crédito deve ser um número decimal (limiteCredito)', $ex);
			}
		} else {
			throw new DataException('O limite de crédito deve ser informado (limiteCredito)');
		}

        return $cliente;
    }
}
?>