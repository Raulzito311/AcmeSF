<?php

class Cliente{
    public readonly int $id;
    public readonly string $cpf;
    public readonly string $nome;
    public readonly string $dataNascimento;

    public static function of(EmprestimoDTO $body): Cliente {
		$cliente = new Cliente();

        $cliente->id = $body->clienteId;
        $cliente->cpf = $body->cpf;
        $cliente->nome = $body->nome;
        $cliente->dataNascimento = $body->dataNascimento;

		return $cliente;
	}
}
?>