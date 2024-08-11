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

		return $cliente;
	}
}
?>