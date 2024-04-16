<?php
class FormaDePagamento {
    public readonly int $id;
    public readonly string $descricao;
    public readonly int $meses;
    public readonly float $juros;

    function __construct(int $id, string $descricao, int $meses, float $juros) {
		$this->id = $id;
		$this->descricao = $descricao;
		$this->meses = $meses;
		$this->juros = $juros; 
	}
}

?>