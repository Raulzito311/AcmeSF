<?php
class Emprestimo {
	protected int $id;
    protected Cliente $cliente;
	protected float $valorEmprestimo;
	protected FormaDePagamento $formaDePagamento;
	public DateTime $dataHora;
	protected float $valorFinal;
	protected array $parcelas;

	function __construct(int $id, Cliente $cliente, float $valorEmprestimo, FormaDePagamento $formaDePagamento, DateTime $dataHora)
	{
		$this->id = $id;
		$this->cliente = $cliente;
		$this->valorEmprestimo = $valorEmprestimo;
		$this->formaDePagamento = $formaDePagamento;
		$this->dataHora = $dataHora; 
		$this->valorFinal = $this->valorEmprestimo + ($this->valorEmprestimo * $this->formaDePagamento->getJuros());
	}

	function calcularParcelas(){
		$valorParcela = floor(($this->valorFinal / $this->formaDePagamento->getMeses()) * 100) / 100;
		$centavosSobrando = round(($this->valorFinal - ($valorParcela * $this->formaDePagamento->getMeses())) * 100);
	  
		for ($i = 0; $i < $this->formaDePagamento->getMeses(); $i++) {
		  $valor = $valorParcela;
		  if ($centavosSobrando > 0) {
			$valor += 0.01;
			$centavosSobrando--;
		  }
		  $this->parcelas[] = round($valor * 100) / 100;
		}
	}

	function getValorEmprestimo(){
		return $this->valorEmprestimo;
	}

	function getFormaDePagamento(){
		return $this->formaDePagamento;
	}	
	
	function getDataHora(){
		return $this->dataHora;
	}

	function getValorFinal(){
		return $this->valorFinal;
	}

	function getParcelas(){
		return $this->parcelas;
	}

}
?>