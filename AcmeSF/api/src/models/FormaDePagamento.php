<?php
class FormaDePagamento{
    protected int $id;
    protected string $descricao;
    protected int $meses;
    protected float $juros;

    function __construct(int $id, string $descricao, int $meses, float $juros)
	{
		$this->id = $id;
		$this->descricao = $descricao;
		$this->meses = $meses;
		$this->juros = $juros; 
	}
    function getJuros(){
        return $this->juros;
    }
    function getMeses(){
        return $this->meses;
    }
    function getDescricao(){
        return $this->descricao;
    }
}

?>