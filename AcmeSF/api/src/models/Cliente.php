<?php

class Cliente{
    protected int $id;
    protected string $cpf;
    protected string $nome;
    protected DateTime $dataNascimento;

    function __construct(int $id, string $cpf, string $nome, DateTime $dataNascimento)
    {
        $this->id = $id;
        $this->cpf = $cpf;    
        $this->nome = $nome;    
        $this->dataNascimento = $dataNascimento;    
    }
}
?>